import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EntradaApp from "./apps/entrada/EntradaApp"
import LoginApp from "./apps/login/LoginApp";
import LoginRestauranteApp from "./apps/login-restaurante/LoginRestauranteApp";
import MenuClienteApp from "./apps/menu-cliente/MenuClienteApp";
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EntradaApp />} />
        <Route path="/login" element={<LoginApp />} />
        <Route path="/login-restaurante" element={<LoginRestauranteApp />} />
        <Route path="/menu" element={<MenuClienteApp />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);