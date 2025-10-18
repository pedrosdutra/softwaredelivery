import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EntradaApp from "./entrada/EntradaApp";
import LoginApp from "./login/LoginApp";
import LoginRestauranteApp from "./login-restaurante/LoginRestauranteApp";
import MenuClienteApp from "./menu-cliente/MenuClienteApp";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EntradaApp />} />
        <Route path="/login" element={<LoginApp />} />
        <Route path="/login-restaurante" element={<LoginRestauranteApp />} />
        <Route path="/menu" element={<MenuClienteApp />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
