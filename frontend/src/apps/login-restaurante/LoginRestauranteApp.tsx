import React, { useState } from "react";
import { RestaurantRegistration } from "./components/RestaurantRegistration";
import { LoginForm } from "./components/LoginForm";
import { Toaster } from "./components/ui/sonner";
import foodlyLogo from "../assets/SegundaLogodoProjeto.png";
import { useNavigate } from "react-router-dom";

type Page = "login" | "register";

export default function LoginRestauranteApp() {
  const [currentPage, setCurrentPage] = useState<Page>("register");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo + texto */}
            <div className="flex items-center space-x-4">
              <img src={foodlyLogo} alt="Foodly" className="h-10 w-10" />
              <div>
                <h1 className="text-orange-500 font-semibold">Foodly</h1>
                <p className="text-sm text-gray-600">Parceiro Restaurante</p>
              </div>
            </div>

            {/* Botões de login/cadastro */}
            <div className="hidden md:flex items-center space-x-4">
              {currentPage === "register" ? (
                <>
                  <span className="text-sm text-gray-600">Já tem conta?</span>
                  <button
                    onClick={() => setCurrentPage("login")}
                    className="text-orange-500 hover:text-orange-600"
                  >
                    Fazer Login
                  </button>
                </>
              ) : (
                <>
                  <span className="text-sm text-gray-600">Não tem conta?</span>
                  <button
                    onClick={() => setCurrentPage("register")}
                    className="text-orange-500 hover:text-orange-600"
                  >
                    Cadastrar
                  </button>
                </>
              )}
            </div>

            {/* Botão Voltar */}
            <button
              onClick={() => navigate("/")}
              className="text-sm text-gray-500 hover:text-orange-500 transition"
            >
              ← Voltar
            </button>
          </div>
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentPage === "register" ? (
          <>
            <div className="text-center mb-8">
              <h1 className="text-orange-500 mb-2 font-semibold">
                Cadastre seu Restaurante
              </h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Junte-se à nossa plataforma e alcance milhares de clientes.
                Preencha as informações abaixo para começar a vender no Foodly.
              </p>
            </div>

            <RestaurantRegistration />
          </>
        ) : (
          <>
            <div className="text-center mb-8">
              <h1 className="text-orange-500 mb-2 font-semibold">
                Bem-vindo de volta!
              </h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Acesse sua conta para gerenciar seu restaurante e acompanhar
                seus pedidos.
              </p>
            </div>

            <LoginForm onNavigateToRegister={() => setCurrentPage("register")} />
          </>
        )}
      </main>

      <Toaster />
    </div>
  );
}