import { useState, useRef, useEffect } from "react";
import { X, Send, Bot, User } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

interface ChatWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChatWidget({ isOpen, onClose }: ChatWidgetProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Olá! 👋 Sou a assistente virtual do Foodly. Como posso te ajudar hoje?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);

  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Faz o scroll ir até o final automaticamente
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Função auxiliar segura para pegar resposta aleatória
  const pickRandom = (arr: string[]): string =>
    arr[Math.floor(Math.random() * arr.length)];

  const aiResponses = {
    greeting: [
      "Olá! 😊 Como posso te ajudar hoje?",
      "Oi! Sou a assistente Foodly — posso te ajudar com pedidos, pagamentos ou entregas.",
    ],
    pedido: [
      "📦 Certo! Você quer acompanhar seu pedido? Me diga o número ou o email cadastrado.",
      "Posso verificar o status do seu pedido. Qual o código ou restaurante?",
    ],
    pagamento: [
      "💳 Entendido! Está com problema em uma cobrança? Posso te ajudar com isso.",
      "Você quer ver o status do pagamento ou resolver um erro de transação?",
    ],
    entrega: [
      "🚚 Está verificando sua entrega? Posso checar pra você.",
      "Seu pedido está demorando? Me diga o número que vejo o status.",
    ],
    app: [
      "📱 Está com problema no aplicativo? Pode me contar o que está acontecendo?",
      "O app está travando ou mostrando erro? Vamos resolver juntos!",
    ],
    despedida: [
      "Foi um prazer ajudar você! 🍽️ Tenha um ótimo dia!",
      "Até mais! Obrigada por usar o Foodly 💛",
    ],
    default: [
      "Posso ajudar com pedidos, pagamentos, entregas ou suporte técnico.",
      "Hmm... não entendi muito bem. Você pode reformular a pergunta?",
      "Interessante! Me conte um pouco mais sobre isso 😊",
    ],
  };

  function getAIResponse(message: string): string {
  const msg = message.toLowerCase();
  const pickRandom = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

  // Cumprimentos
  if (/olá|oi|bom dia|boa tarde|boa noite/.test(msg))
    return pickRandom([
      "Olá! 😊 Que bom te ver por aqui! Como posso te ajudar hoje?",
      "Oi! 👋 Sou a assistente Foodly. Me conta o que está acontecendo?",
      "Olá! 💛 Precisa de ajuda com um pedido ou acesso à sua conta?",
    ]);

  // Login / senha
  if (/senha|login|acesso|entrar|esqueci/.test(msg))
    return pickRandom([
      "Entendi! 🔐 Se você esqueceu sua senha, basta clicar em **'Esqueci minha senha'** na tela de login. Vai chegar um e-mail com o link de redefinição 😉",
      "Ah, isso acontece! 💛 Vá até a tela de login e clique em **'Esqueci minha senha'** — em seguida, siga as instruções que enviamos pro seu e-mail.",
      "Sem problema! 👍 Você pode recuperar sua senha clicando em **'Esqueci minha senha'** na página de login. Caso não receba o e-mail, me avise que verifico isso pra você.",
    ]);

  // Pedido
  if (/pedido|compra|ordem|número/.test(msg))
    return pickRandom([
      "Certo! 📦 Pode me informar o número do seu pedido pra eu verificar o status?",
      "Perfeito! 💬 Me diga o número do pedido ou o restaurante pra eu consultar.",
    ]);

  // Entrega
  if (/entrega|delivery|motoboy|chegando|demorando/.test(msg))
    return pickRandom([
      "Poxa, sinto muito pela demora 😔 Pode me passar o número do pedido pra eu conferir o status da entrega?",
      "Claro! 🚚 Me diga o número do pedido pra eu verificar o andamento da entrega.",
    ]);

  // Pagamento
  if (/pagamento|cobrança|fatura|pix|cartão/.test(msg))
    return pickRandom([
      "💳 Entendi! Está com problema em uma cobrança ou quer confirmar o pagamento?",
      "Certo! Pode me explicar o que aconteceu no pagamento? Assim te ajudo mais rápido.",
    ]);

  // App / técnico
  if (/app|aplicativo|bug|erro|travando/.test(msg))
    return pickRandom([
      "Vamos resolver isso juntos! 💪 Você pode me contar o que exatamente o app está fazendo (por exemplo, travando, fechando, mostrando erro)?",
      "Hmm, parece problema técnico 😅 Já tentou fechar e abrir o app novamente? Se continuar, posso te ajudar a limpar o cache ou reinstalar.",
    ]);

  // Agradecimentos / encerramento
  if (/tchau|obrigado|valeu|obg|agradeço/.test(msg))
    return pickRandom([
      "De nada! 😊 Foi um prazer te ajudar. Até logo!",
      "💛 Que bom poder ajudar! Se precisar, estarei por aqui.",
      "Obrigada pelo contato! Espero que tudo se resolva rapidinho ✨",
    ]);

  // Padrão (sem contexto)
  return pickRandom([
    "Entendi! Pode me dar um pouquinho mais de detalhes, por favor?",
    "Hmm... acho que posso te ajudar nisso! Me explica melhor o que está acontecendo 👀",
    "Estou aqui pra te ajudar 💛 Me conta mais sobre o problema!",
  ]);
}

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Delay dinâmico mais natural
    const delay = 1200 + Math.random() * 800;

    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(userMessage.text),
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, delay);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSendMessage();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed left-4 bottom-4 w-96 h-[600px] bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col z-50"
      style={{ animation: "fadeInUp 0.3s ease" }}
    >
      {/* Header */}
      <div className="bg-orange-600 text-white p-4 rounded-t-lg flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <Bot className="w-5 h-5 text-orange-600" />
          </div>
          <div>
            <h3 className="font-semibold">Assistente Foodly</h3>
            <p className="text-xs text-orange-100">Online agora</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="text-white hover:bg-orange-700 h-8 w-8 p-0"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Chat messages */}
      <ScrollArea className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${
                m.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`flex items-start space-x-2 max-w-[85%] ${
                  m.sender === "user" ? "flex-row-reverse space-x-reverse" : ""
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    m.sender === "user" ? "bg-orange-600" : "bg-gray-100"
                  }`}
                >
                  {m.sender === "user" ? (
                    <User className="w-3 h-3 text-white" />
                  ) : (
                    <Bot className="w-3 h-3 text-gray-600" />
                  )}
                </div>
                <div
                  className={`p-3 rounded-lg shadow-sm ${
                    m.sender === "user"
                      ? "bg-orange-600 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  <p className="text-sm">{m.text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      m.sender === "user"
                        ? "text-orange-100"
                        : "text-gray-500"
                    }`}
                  >
                    {m.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-2">
                <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                  <Bot className="w-3 h-3 text-gray-600" />
                </div>
                <div className="bg-gray-100 p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Digite sua mensagem..."
            className="flex-1 border-gray-300 focus:border-orange-400 focus:ring-orange-400"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isTyping}
            className="bg-orange-600 hover:bg-orange-700"
            size="sm"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          Powered by Foodly AI 🤖
        </p>
      </div>
    </div>
  );
}