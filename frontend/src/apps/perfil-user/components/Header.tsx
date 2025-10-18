import { useNavigate } from "react-router-dom";
import { ArrowLeft, LogOut } from "lucide-react";
import foodlyLogo from "../../assets/SegundaLogodoProjeto.png";

export function Header() {
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-sm border-b border-orange-100">
      <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Voltar */}
        <button
          onClick={() => navigate("/menu")}
          className="flex items-center gap-1 text-orange-600 hover:text-orange-700 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Voltar</span>
        </button>

        {/* Logo central */}
        <div className="flex items-center gap-2">
          <img
            src={foodlyLogo}
            alt="Foodly"
            className="w-10 h-10 rounded-xl"
          />
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Foodly</h1>
            <p className="text-xs text-gray-600">Seu perfil</p>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-medium">Sair</span>
        </button>
      </div>
    </header>
  );
}