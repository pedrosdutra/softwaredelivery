import { useState } from "react";
import { Clock, Zap, MessageCircle } from "lucide-react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Textarea } from "./components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import { ChatWidget } from "./components/ChatWidget";
import foodlyLogo from '../assets/SegundaLogodoProjeto.png';

export default function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
              <MessageCircle className="w-4 h-4 text-white" />
            </div>
            <span className="text-orange-500 font-medium">Suporte Técnico</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <ImageWithFallback 
              src={foodlyLogo} 
              alt="Foodly Logo" 
              className="w-8 h-8 rounded"
            />
            <span className="text-orange-500 font-semibold">Foodly</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Section */}
          <div className="space-y-8">
            {/* Illustration */}
            <div className="flex justify-center">
              <div className="w-80 h-48 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-red-500 opacity-90"></div>
                <div className="relative z-10 text-center">
                  <div className="w-16 h-16 bg-white rounded-full mx-auto mb-4 flex items-center justify-center">
                    <MessageCircle className="w-8 h-8 text-orange-500" />
                  </div>
                  <div className="flex space-x-2 justify-center">
                    <div className="w-8 h-8 bg-yellow-400 rounded-full"></div>
                    <div className="w-8 h-8 bg-green-400 rounded-full"></div>
                    <div className="w-8 h-8 bg-blue-400 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Title and Description */}
            <div className="text-center space-y-4">
              <h1 className="text-3xl font-bold text-gray-900">Como podemos ajudar?</h1>
              <p className="text-gray-600 max-w-md mx-auto">
                Nossa equipe de suporte está aqui para resolver qualquer problema com seu 
                pedido ou aplicativo.
              </p>
            </div>

            {/* Support Options */}
            <div className="space-y-4">
              <div className="flex items-start space-x-4 p-4 bg-white rounded-lg border border-gray-200">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Clock className="w-4 h-4 text-orange-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Horário de Atendimento</h3>
                  <p className="text-gray-600 text-sm">Segunda a Domingo 8h às 20h</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 bg-white rounded-lg border border-gray-200">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Zap className="w-4 h-4 text-orange-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Resposta Rápida</h3>
                  <p className="text-gray-600 text-sm">Respondemos em até 2 horas</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Contact Form */}
          <Card className="bg-white shadow-lg">
            <CardHeader className="text-center pb-6">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-6 h-6 text-gray-600" />
              </div>
              <CardTitle className="text-xl font-semibold text-gray-900">Contato Suporte</CardTitle>
              <p className="text-gray-600 text-sm">
                Descreva seu problema e nossa equipe irá te ajudar.
              </p>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-700">Nome</Label>
                <Input 
                  id="name" 
                  placeholder="Seu nome completo"
                  className="border-gray-300 focus:border-orange-400 focus:ring-orange-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="seu@email.com"
                  className="border-gray-300 focus:border-orange-400 focus:ring-orange-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="text-gray-700">Categoria do Problema</Label>
                <Select>
                  <SelectTrigger className="border-gray-300 focus:border-orange-400 focus:ring-orange-400">
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pedido">Problema com pedido</SelectItem>
                    <SelectItem value="pagamento">Problema com pagamento</SelectItem>
                    <SelectItem value="entrega">Problema com entrega</SelectItem>
                    <SelectItem value="app">Problema no aplicativo</SelectItem>
                    <SelectItem value="conta">Problema na conta</SelectItem>
                    <SelectItem value="outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-gray-700">Mensagem</Label>
                <Textarea 
                  id="message" 
                  placeholder="Descreva detalhadamente seu problema..."
                  className="border-gray-300 focus:border-orange-400 focus:ring-orange-400 min-h-[100px]"
                />
              </div>

              <Button className="w-full bg-gray-800 hover:bg-gray-900 text-white py-3">
                Enviar Mensagem
              </Button>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Precisa de ajuda urgente?{" "}
                  <button 
                    onClick={() => setIsChatOpen(true)}
                    className="text-orange-500 hover:text-orange-600 underline bg-none border-none cursor-pointer"
                  >
                    Chat ao vivo
                  </button>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Chat Widget */}
      <ChatWidget 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
      />
    </div>
  );
}