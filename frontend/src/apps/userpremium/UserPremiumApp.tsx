import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { useNavigate } from "react-router-dom";
import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { useState } from "react";
import { 
  Calendar, 
  Clock, 
  DollarSign, 
  Star, 
  Gift, 
  Shield, 
  Zap,
  TrendingUp,
  Award,
  Eye,
  Target,
  ShoppingBag,
  User,
  Camera,
  Edit,
  Phone,
  MapPin,
  Mail,
  Save,
  ArrowLeft
} from "lucide-react";

export default function App() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [profileData, setProfileData] = useState({
    name: "João Silva",
    email: "joao.silva@email.com",
    phone: "(11) 99999-9999",
    address: "Rua das Flores, 123 - São Paulo, SP"
  });

  const handleProfileSave = () => {
    setCurrentPage("dashboard");
    // Aqui você pode adicionar a lógica para salvar os dados
  };

  const goToProfile = () => {
    setCurrentPage("profile");
  };

  const goToDashboard = () => {
    setCurrentPage("dashboard");
  };

  // Página do Perfil do Usuário
  const ProfilePage = () => (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header do Perfil */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-lg p-6 mb-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white hover:bg-white/10 mr-4"
              onClick={goToDashboard}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            <h1 className="text-2xl font-semibold">Meu Perfil</h1>
          </div>
        </div>
      </div>

      {/* Conteúdo do Perfil */}
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Informações Pessoais */}
        <Card>
          <CardHeader>
            <CardTitle>Informações Pessoais</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Foto do Perfil */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="w-16 h-16 text-gray-500" />
                </div>
                <button className="absolute -bottom-2 -right-2 w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors">
                  <Camera className="w-6 h-6 text-white" />
                </button>
              </div>
              <p className="text-sm text-gray-600">Clique na câmera para alterar a foto</p>
            </div>

            {/* Formulário de Dados */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="profile-name">Nome Completo</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    id="profile-name"
                    value={profileData.name}
                    onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                    className="pl-10"
                    placeholder="Seu nome completo"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="profile-email">E-mail</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    id="profile-email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                    className="pl-10"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="profile-phone">Número de Telefone</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    id="profile-phone"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                    className="pl-10"
                    placeholder="(11) 99999-9999"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="profile-address">Endereço Completo</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    id="profile-address"
                    value={profileData.address}
                    onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                    className="pl-10"
                    placeholder="Rua, número, cidade, estado"
                  />
                </div>
              </div>
            </div>

            {/* Botões de Ação */}
            <div className="flex justify-end space-x-4 pt-6">
              <Button 
                variant="outline" 
                onClick={goToDashboard}
              >
                Cancelar
              </Button>
              <Button 
                onClick={handleProfileSave}
                className="bg-orange-500 hover:bg-orange-600"
              >
                <Save className="w-4 h-4 mr-2" />
                Salvar Alterações
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Informações da Conta */}
        <Card>
          <CardHeader>
            <CardTitle>Informações da Conta</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Status da Conta:</span>
                  <Badge className="bg-yellow-400 text-black">Premium</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Membro desde:</span>
                  <span>Janeiro 2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Pontos acumulados:</span>
                  <span className="font-semibold">234 pontos</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Pedidos realizados:</span>
                  <span className="font-semibold">47 pedidos</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Economia total:</span>
                  <span className="font-semibold text-green-600">R$ 1.280</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Avaliação média:</span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="font-semibold">4.9</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // Renderização condicional baseada na página atual
  if (currentPage === "profile") {
    return <ProfilePage />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-lg p-6 mb-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* User Profile Photo */}
            <div className="relative">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <div>
              <h1 className="text-2xl font-semibold">{profileData.name}</h1>
              <p className="text-orange-100">Membro Premium desde Janeiro 2024</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Badge className="bg-yellow-400 text-black px-3 py-1">Premium</Badge>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Statistics */}
        <Card className="bg-orange-50 border-orange-200">
          <CardHeader>
            <CardTitle className="text-orange-800">Suas Estatísticas Pessoais</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                <TrendingUp className="text-blue-500 w-6 h-6" />
                <div>
                  <p className="text-2xl font-semibold">234</p>
                  <p className="text-sm text-gray-600">Pontos acumulados</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                <Clock className="text-blue-500 w-6 h-6" />
                <div>
                  <p className="text-2xl font-semibold">30 min</p>
                  <p className="text-sm text-gray-600">Tempo médio</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                <DollarSign className="text-green-500 w-6 h-6" />
                <div>
                  <p className="text-2xl font-semibold">R$ 1.280</p>
                  <p className="text-sm text-gray-600">Economia total</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                <Star className="text-yellow-500 w-6 h-6" />
                <div>
                  <p className="text-2xl font-semibold">4.9</p>
                  <p className="text-sm text-gray-600">Sua avaliação</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-800">Ações Rápidas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Button className="bg-green-400 hover:bg-green-500 text-black p-4 h-auto flex-col space-y-2">
                <Gift className="w-6 h-6" />
                <span>Recompensas</span>
                <span className="text-xs opacity-80">Veja seus pontos e prêmios</span>
              </Button>
              
              <Button className="bg-red-400 hover:bg-red-500 text-white p-4 h-auto flex-col space-y-2" onClick={() => navigate('/perfil')}>
                <Target className="w-6 h-6" />
                <span>Relatório</span>
                <span className="text-xs opacity-80">Histórico de pedidos feitos</span>
              </Button>
              
              <Button className="bg-yellow-300 hover:bg-yellow-400 text-black p-4 h-auto flex-col space-y-2" onClick={() => navigate('/menu')}>
                <Clock className="w-6 h-6" />
                <span>Fazer Pedido</span>
                <span className="text-xs opacity-80">em até 30 minutos</span>
              </Button>
              
              <Button 
                className="bg-blue-400 hover:bg-blue-500 text-white p-4 h-auto flex-col space-y-2"
                onClick={() => navigate('/perfil')}
              >
                <User className="w-6 h-6" />
                <span>Meu Perfil</span>
                <span className="text-xs opacity-80">Gerenciar informações</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Premium Benefits */}
        <Card className="bg-orange-50 border-orange-200">
          <CardHeader>
            <CardTitle className="text-orange-800">Benefícios Premium</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">Entrega Expressa</p>
                    <p className="text-sm text-gray-600">Seus produtos são entregues em até 30 minutos</p>
                  </div>
                </div>
                <Badge className="bg-yellow-400 text-black">Novo</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <Award className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">Taxa de Entrega Grátis</p>
                    <p className="text-sm text-gray-600">Sem taxas em todos os pedidos</p>
                  </div>
                </div>
                <Badge className="bg-green-400 text-white">Ativo</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">Atendimento Prioritário</p>
                    <p className="text-sm text-gray-600">Suporte 24h via chat e WhatsApp</p>
                  </div>
                </div>
                <Badge className="bg-green-400 text-white">Ativo</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Premium Orders */}
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-800">Pedidos Premium Recentes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
                    <ShoppingBag className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">Entrega Prime</p>
                    <p className="text-sm text-gray-600">21 Abril - 1x Entrega Prime 24h</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className="bg-orange-100 text-orange-800">Pendente</Badge>
                  <p className="text-sm text-gray-600 mt-1">R$ 45,90</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
                    <ShoppingBag className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">Pizza do Casa</p>
                    <p className="text-sm text-gray-600">19 Abril - 1x Pizza Marguerita Grande + 1x Refrigerante 2L</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className="bg-green-100 text-green-800">Entregue</Badge>
                  <p className="text-sm text-gray-600 mt-1">R$ 89,90</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
                    <ShoppingBag className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">Café da Manhã</p>
                    <p className="text-sm text-gray-600">18 Abril - 2x Croissant + Café</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className="bg-green-100 text-green-800">Entregue</Badge>
                  <p className="text-sm text-gray-600 mt-1">R$ 32,50</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}