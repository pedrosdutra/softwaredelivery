import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { EditProfileSheet } from './EditProfileSheet';
import { OrderReportSheet } from './OrderReportSheet';
import { User, Mail, Phone, MapPin, Edit, Headphones, FileText, ChevronRight, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export interface UserData {
  name: string;
  email: string;
  phone: string;
  address: string;
  photo: string;
}

export function UserProfile() {
  const [userData, setUserData] = useState<UserData>({
    name: 'João Silva',
    email: 'joao.silva@email.com',
    phone: '(11) 99999-9999',
    address: 'Rua das Flores, 123 - São Paulo, SP',
    photo: 'https://images.unsplash.com/photo-1585972949678-b7eff107d061?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9maWxlJTIwYXZhdGFyJTIwcGxhY2Vob2xkZXJ8ZW58MXx8fHwxNzU4ODI4MjE5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  });

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [isOrderReportOpen, setIsOrderReportOpen] = useState(false);
  const navigate = useNavigate();
  const handleUpdateProfile = (newData: UserData) => {
    setUserData(newData);
    setIsEditOpen(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <Card className="border-orange-200">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Meu Perfil</span>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsEditOpen(true)}
              className="flex items-center gap-2 border-orange-300 text-orange-600 hover:bg-orange-50"
            >
              <Edit className="w-4 h-4" />
              Editar Perfil
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Foto de Perfil */}
          <div className="flex items-center gap-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src={userData.photo} alt={userData.name} />
              <AvatarFallback>
                <User className="w-8 h-8" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-medium">{userData.name}</h3>
              <p className="text-muted-foreground">Membro desde 2025</p>
            </div>
          </div>

          {/* Informações do Usuário */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-orange-50 border border-orange-100">
              <Mail className="w-5 h-5 text-orange-600" />
              <div>
                <p className="text-sm text-orange-700">Email</p>
                <p>{userData.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-orange-50 border border-orange-100">
              <Phone className="w-5 h-5 text-orange-600" />
              <div>
                <p className="text-sm text-orange-700">Telefone</p>
                <p>{userData.phone}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-orange-50 border border-orange-100">
              <MapPin className="w-5 h-5 text-orange-600" />
              <div>
                <p className="text-sm text-orange-700">Endereço</p>
                <p>{userData.address}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Opções Adicionais */}
      <div className="space-y-4">
        <Card 
          className="border-orange-200 cursor-pointer transition-colors hover:bg-orange-50"
          onClick={() => navigate("/userpremium")}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-r from-orange-100 to-yellow-100">
                  <Star className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-medium flex items-center gap-2">
                    Usuário Premium 
                    <span className="text-xs bg-gradient-to-r from-orange-600 to-yellow-600 text-white px-2 py-1 rounded-full">
                      UPGRADE
                    </span>
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Desbloqueie benefícios exclusivos e entregas grátis
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card 
          className="border-orange-200 cursor-pointer transition-colors hover:bg-orange-50"
          onClick={() => navigate("/suporte")}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-orange-100">
                  <Headphones className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-medium">Suporte Técnico</h3>
                  <p className="text-sm text-muted-foreground">
                    Precisa de ajuda? Entre em contato conosco
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card 
          className="border-orange-200 cursor-pointer transition-colors hover:bg-orange-50"
          onClick={() => setIsOrderReportOpen(true)}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-orange-100">
                  <FileText className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-medium">Relatório de Pedidos</h3>
                  <p className="text-sm text-muted-foreground">
                    Visualize seu histórico de pedidos e estatísticas
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      <EditProfileSheet
        isOpen={isEditOpen}
        onOpenChange={setIsEditOpen}
        userData={userData}
        onUpdateProfile={handleUpdateProfile}
      />

      <OrderReportSheet
        isOpen={isOrderReportOpen}
        onOpenChange={setIsOrderReportOpen}
      />
    </div>
  );
}