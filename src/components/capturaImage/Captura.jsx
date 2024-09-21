import { Camera } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import "./captura.scss";

const Captura = ({ onImagesLoaded }) => {
  const [prova, setProva] = useState(null);
  const [chave, setChave] = useState(null);
  const [ischave, setIsChave] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Inicia a câmera
  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        videoRef.current.srcObject = stream;
      } catch (err) {
        console.error("Erro ao acessar a câmera: ", err);
      }
    };
    startCamera();
  }, []);
  const handleSubmit = () => {
    if (prova && chave) {
      onImagesLoaded(prova, chave);
    } else {
      alert("Por favor, carregue ambas as imagens.");
    }
  };

  // Captura a imagem do vídeo
  const capturePhoto = (setPhoto) => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext("2d");
    context.translate(canvas.width / 2, canvas.height / 2);
    context.rotate((90 * Math.PI) / 180);

    context.drawImage(
      video,
      -canvas.height / 2,
      -canvas.width / 2,
      canvas.height,
      canvas.width
    );

    const imageData = canvas.toDataURL("image/png");

    setPhoto(imageData);
    console.log(imageData);
  };

  const handleCaptureFirstPhoto = () => {
    capturePhoto(setProva);
  };

  const handleCaptureSecondPhoto = () => {
    capturePhoto(setChave);
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        marginTop: "40px",
        paddingBottom: "20px",
      }}>
      <div
        style={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}>
        <div className='camera'>
          <video className='imageCamera' ref={videoRef} autoPlay />
          <div className='click'>
            <button onClick={handleCaptureFirstPhoto}>
              <Camera />
            </button>

            <button onClick={handleCaptureSecondPhoto}>
              <Camera />
            </button>
          </div>
        </div>

        {prova && chave && (
          <div>
            Prova:
            <img
              src={prova}
              alt='Primeira foto'
              style={{ width: "200px", marginRight: "10px", marginTop: "40px" }}
            />
            Chave:
            <img src={chave} alt='Segunda foto' style={{ width: "200px" }} />
          </div>
        )}
      </div>

      <canvas ref={canvasRef} style={{ display: "none" }} />

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "10px",
          marginTop: "10px",
        }}></div>

      <button
        style={{
          width: "300px",
          padding: "10px",
          fontSize: "14pt",
          borderRadius: "4px",
          border: "none",
          background: "#008000",
          color: "#fff",
          cursor: "pointer",
        }}
        onClick={handleSubmit}>
        Corrigir a Prova
      </button>
    </div>
  );
};

export default Captura;
