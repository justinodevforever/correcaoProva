"use client";
import "./login.scss";
import logo from "../../../public/Logo.png";
import { TextField } from "@mui/material";
import { useState } from "react";
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import { api } from "../../../auth/auth";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sms, setSms] = useState("");
  const [isVisibility, setIsVisibility] = useState(false);
  const navigate = useNavigate();

  async function hendleSubmit(e) {
    e.preventDefault();
    try {
      await api
        .post("/logar", { email, password })
        .then((data) => {
          if (data.data === "Email ou Senha Invalido")
            return setSms("Email ou Senha Inválido");
          sessionStorage.setItem("n&&u", data.data?.user?.nome);
          sessionStorage.setItem("id&&U", data.data?.user?.id);
          localStorage.setItem("authToken", data.data?.token);
          navigate("/");
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className='login'>
      <form className='form' onSubmit={(e) => hendleSubmit(e)}>
        <img src={logo} alt='logo' width={60} height={60} />

        <TextField
          label='E-mail'
          type='email'
          value={email}
          fullWidth
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <div
          style={{
            display: "flex",
            position: "relative",
            width: "100%",
          }}>
          <TextField
            type={isVisibility ? "text" : "password"}
            label='Senha'
            value={password}
            fullWidth
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          {!isVisibility && (
            <VisibilityOffOutlined
              cursor={"pointer"}
              onClick={() => setIsVisibility(true)}
              style={{
                display: "flex",
                position: "absolute",
                top: "20px",
                right: "20px",
              }}
            />
          )}
          {isVisibility && (
            <VisibilityOutlined
              cursor={"pointer"}
              onClick={() => setIsVisibility(false)}
              style={{
                display: "flex",
                position: "absolute",
                top: "20px",
                right: "20px",
              }}
            />
          )}
        </div>
        {sms && (
          <p
            style={{
              color: "#cc0033",
              marginTop: "-20px",
              marginBottom: "-30px",
            }}>
            {sms}
          </p>
        )}
        <Link to={"#"}>Esqueceste a Senha?</Link>
        <button type='submit'>Entrar</button>
      </form>
    </div>
  );
}
