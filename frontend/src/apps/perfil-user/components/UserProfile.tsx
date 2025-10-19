import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { EditProfileSheet } from "./EditProfileSheet";
import { OrderReportSheet } from "./OrderReportSheet";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Edit,
  Headphones,
  FileText,
  ChevronRight,
  Star,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export interface UserData {
  id: number;              // ID do usuário
  nome: string;
  email: string;
  telefone: string;
  cep?: string;
  endereco: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  photo?: string;
  criado_em?: string;
}

export function UserProfile() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isOrderReportOpen, setIsOrderReportOpen] = useState(false);
  const navigate = useNavigate();

  // 🧠 Carrega os dados do usuário logado
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);

      setUserData({
        id: user.id, // <-- importante para o PUT funcionar
        nome: user.nome,
        email: user.email,
        telefone: user.telefone || "Não informado",
        cep: user.cep || "",
        endereco: user.endereco || "Endereço não cadastrado",
        numero: user.numero || "",
        complemento: user.complemento || "",
        bairro: user.bairro || "",
        cidade: user.cidade || "",
        photo:
          user.photo ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(user.nome)}`,
      });
    }
  }, []);

  // 🧩 Atualiza os dados locais e no localStorage
  const handleUpdateProfile = (newData: UserData) => {
    setUserData(newData);
    localStorage.setItem("user", JSON.stringify(newData)); // salva persistente
    setIsEditOpen(false);
  };

  if (!userData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600">Carregando perfil...</p>
      </div>
    );
  }

  const enderecoCompleto = `${userData.endereco}, ${userData.numero || "s/n"
    } - ${userData.bairro || ""}, ${userData.cidade || ""}`;

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
          {/* Foto e nome */}
          <div className="flex items-center gap-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src={userData.photo} alt={userData.nome} />
              <AvatarFallback>
                <User className="w-8 h-8" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-medium">{userData.nome}</h3>
              <p className="text-muted-foreground">Membro desde 2025</p>
            </div>
          </div>

          {/* Dados do usuário */}
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
                <p>{userData.telefone}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-orange-50 border border-orange-100">
              <MapPin className="w-5 h-5 text-orange-600" />
              <div>
                <p className="text-sm text-orange-700">Endereço</p>
                <p>{enderecoCompleto}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Outras opções */}
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

      {/* Sheets */}
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
