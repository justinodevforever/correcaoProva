import React from "react";
import "./loader.scss";
import { Button } from "@mui/material";

const OvelayLoader = ({ setLoading }) => {
  return (
    <>
      <div className='OvelayLoader'>
        <div className='container2'>
          <div className='loader'></div>
          Aguarde, Por Favor!
          <Button onClick={() => setLoading(false)}>Cancelar</Button>
        </div>
      </div>
      <div className='ovelay'></div>
    </>
  );
};

export default OvelayLoader;
