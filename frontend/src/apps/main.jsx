import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EntradaApp from "./entrada/EntradaApp";
import Suporte from "./suporte/SuporteApp"
import LoginApp from "./login/LoginApp";
import LoginRestauranteApp from "./login-restaurante/LoginRestauranteApp";
import MenuClienteApp from "./menu-cliente/MenuClienteApp";
import MenuRestauranteApp from "./menu-restaurante/MenuRestauranteApp"
import PerfilUserApp from "./perfil-user/PerfilUserApp"
import UserPremiumApp from "./userpremium/UserPremiumApp"
import RastreamentoPedido from "./rastreamento-pedido/RastreamentoPedidoApp"
import Avaliacao from "./avaliacao/AvaliacaoApp"
import ParDeComida from "./par-de-comida/ParDeComidaApp"
import ComidaAleatoria from "./comida-aleatoria/ComidaAleatoriaApp"
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EntradaApp />} />
        <Route path="/suporte" element={<Suporte />} />
        <Route path="/login" element={<LoginApp />} />
        <Route path="/login-restaurante" element={<LoginRestauranteApp />} />
        <Route path="/menu" element={<MenuClienteApp />} />
        <Route path="/rastreamento-pedido" element={<RastreamentoPedido />} />
        <Route path="/avaliacao" element={<Avaliacao />} />
        <Route path="/menu-restaurante" element={<MenuRestauranteApp />} />
        <Route path="/perfil" element={<PerfilUserApp />} />
        <Route path="/userpremium" element={<UserPremiumApp />} />
        <Route path="/par-de-comida" element={<ParDeComida />} />
        <Route path="/comida-aleatoria" element={<ComidaAleatoria />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
