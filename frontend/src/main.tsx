import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginApp from "./apps/login/LoginApp";
import MenuClienteApp from "./apps/menu-cliente/MenuClienteApp";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginApp />} />
        <Route path="/menu" element={<MenuClienteApp />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);