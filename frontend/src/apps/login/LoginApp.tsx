import { useState } from "react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Separator } from "./components/ui/separator";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
} from "lucide-react";
import exampleImage from "../assets/SegundaLogodoProjeto.png";
import { useNavigate } from "react-router-dom";

export default function LoginApp() {
  const navigate = useNavigate();
  const [currentScreen, setCurrentScreen] = useState<"signup" | "login">("signup");
  const [showPassword, setShowPassword] = useState(false);

  // Estado para cadastro
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    cep: "",
    endereco: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
  });

  // Estado para login
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [phoneError, setPhoneError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  // === Funções de validação e formatação ===
  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    const limited = numbers.slice(0, 11);
    if (limited.length <= 2) return limited;
    if (limited.length <= 6)
      return `(${limited.slice(0, 2)}) ${limited.slice(2)}`;
    if (limited.length <= 10)
      return `(${limited.slice(0, 2)}) ${limited.slice(2, 6)}-${limited.slice(6)}`;
    return `(${limited.slice(0, 2)}) ${limited.slice(2, 7)}-${limited.slice(7)}`;
  };

  const validatePhoneNumber = (value: string) =>
    value.replace(/\D/g, "").length === 11;

  const validateEmail = (email: string) => {
    const validDomains = [
      "@gmail.com",
      "@hotmail.com",
      "@outlook.com",
      "@yahoo.com",
      "@icloud.com",
      "@live.com",
      "@msn.com",
      "@uol.com.br",
      "@bol.com.br",
      "@terra.com.br",
      "@ig.com.br",
      "@unicap.br",
      "@admin.com",
      "@foodly.com",
    ];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return false;
    return validDomains.some((domain) =>
      email.toLowerCase().endsWith(domain)
    );
  };

  const handleEmailBlur = () => {
    if (formData.email && !validateEmail(formData.email)) setEmailError(true);
    else setEmailError(false);
  };

  const handlePhoneBlur = () => {
    if (formData.phone && !validatePhoneNumber(formData.phone))
      setPhoneError(true);
    else setPhoneError(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "phone") {
      setFormData((prev) => ({ ...prev, [name]: formatPhoneNumber(value) }));
      if (phoneError) setPhoneError(false);
    } else if (name === "email") {
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (emailError) setEmailError(false);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleLoginInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  // === Cadastro ===
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      alert("Usuário cadastrado com sucesso!");
      setCurrentScreen("login");
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert("Erro: " + err.message);
      } else {
        alert("Erro inesperado.");
      }
    }
  };

  // === Login ===
  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      console.log("Usuário logado:", data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/menu");
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert("Erro: " + err.message);
      } else {
        alert("Erro inesperado.");
      }
    }
  };

  // === Tela de Login ===
  if (currentScreen === "login") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-4">
            <img
              src={exampleImage}
              alt="Foodly Logo"
              className="mx-auto w-24 h-24 object-contain"
            />
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-gray-900">
                Bem-vindo de volta!
              </h1>
              <p className="text-gray-600">
                Faça login e continue aproveitando nossos sabores
              </p>
            </div>
          </div>

          <Card className="shadow-xl border-0">
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-2xl text-center text-gray-900">
                Entrar
              </CardTitle>
              <CardDescription className="text-center text-gray-600">
                Acesse sua conta
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="loginEmail" className="text-gray-700">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="loginEmail"
                      name="email"
                      type="email"
                      placeholder="Digite seu email"
                      value={loginData.email}
                      onChange={handleLoginInputChange}
                      className="pl-10 bg-gray-50 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                      required
                    />
                  </div>
                </div>

                {/* Senha */}
                <div className="space-y-2">
                  <Label htmlFor="loginPassword" className="text-gray-700">
                    Senha
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="loginPassword"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Digite sua senha"
                      value={loginData.password}
                      onChange={handleLoginInputChange}
                      className="pl-10 pr-10 bg-gray-50 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <button
                    type="button"
                    className="text-orange-600 hover:text-orange-700 hover:underline"
                    onClick={() => navigate("/suporte")}
                  >
                    Esqueci minha senha
                  </button>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white h-12 rounded-lg shadow-lg hover:scale-[1.02] transition-all"
                >
                  Entrar
                </Button>
              </form>

              <Separator />
              <p className="text-center text-gray-600">
                Não tem uma conta?{" "}
                <button
                  onClick={() => setCurrentScreen("signup")}
                  className="text-orange-600 hover:underline"
                >
                  Cadastre-se
                </button>
              </p>
            </CardContent>
          </Card>
          <p className="text-center text-sm text-gray-500">
            © 2025 Foodly. Todos os direitos reservados.
          </p>
        </div>
      </div>
    );
  }

  // === Tela de Cadastro ===
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-4">
          <img src={exampleImage} alt="Foodly Logo" className="mx-auto w-24 h-24 object-contain" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Bem-vindo ao Foodly!</h1>
            <p className="text-gray-600">Crie sua conta e comece a pedir seus pratos favoritos</p>
          </div>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-2xl text-center text-gray-900">Criar Conta</CardTitle>
            <CardDescription className="text-center text-gray-600">Preencha seus dados abaixo</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Nome */}
              <Label htmlFor="name" className="text-gray-700">Nome Completo</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleInputChange} placeholder="Digite seu nome completo" required />

              {/* Email */}
              <Label htmlFor="email" className="text-gray-700">Email</Label>
              <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} onBlur={handleEmailBlur} placeholder="Digite seu email" required />

              {/* Telefone */}
              <Label htmlFor="phone" className="text-gray-700">Telefone</Label>
              <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} onBlur={handlePhoneBlur} placeholder="(11) 99999-9999" required />

              {/* CEP */}
              <Label htmlFor="cep" className="text-gray-700">CEP</Label>
              <Input id="cep" name="cep" value={formData.cep} onChange={(e) => setFormData(prev => ({ ...prev, cep: e.target.value.replace(/\D/g, '').replace(/(\d{5})(\d{3})/, '$1-$2').slice(0, 9) }))} placeholder="00000-000" required />

              {/* Endereço */}
              <Label htmlFor="endereco" className="text-gray-700">Endereço</Label>
              <Input id="endereco" name="endereco" value={formData.endereco} onChange={handleInputChange} placeholder="Rua, avenida, travessa..." required />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="numero" className="text-gray-700">Número</Label>
                  <Input id="numero" name="numero" value={formData.numero} onChange={handleInputChange} placeholder="123" required />
                </div>
                <div>
                  <Label htmlFor="complemento" className="text-gray-700">Complemento</Label>
                  <Input id="complemento" name="complemento" value={formData.complemento} onChange={handleInputChange} placeholder="Apto, bloco, etc." />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="bairro" className="text-gray-700">Bairro</Label>
                  <Input id="bairro" name="bairro" value={formData.bairro} onChange={handleInputChange} placeholder="Seu bairro" required />
                </div>
                <div>
                  <Label htmlFor="cidade" className="text-gray-700">Cidade</Label>
                  <Input id="cidade" name="cidade" value={formData.cidade} onChange={handleInputChange} placeholder="Sua cidade" required />
                </div>
              </div>

              {/* Senha */}
              <Label htmlFor="password" className="text-gray-700">Senha</Label>
              <div className="relative">
                <Input id="password" name="password" type={showPassword ? "text" : "password"} value={formData.password} onChange={handleInputChange} placeholder="Digite sua senha" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              <Button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white h-12 rounded-lg shadow-lg hover:scale-[1.02] transition-all">
                Criar Conta
              </Button>
            </form>

            <Separator />
            <p className="text-center text-gray-600">
              Já tem uma conta?{" "}
              <button onClick={() => setCurrentScreen("login")} className="text-orange-600 hover:underline">
                Faça login
              </button>
            </p>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-gray-500">
          © 2025 Foodly. Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
}
