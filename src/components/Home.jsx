import React, { useState } from "react";
import Tesseract, { setLogging } from "tesseract.js";
import "./home.css";
import "dotenv";
import Captura from "./capturaImage/Captura";
// import "../../public/tessdata"
import CarregarImagem from "./carregarImagem/CarregarImagem";
import { Camera, Image, Save } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { TextField } from "@mui/material";
import OvelayLoader from "./hook/OverlayLoad/OverlayLoader";

function Home() {
  const [mostrar, setMostrar] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isImage, setisImage] = useState(true);
  const [isFoto, setisFoto] = useState(false);
  const [nome, setNome] = useState("");
  const [resultado, setResultado] = useState(null);
  const [loading, setLoading] = useState(false);

  async function extrairTextoImage(imageTensor) {
    return new Promise((resolve, reject) => {
      return Tesseract.recognize(imageTensor, "por", {
        langPath: "https://correcao-prova.vercel.app/tessdata/por.traineddata",
        logger: (m) => console.log(m),
      })
        .then(({ data: { text } }) => {
          const limparTexto = text
            .replace(/^\d+\s*-\s*/gm, "")
            .replace(/^\s*[\r\n]/gm, "");

          resolve(limparTexto);
        })
        .catch(reject);
    });
  }
  const limparTexto = (text) => {
    return text
      .map((line) => line.replace(/[^FV]/g, "").trim())
      .filter((line) => line)
      .join("");
  };
  const extrairResposta = (text) => {
    const lines = text.split("\n");
    const l = limparTexto(lines);
    const resposta = [];

    for (let i = 0; i < l.length; i++) {
      let line = l[i].trim();

      // Verifica se a linha contém "F" ou "V"
      if (line.endsWith("F") || line.endsWith("V")) {
        let c = 0;
        c++;
        resposta.push(line.slice(-1));
      }
    }

    return resposta;
  };
  const compararRespostas = (respostaEstudante, respostaChave) => {
    let perguntaCorrecta = 0;

    for (let i = 0; i < respostaChave.length; i++) {
      if (respostaEstudante[i] === respostaChave[i]) {
        perguntaCorrecta++;
      }
    }

    const totalPergunta = respostaEstudante.length;
    const nota = (perguntaCorrecta / totalPergunta) * 20;

    return { perguntaCorrecta, totalPergunta, nota };
  };
  const processarProva = async (imagemEstudante, imageEstudante) => {
    setLoading(true);
    console.log(imagemEstudante, imageEstudante);

    const textoEstudante = await extrairTextoImage(imagemEstudante);
    const textoChave = await extrairTextoImage(imageEstudante);

    const respostaEstudante = extrairResposta(textoEstudante);
    const respostaChave = extrairResposta(textoChave);

    const result = compararRespostas(respostaEstudante, respostaChave);

    setResultado(result);
    setLoading(false);
    return {
      perguntaCorrecta: result.perguntaCorrecta,
      totalPergunta: result.totalPergunta,
      nota: result.nota.toFixed(2) || 0,
    };
  };

  const hendleSave = async () => {
    await api
      .get("/user")
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log(error));
  };

  if (isVisible) {
    const c = document.getElementById("c");
    c?.classList.add("opacity");
  }

  return (
    <>
      {loading && <OvelayLoader setLoading={setLoading} />}

      <div className='homeC'>
        <div className='barMenu'>
          <Link to={"/sobre"} style={{ color: "#fff", marginLeft: "10px" }}>
            Sobre
          </Link>
          <h3 style={{ color: "#fff" }}>Correção da Prova</h3>
          <span className='usename'>
            Usuário: {sessionStorage.getItem("n&&u")}
          </span>
        </div>
        <div style={{ display: "flex", gap: "10px", borderRadius: "7px" }}>
          <button
            style={
              isImage
                ? {
                    display: "flex",
                    alignItems: "center",
                    borderRadius: "4px",
                    cursor: "pointer",
                    background: "#a31543",
                    color: "#fff",
                    padding: "4px",
                  }
                : {
                    display: "flex",
                    alignItems: "center",
                    borderRadius: "4px",
                    cursor: "pointer",
                    background: "#ddd",
                    padding: "4px",
                  }
            }
            onClick={() => {
              setisImage(true);
              setisFoto(false);
            }}>
            {" "}
            <Image />
            Carregar Imagem
          </button>

          <button
            style={
              isFoto
                ? {
                    display: "flex",
                    alignItems: "center",
                    borderRadius: "4px",
                    cursor: "pointer",
                    background: "#a31543",
                    color: "#fff",
                    padding: "4px",
                  }
                : {
                    display: "flex",
                    alignItems: "center",
                    borderRadius: "4px",
                    cursor: "pointer",
                    background: "#ddd",
                    padding: "4px",
                  }
            }
            onClick={() => {
              setisFoto(true);
              setisImage(false);
            }}>
            {" "}
            <Camera /> Capturar Imagem
          </button>
        </div>
        {(isImage || isFoto) && (
          <TextField
            label='Nome do Estudante'
            style={{ marginTop: "10px", width: "300px" }}
            onChange={(e) => setNome(e.target.value)}
          />
        )}

        {isImage && <CarregarImagem onImagesLoaded={processarProva} />}
        {isFoto && <Captura onImagesLoaded={processarProva} />}
        <div
          style={{ width: "100%", alignItems: "start", paddingLeft: "20px" }}>
          {nome && <p>Nome do Estudante : {nome}</p>}
          {resultado !== null && (
            <p>Total de Perguntas : {resultado.totalPergunta}</p>
          )}
          {resultado !== null && (
            <p>Respostas corretas: {resultado.perguntaCorrecta}</p>
          )}
          {resultado !== null && (
            <p
              style={
                resultado.nota >= 10 ? { color: "green" } : { color: "red" }
              }>
              Valor: {resultado.nota.toFixed(1)}
            </p>
          )}
          {resultado !== null && (
            <button
              style={{
                width: "100px",
                padding: "0px 10px",
                fontSize: "14pt",
                justifyContent: "center",
                alignContent: "center",
                borderRadius: "4px",
                border: "none",
                background: "#008000",
                color: "#fff",
                gap: "10px",
                cursor: "pointer",
              }}
              onClick={hendleSave}>
              {" "}
              <Save />
              Salvar
            </button>
          )}
        </div>
      </div>
    </>
  );
}
export default Home;
