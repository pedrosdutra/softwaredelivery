import { useState } from 'react';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Separator } from './components/ui/separator';
import { Eye, EyeOff, User, Mail, Phone, Lock } from 'lucide-react';
import exampleImage from 'figma:asset/14fdaf87c4296f519e79aec1a13842b163be87de.png';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('signup'); // 'signup' ou 'login'
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [phoneError, setPhoneError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const formatPhoneNumber = (value: string) => {
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, '');
    
    // Limita a 11 dígitos
    const limited = numbers.slice(0, 11);
    
    // Aplica a formatação
    if (limited.length <= 2) {
      return limited;
    } else if (limited.length <= 6) {
      return `(${limited.slice(0, 2)}) ${limited.slice(2)}`;
    } else if (limited.length <= 10) {
      return `(${limited.slice(0, 2)}) ${limited.slice(2, 6)}-${limited.slice(6)}`;
    } else {
      return `(${limited.slice(0, 2)}) ${limited.slice(2, 7)}-${limited.slice(7)}`;
    }
  };

  const validatePhoneNumber = (value: string) => {
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, '');
    // Valida se tem 11 dígitos (formato brasileiro com 9 dígitos)
    return numbers.length === 11;
  };

  const validateEmail = (email: string) => {
    // Lista de domínios válidos comuns
    const validDomains = [
      '@gmail.com',
      '@hotmail.com',
      '@outlook.com',
      '@yahoo.com',
      '@icloud.com',
      '@live.com',
      '@msn.com',
      '@uol.com.br',
      '@bol.com.br',
      '@terra.com.br',
      '@ig.com.br'
    ];
    
    // Verifica se o email tem formato básico válido
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return false;
    }
    
    // Verifica se termina com algum dos domínios válidos
    return validDomains.some(domain => email.toLowerCase().endsWith(domain));
  };

  const handleEmailBlur = () => {
    if (formData.email && !validateEmail(formData.email)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };

  const handlePhoneBlur = () => {
    if (formData.phone && !validatePhoneNumber(formData.phone)) {
      setPhoneError(true);
    } else {
      setPhoneError(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Se for o campo de telefone, aplica a formatação
    if (name === 'phone') {
      const formatted = formatPhoneNumber(value);
      setFormData(prev => ({
        ...prev,
        [name]: formatted
      }));
      // Remove o erro enquanto está digitando
      if (phoneError) {
        setPhoneError(false);
      }
    } else if (name === 'email') {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
      // Remove o erro de email enquanto está digitando
      if (emailError) {
        setEmailError(false);
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleLoginInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    let hasError = false;
    
    // Valida o email antes de enviar
    if (!validateEmail(formData.email)) {
      setEmailError(true);
      hasError = true;
    }
    
    // Valida o telefone antes de enviar
    if (!validatePhoneNumber(formData.phone)) {
      setPhoneError(true);
      hasError = true;
    }
    
    if (hasError) {
      return;
    }
    
    // Aqui seria implementada a lógica de cadastro
    console.log('Dados do cadastro:', formData);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui seria implementada a lógica de login
    console.log('Dados do login:', loginData);
  };

  // Tela de login
  if (currentScreen === 'login') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          {/* Logo e Título */}
          <div className="text-center space-y-4">
            <div className="mx-auto w-24 h-24">
              <img 
                src={exampleImage} 
                alt="Foodly Logo" 
                className="w-full h-full object-contain"
              />
            </div>
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
              <CardTitle className="text-2xl text-center text-gray-900">Entrar</CardTitle>
              <CardDescription className="text-center text-gray-600">
                Faça login para acessar sua conta
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                {/* Email */}
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

                {/* Senha */}
                <div className="space-y-2">
                  <Label htmlFor="loginPassword" className="text-gray-700">Senha</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="loginPassword"
                      name="password"
                      type={showLoginPassword ? "text" : "password"}
                      placeholder="Digite sua senha"
                      value={loginData.password}
                      onChange={handleLoginInputChange}
                      className="pl-10 pr-10 bg-gray-50 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showLoginPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Esqueci minha senha */}
                <div className="text-right">
                  <button 
                    type="button"
                    className="text-orange-600 hover:text-orange-700 hover:underline transition-colors"
                  >
                    Esqueci minha senha
                  </button>
                </div>

                {/* Botão de Login */}
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white h-12 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-[1.02]"
                >
                  Entrar
                </Button>
              </form>

              <div className="space-y-4">
                <Separator className="my-4" />
                
                {/* Link para Cadastro */}
                <div className="text-center">
                  <p className="text-gray-600">
                    Não tem uma conta?{' '}
                    <button 
                      onClick={() => setCurrentScreen('signup')}
                      className="text-orange-600 hover:text-orange-700 font-medium hover:underline transition-colors"
                    >
                      Cadastre-se
                    </button>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center text-sm text-gray-500">
            <p>© 2024 Foodly. Todos os direitos reservados.</p>
          </div>
        </div>
      </div>
    );
  }

  // Tela de cadastro (padrão)
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo e Título */}
        <div className="text-center space-y-4">
          <div className="mx-auto w-24 h-24">
            <img 
              src={exampleImage} 
              alt="Foodly Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">
              Bem-vindo ao Foodly!
            </h1>
            <p className="text-gray-600">
              Crie sua conta e comece a pedir seus pratos favoritos
            </p>
          </div>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-2xl text-center text-gray-900">Criar Conta</CardTitle>
            <CardDescription className="text-center text-gray-600">
              Preencha os dados abaixo para se cadastrar
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Nome Completo */}
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

              {/* Email */}
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
                    className={`pl-10 bg-gray-50 ${
                      emailError 
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                        : 'border-gray-200 focus:border-orange-500 focus:ring-orange-500'
                    }`}
                    required
                  />
                </div>
                {emailError && (
                  <p className="text-sm text-red-600">Email inválido. Use um domínio válido (@gmail.com, @hotmail.com, etc)</p>
                )}
              </div>

              {/* Telefone */}
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
                    className={`pl-10 bg-gray-50 ${
                      phoneError 
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                        : 'border-gray-200 focus:border-orange-500 focus:ring-orange-500'
                    }`}
                    required
                  />
                </div>
                {phoneError && (
                  <p className="text-sm text-red-600">Campo inválido. Use o formato: (00) 00000-0000</p>
                )}
              </div>

              {/* Senha */}
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

              {/* Confirmar Senha */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-700">Confirmar Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirme sua senha"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="pl-10 pr-10 bg-gray-50 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Botão de Cadastro */}
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white h-12 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-[1.02]"
              >
                Criar Conta
              </Button>
            </form>

            <div className="space-y-4">
              <Separator className="my-4" />
              
              {/* Link para Login */}
              <div className="text-center">
                <p className="text-gray-600">
                  Já tem uma conta?{' '}
                  <button 
                    onClick={() => setCurrentScreen('login')}
                    className="text-orange-600 hover:text-orange-700 font-medium hover:underline transition-colors"
                  >
                    Faça login
                  </button>
                </p>
              </div>

              {/* Termos e Condições */}
              <div className="text-center">
                <p className="text-xs text-gray-500">
                  Ao criar uma conta, você concorda com nossos{' '}
                  <button className="text-orange-600 hover:text-orange-700 hover:underline">
                    Termos de Uso
                  </button>{' '}
                  e{' '}
                  <button className="text-orange-600 hover:text-orange-700 hover:underline">
                    Política de Privacidade
                  </button>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500">
          <p>© 2024 Foodly. Todos os direitos reservados.</p>
        </div>
      </div>
    </div>
  );
}
