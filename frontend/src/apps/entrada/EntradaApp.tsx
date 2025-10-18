import { useNavigate } from "react-router-dom";
import foodlyLogo from "../assets/SegundaLogodoProjeto.png";
import { User, Store, ArrowRight } from "lucide-react";
import "../entrada/styles/globals.css"

export default function EntradaApp() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      {/* Logo */}
      <img
        src={foodlyLogo}
        alt="Foodly Logo"
        className="w-48 h-48 mb-8 drop-shadow-lg"
      />

      {/* Título */}
      <h1 className="text-3xl font-bold text-orange-600 mb-2">
        Bem-vindo ao Foodly
      </h1>
      <p className="text-gray-600 mb-10 text-center">
        Escolha como você deseja acessar nossa plataforma
      </p>

      {/* Botões de acesso */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-lg">
        <button
          onClick={() => navigate("/login")}
          className="flex flex-col items-center justify-center border rounded-2xl bg-white hover:bg-orange-50 p-6 shadow-md transition duration-200"
        >
          <User className="w-8 h-8 text-orange-500 mb-3" />
          <h2 className="text-lg font-semibold text-gray-800">Sou Cliente</h2>
          <p className="text-sm text-gray-500 mb-3">
            Peça suas refeições favoritas e acompanhe suas entregas
          </p>
          <ArrowRight className="text-orange-500 w-5 h-5" />
        </button>

        <button
          onClick={() => navigate("/login-restaurante")}
          className="flex flex-col items-center justify-center border rounded-2xl bg-white hover:bg-orange-50 p-6 shadow-md transition duration-200"
        >
          <Store className="w-8 h-8 text-orange-500 mb-3" />
          <h2 className="text-lg font-semibold text-gray-800">Sou Parceiro</h2>
          <p className="text-sm text-gray-500 mb-3">
            Gerencie seu restaurante e receba pedidos online
          </p>
          <ArrowRight className="text-orange-500 w-5 h-5" />
        </button>
      </div>
    </div>
  );
}