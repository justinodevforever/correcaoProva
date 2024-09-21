import { BrowserRouter, Route, Routes, redirect } from "react-router-dom";

//My page
import Home from "./Home.jsx";
import Login from "./login/Login.jsx";
import ProtectRouter from "../../auth/auth.jsx";
import Sobre from "./sobre/Sobre.jsx";

const Routeting = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path='/'
          element={
            <ProtectRouter>
              <Home />
            </ProtectRouter>
          }
        />

        <Route exact path='/login' element={<Login />} />
        <Route exact path='/sobre' element={<Sobre />} />

        <Route path='*' element={<h1>404 NOT FOUND</h1>} />
      </Routes>
    </BrowserRouter>
  );
};
export default Routeting;
