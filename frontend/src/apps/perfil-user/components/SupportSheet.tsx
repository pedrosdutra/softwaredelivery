import { useState } from 'react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from './ui/sheet';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card, CardContent } from './ui/card';
import { Send, Phone, Mail, MessageCircle, Clock } from 'lucide-react';

interface SupportSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SupportSheet({ isOpen, onOpenChange }: SupportSheetProps) {
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simular envio da mensagem
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setMessage('');
    setEmail('');
    setIsLoading(false);
    onOpenChange(false);
    
    // Aqui você pode adicionar um toast de sucesso
    alert('Mensagem enviada com sucesso! Nossa equipe responderá em breve.');
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-[600px] sm:w-[800px]">
        <SheetHeader>
          <SheetTitle>Suporte Técnico</SheetTitle>
          <SheetDescription>
            Entre em contato conosco para obter ajuda ou esclarecer dúvidas.
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 mt-6">
          {/* Informações de Contato */}
          <div className="grid grid-cols-1 gap-4">
            <Card className="border-orange-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-orange-600" />
                  <div>
                    <p className="font-medium">Telefone</p>
                    <p className="text-sm text-muted-foreground">(11) 4000-0000</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-orange-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-orange-600" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">suporte@foodly.com</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-orange-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-orange-600" />
                  <div>
                    <p className="font-medium">Horário de Atendimento</p>
                    <p className="text-sm text-muted-foreground">Segunda a Sexta: 8h às 18h</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Formulário de Contato */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="support-email">Seu Email</Label>
              <Input
                id="support-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="support-message">Mensagem</Label>
              <Textarea
                id="support-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Descreva seu problema ou dúvida..."
                rows={4}
                required
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center gap-2 bg-orange-600 hover:bg-orange-700"
            >
              <Send className="w-4 h-4" />
              {isLoading ? 'Enviando...' : 'Enviar Mensagem'}
            </Button>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
}