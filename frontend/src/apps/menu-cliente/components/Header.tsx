import { useState } from "react";
import { ShoppingCart, Search, Menu, User, Bell } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Cart } from "./Cart";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import foodlyLogo from "../../assets/SegundaLogodoProjeto.png";
import { title } from "process";

export function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const { getTotalItems } = useCart();
  const navigate = useNavigate();

  const notifications = [
    {
      id: 1,
      title: "50% OFF na primeira compra",
      restaurant: "Burger Prime",
      image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXJnZXIlMjBmb29kfGVufDF8fHx8MTc1ODgzMjQ1OXww&ixlib=rb-4.1.0&q=80&w=1080",
      isNew: true
    },
    {
      id: 2,
      title: "Pizza Família por R$ 39,90",
      restaurant: "Nonna Bella",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXp6YSUyMGZvb2R8ZW58MXx8fHwxNzU4ODMyNDU5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      isNew: true
    },
    {
      id: 3,
      title: "Combo Saudável + Suco",
      restaurant: "Green Life",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwZm9vZHxlbnwxfHx8fDE3NTg4MzI0NTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      isNew: false
    }
  ];

  const newNotificationsCount = notifications.filter(n => n.isNew).length;

  const handleNavClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSuporteClick = () => {
    // Aqui seria o link para o sistema de suporte técnico
    window.open('https://suporte.foodly.com', '_blank');
  };

  const handleNotificationClick = (restaurant: string) => {
    const promotionUrl = `https://www.ifood.com.br/delivery/${restaurant.toLowerCase().replace(' ', '-')}/promocoes`;
    window.open(promotionUrl, '_blank');
    setIsNotificationsOpen(false);
  };

  const totalItems = getTotalItems();
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-7xl mx-auto flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img 
            src={foodlyLogo} 
            alt="Foodly Logo" 
            className="h-10 w-10"
          />
          <span className="font-bold text-xl">Foodly</span>
        </div>

        {/* Navigation - Hidden on mobile */}
        <nav className="hidden md:flex items-center space-x-6">
          <button 
            onClick={() => handleNavClick('home')} 
            className="hover:text-primary transition-colors"
          >
            Início
          </button>
          <button 
            onClick={() => handleNavClick('menu')} 
            className="hover:text-primary transition-colors"
          >
            Restaurantes
          </button>
          <button 
            onClick={() => handleNavClick('footer')} 
            className="hover:text-primary transition-colors"
          >
            Contato
          </button>
          <button 
            onClick={handleSuporteClick}
            className="hover:text-primary transition-colors"
          >
            Suporte
          </button>
          <button 
            onClick={() => handleNavClick('footer')} 
            className="hover:text-primary transition-colors"
          >
            Sobre
          </button>
        </nav>

        {/* Search Bar - Hidden on mobile */}
        <div className="hidden md:flex items-center space-x-2 flex-1 max-w-sm ml-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Busque por restaurantes..." 
              className="pl-10"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          {/* Notifications */}
          <div className="relative">
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative"
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            >
              <Bell className="h-5 w-5" />
              {newNotificationsCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                  {newNotificationsCount}
                </span>
              )}
            </Button>

            {isNotificationsOpen && (
              <>
                {/* Backdrop */}
                <div 
                  className="fixed inset-0 z-40"
                  onClick={() => setIsNotificationsOpen(false)}
                />
                
                {/* Dropdown */}
                <div className="absolute right-0 mt-2 w-80 bg-popover text-popover-foreground rounded-md border p-0 shadow-md z-50">
                  <div className="p-4 border-b">
                    <h3 className="font-semibold">Promoções Especiais</h3>
                    <p className="text-sm text-muted-foreground">Ofertas dos nossos restaurantes</p>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <Card 
                        key={notification.id} 
                        className="m-3 cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => handleNotificationClick(notification.restaurant)}
                      >
                        <CardContent className="p-3">
                          <div className="flex gap-3">
                            <ImageWithFallback
                              src={notification.image}
                              alt={notification.title}
                              className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <h4 className="text-sm font-medium truncate">
                                  {notification.title}
                                </h4>
                                {notification.isNew && (
                                  <Badge className="bg-primary text-primary-foreground text-xs px-1 py-0">
                                    Novo
                                  </Badge>
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">
                                {notification.restaurant}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  <div className="p-3 border-t">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => {
                        document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
                        setIsNotificationsOpen(false);
                      }}
                    >
                      Ver Todas as Promoções
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Cart */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Button>
          
          <Button variant="ghost" size="icon" className="hidden md:flex" onClick={() => navigate("/perfil")}>
            <User className="h-5 w-5" />
          </Button>

          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Cart Component */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Mobile Search - Visible only on mobile */}
      <div className="md:hidden px-6 pb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder="Busque por restaurantes..." 
            className="pl-10"
          />
        </div>
      </div>
    </header>
  );
}