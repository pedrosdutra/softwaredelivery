import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { Checkbox } from './ui/checkbox';
import { toast } from 'sonner';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface LoginFormProps {
  onNavigateToRegister: () => void;
}

export function LoginForm({ onNavigateToRegister }: LoginFormProps) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    
    // Simular chamada de API
    setTimeout(() => {
      console.log('Dados de login:', data);
      toast.success('Login realizado com sucesso!');
      setIsLoading(false);
      // Aqui você redirecionaria para o dashboard do restaurante
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <Card className="max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <Lock className="w-5 h-5 text-orange-500" />
            Acesse sua Conta
          </CardTitle>
          <CardDescription>
            Entre com suas credenciais para gerenciar seu restaurante
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                E-mail *
              </Label>
              <Input
                id="email"
                type="email"
                {...register('email', {
                  required: 'E-mail é obrigatório',
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: 'E-mail inválido'
                  }
                })}
                placeholder="seu@email.com"
                disabled={isLoading}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Senha *
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  {...register('password', {
                    required: 'Senha é obrigatória',
                  })}
                  placeholder="Digite sua senha"
                  disabled={isLoading}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
              </div>
              <button
                type="button"
                onClick={() => navigate("/suporte")}
                className="text-sm text-orange-500 hover:text-orange-600"
                disabled={isLoading}
              >
                Esqueci minha senha
              </button>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Entrando...
                </div>
              ) : (
                <div className="flex items-center gap-2" onClick={() => navigate("/menu-restaurante")}>
                  Entrar
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </Button>
          </form>

          <Separator className="my-6" />

          {/* Register Link */}
          <div className="text-center space-y-4">
            <p className="text-sm text-gray-600">
              Ainda não tem uma conta?
            </p>
            <Button
              variant="outline"
              onClick={onNavigateToRegister}
              className="w-full border-orange-500 text-orange-500 hover:bg-orange-50"
              disabled={isLoading}
            >
              Cadastrar Restaurante
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Help Section */}
      <div className="max-w-md mx-auto">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-3">
              <h3 className="text-orange-500">Precisa de Ajuda?</h3>
              <p className="text-sm text-gray-600">
                Nossa equipe está pronta para te ajudar com qualquer dúvida sobre o cadastro ou uso da plataforma.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => window.open('https://wa.me/5581994990254?text=Preciso%20de%20ajuda', '_blank')}
                >
                  WhatsApp Suporte
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Central de Ajuda
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}