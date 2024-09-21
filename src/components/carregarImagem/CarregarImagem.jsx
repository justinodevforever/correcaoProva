import { TextField } from "@mui/material";
import { useState } from "react";
import "./carregarImage.scss";

export default function CarregarImagem({ onImagesLoaded }) {
  const [prova, setProva] = useState(null);
  const [chave, setChave] = useState(null);

  const handleProvaChange = (event) => {
    setProva(event.target.files[0]);
  };

  const handleChaveChange = (event) => {
    setChave(event.target.files[0]);
  };

  const handleSubmit = () => {
    if (prova && chave) {
      onImagesLoaded(prova, chave);
    } else {
      alert("Por favor, carregue ambas as imagens.");
    }
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "90%",
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: "20px",
      }}>
      <div className='conteudo'>
        <label
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: "14pt",
            gap: "10px",
            textAlign: "start",
            color: "#a31543",
          }}>
          Adicionar a Prova:
          <input
            type='file'
            id='prova'
            accept='image/*'
            onChange={handleProvaChange}
            style={{
              width: "300px",
              cursor: "pointer",
              fontSize: "14pt",
            }}
          />
        </label>
        <label
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: "14pt",
            gap: "10px",
            textAlign: "start",
            color: "#a31543",
          }}>
          Adicionar a Chave:
          <input
            type='file'
            accept='image/*'
            onChange={handleChaveChange}
            style={{
              width: "300px",
              cursor: "pointer",
              fontSize: "14pt",
            }}
          />
        </label>
      </div>

      <button className='btn' onClick={handleSubmit}>
        Corrigir Prova
      </button>
    </div>
  );
}
