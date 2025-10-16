import { useState } from 'react';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Separator } from './components/ui/separator';
import { Eye, EyeOff, User, Mail, Phone, Lock } from 'lucide-react';
import exampleImage from '../assets/SegundaLogodoProjeto.png';
import { useNavigate } from "react-router-dom";

export default function LoginApp() {
  const navigate = useNavigate();
  const [currentScreen, setCurrentScreen] = useState('signup'); // 'signup' ou 'login'
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });
  const [phoneError, setPhoneError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    const limited = numbers.slice(0, 11);
    if (limited.length <= 2) return limited;
    if (limited.length <= 6) return `(${limited.slice(0, 2)}) ${limited.slice(2)}`;
    if (limited.length <= 10) return `(${limited.slice(0, 2)}) ${limited.slice(2, 6)}-${limited.slice(6)}`;
    return `(${limited.slice(0, 2)}) ${limited.slice(2, 7)}-${limited.slice(7)}`;
  };

  const validatePhoneNumber = (value: string) => value.replace(/\D/g, '').length === 11;

  const validateEmail = (email: string) => {
    const validDomains = [
      '@gmail.com', '@hotmail.com', '@outlook.com', '@yahoo.com', 
      '@icloud.com', '@live.com', '@msn.com', '@uol.com.br', 
      '@bol.com.br', '@terra.com.br', '@ig.com.br'
    ];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return false;
    return validDomains.some(domain => email.toLowerCase().endsWith(domain));
  };

  const handleEmailBlur = () => {
    if (formData.email && !validateEmail(formData.email)) setEmailError(true);
    else setEmailError(false);
  };

  const handlePhoneBlur = () => {
    if (formData.phone && !validatePhoneNumber(formData.phone)) setPhoneError(true);
    else setPhoneError(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      setFormData(prev => ({ ...prev, [name]: formatPhoneNumber(value) }));
      if (phoneError) setPhoneError(false);
    } else if (name === 'email') {
      setFormData(prev => ({ ...prev, [name]: value }));
      if (emailError) setEmailError(false);
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleLoginInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let hasError = false;
    if (!validateEmail(formData.email)) { setEmailError(true); hasError = true; }
    if (!validatePhoneNumber(formData.phone)) { setPhoneError(true); hasError = true; }
    if (hasError) return;
    console.log('Dados do cadastro:', formData);
    navigate("/menu");
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Dados do login:', loginData);
    navigate("/menu");
  };

  // Tela de login
  if (currentScreen === 'login') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-4">
            <div className="mx-auto w-24 h-24">
              <img src={exampleImage} alt="Foodly Logo" className="w-full h-full object-contain" />
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-gray-900">Bem-vindo de volta!</h1>
              <p className="text-gray-600">Faça login e continue aproveitando nossos sabores</p>
            </div>
          </div>

          <Card className="shadow-xl border-0">
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-2xl text-center text-gray-900">Entrar</CardTitle>
              <CardDescription className="text-center text-gray-600">Faça login para acessar sua conta</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="loginEmail" className="text-gray-700">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
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
                <div className="space-y-2">
                  <Label htmlFor="loginPassword" className="text-gray-700">Senha</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
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
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <button type="button" className="text-orange-600 hover:text-orange-700 hover:underline transition-colors">
                    Esqueci minha senha
                  </button>
                </div>
                <Button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white h-12 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-[1.02]">
                  Entrar
                </Button>
              </form>

              <div className="space-y-4">
                <Separator className="my-4" />
                <div className="text-center">
                  <p className="text-gray-600">
                    Não tem uma conta?{' '}
                    <button onClick={() => setCurrentScreen('signup')} className="text-orange-600 hover:text-orange-700 font-medium hover:underline transition-colors">
                      Cadastre-se
                    </button>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center text-sm text-gray-500">
            <p>© 2024 Foodly. Todos os direitos reservados.</p>
          </div>
        </div>
      </div>
    );
  }

  // Tela de cadastro
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-4">
          <div className="mx-auto w-24 h-24">
            <img src={exampleImage} alt="Foodly Logo" className="w-full h-full object-contain" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">Bem-vindo ao Foodly!</h1>
            <p className="text-gray-600">Crie sua conta e comece a pedir seus pratos favoritos</p>
          </div>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-2xl text-center text-gray-900">Criar Conta</CardTitle>
            <CardDescription className="text-center text-gray-600">Preencha os dados abaixo para se cadastrar</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-700">Nome Completo</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Digite seu nome completo"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="pl-10 bg-gray-50 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Digite seu email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onBlur={handleEmailBlur}
                    className={`pl-10 bg-gray-50 ${emailError ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-orange-500 focus:ring-orange-500'}`}
                    required
                  />
                </div>
                {emailError && <p className="text-sm text-red-600">Email inválido. Use um domínio válido (@gmail.com, @hotmail.com, etc)</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-gray-700">Telefone</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="(11) 99999-9999"
                    value={formData.phone}
                    onChange={handleInputChange}
                    onBlur={handlePhoneBlur}
                    className={`pl-10 bg-gray-50 ${phoneError ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-orange-500 focus:ring-orange-500'}`}
                    required
                  />
                </div>
                {phoneError && <p className="text-sm text-red-600">Campo inválido. Use o formato: (00) 00000-0000</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Digite sua senha"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10 pr-10 bg-gray-50 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white h-12 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-[1.02]">
                Criar Conta
              </Button>
            </form>

            <div className="space-y-4">
              <Separator className="my-4" />
              <div className="text-center">
                <p className="text-gray-600">
                  Já tem uma conta?{' '}
                  <button onClick={() => setCurrentScreen('login')} className="text-orange-600 hover:text-orange-700 font-medium hover:underline transition-colors">
                    Faça login
                  </button>
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500">
                  Ao criar uma conta, você concorda com nossos{' '}
                  <button className="text-orange-600 hover:text-orange-700 hover:underline">Termos de Uso</button>{' '}
                  e{' '}
                  <button className="text-orange-600 hover:text-orange-700 hover:underline">Política de Privacidade</button>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-gray-500">
          <p>© 2024 Foodly. Todos os direitos reservados.</p>
        </div>
      </div>
    </div>
  );
}