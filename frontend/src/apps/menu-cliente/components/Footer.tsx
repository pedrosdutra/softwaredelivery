import { Facebook, Instagram, Twitter, Phone, Mail, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import foodlyLogo from '../../assets/SegundaLogodoProjeto.png';

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo e Sobre */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img 
                src={foodlyLogo} 
                alt="Foodly Logo" 
                className="h-10 w-10"
              />
              <span className="font-bold text-xl">Foodly</span>
            </div>
            <div className="space-y-3">
              <h5 className="font-semibold text-sm">Sobre Nós</h5>
              <p className="text-primary-foreground/80 text-sm">
                Somos uma plataforma inovadora que conecta você aos melhores restaurantes parceiros. Nossa missão é facilitar o acesso à gastronomia de qualidade com entrega rápida e experiência excepcional.
              </p>
              <p className="text-primary-foreground/80 text-xs">
                Fundada em 2025 • Mais de 70 restaurantes parceiros
              </p>
            </div>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10">
                <Twitter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Links Rápidos */}
          <div className="space-y-4">
            <h4 className="font-semibold">Links Rápidos</h4>
            <div className="space-y-2 text-sm">
              <button 
                onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })}
                className="block hover:text-primary-foreground/80 transition-colors text-left"
              >
                Início
              </button>
              <button 
                onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
                className="block hover:text-primary-foreground/80 transition-colors text-left"
              >
                Restaurantes
              </button>
              <a href="mailto:contato@foodly.com" className="block hover:text-primary-foreground/80 transition-colors">
                Seja Parceiro
              </a>
              <a href="tel:+5581999999999" className="block hover:text-primary-foreground/80 transition-colors">
                Suporte
              </a>
            </div>
          </div>

          {/* Categorias */}
          <div className="space-y-4">
            <h4 className="font-semibold">Categorias</h4>
            <div className="space-y-2 text-sm">
              <a href="#" className="block hover:text-primary-foreground/80 transition-colors">
                Lanchonetes
              </a>
              <a href="#" className="block hover:text-primary-foreground/80 transition-colors">
                Pizzarias
              </a>
              <a href="#" className="block hover:text-primary-foreground/80 transition-colors">
                Comida Saudável
              </a>
              <a href="#" className="block hover:text-primary-foreground/80 transition-colors">
                Bares e Drinks
              </a>
            </div>
          </div>

          {/* Contato */}
          <div className="space-y-4">
            <h4 className="font-semibold">Contato</h4>
            <div className="space-y-3 text-sm">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>(81) 99999-9999</span>
                </div>
                <p className="text-xs text-primary-foreground/60 ml-6">Atendimento 24h</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>contato@foodly.com</span>
                </div>
                <p className="text-xs text-primary-foreground/60 ml-6">Resposta em até 2h</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>Recife, Pernambuco</span>
                </div>
                <p className="text-xs text-primary-foreground/60 ml-6">Atendemos toda região metropolitana</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm text-primary-foreground/80">
          <p>&copy; 2025 Foodly. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}