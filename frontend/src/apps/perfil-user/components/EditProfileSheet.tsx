import { useState, useRef } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Camera, User, Save, X } from "lucide-react";
import { UserData } from "./UserProfile";

interface EditProfileSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  userData: UserData;
  onUpdateProfile: (data: UserData) => void;
}

export function EditProfileSheet({
  isOpen,
  onOpenChange,
  userData,
  onUpdateProfile,
}: EditProfileSheetProps) {
  const [formData, setFormData] = useState<UserData>(userData);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (field: keyof UserData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setFormData((prev) => ({ ...prev, photo: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`http://localhost:3001/api/users/${userData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: formData.nome,
          email: formData.email,
          telefone: formData.telefone,
          endereco: formData.endereco,
          cep: formData.cep,
          bairro: formData.bairro,
          cidade: formData.cidade,
          numero: formData.numero,
          complemento: formData.complemento,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Erro ao atualizar perfil");

      // Atualiza o localStorage e o estado global
      const updatedUser = { ...formData, id: userData.id };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      onUpdateProfile(updatedUser);

      alert("✅ Perfil atualizado com sucesso!");
      onOpenChange(false);
    } catch (error) {
      alert("❌ Falha ao atualizar o perfil. Verifique sua conexão ou o servidor.");
      console.error("Erro ao atualizar perfil:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData(userData);
    onOpenChange(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:w-[560px] bg-gradient-to-br from-orange-50 to-white border-l-2 border-orange-200">
        <SheetHeader className="border-b border-orange-200 pb-3">
          <SheetTitle className="text-xl font-semibold text-orange-700">
            Editar Perfil
          </SheetTitle>
          <SheetDescription className="text-gray-600">
            Atualize suas informações pessoais abaixo.
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          {/* Foto de Perfil */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative group">
              <Avatar className="w-28 h-28 border-4 border-orange-200 shadow-md">
                <AvatarImage src={formData.photo} alt={formData.nome} />
                <AvatarFallback>
                  <User className="w-10 h-10" />
                </AvatarFallback>
              </Avatar>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-1 right-1 bg-orange-500 text-white rounded-full p-2 shadow-md hover:bg-orange-600 transition"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
            />
          </div>

          {/* Campos do Formulário */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="nome">Nome</Label>
              <Input
                id="nome"
                value={formData.nome}
                onChange={(e) => handleInputChange("nome", e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="telefone">Telefone</Label>
              <Input
                id="telefone"
                value={formData.telefone}
                onChange={(e) => handleInputChange("telefone", e.target.value)}
                placeholder="(11) 99999-9999"
              />
            </div>

            <div>
              <Label htmlFor="cep">CEP</Label>
              <Input
                id="cep"
                value={formData.cep || ""}
                onChange={(e) => handleInputChange("cep", e.target.value)}
              />
            </div>

            <div className="sm:col-span-2">
              <Label htmlFor="endereco">Endereço</Label>
              <Input
                id="endereco"
                value={formData.endereco}
                onChange={(e) => handleInputChange("endereco", e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="bairro">Bairro</Label>
              <Input
                id="bairro"
                value={formData.bairro || ""}
                onChange={(e) => handleInputChange("bairro", e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="cidade">Cidade</Label>
              <Input
                id="cidade"
                value={formData.cidade || ""}
                onChange={(e) => handleInputChange("cidade", e.target.value)}
              />
            </div>
          </div>

          {/* Botões */}
          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1 flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white h-11 rounded-lg shadow-md hover:scale-[1.02] transition-all"
            >
              <Save className="w-4 h-4" />
              {isLoading ? "Salvando..." : "Salvar Alterações"}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isLoading}
              className="flex items-center gap-2 border-orange-300 text-orange-600 hover:bg-orange-50"
            >
              <X className="w-4 h-4" />
              Cancelar
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
