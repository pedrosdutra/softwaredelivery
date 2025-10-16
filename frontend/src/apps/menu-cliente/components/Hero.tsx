import { Button } from "./ui/button";
import { Clock, MapPin, Star } from "lucide-react";

export function Hero() {
  const handleScrollToRestaurants = () => {
    const menuSection = document.getElementById('menu');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <section className="relative bg-gradient-to-r from-primary/5 to-primary/10 py-16 md:py-24">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Os melhores restaurantes
              <span className="text-primary block">direto na sua casa</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-md mx-auto lg:mx-0">
              Conectamos você aos melhores restaurantes da cidade com entrega rápida e qualidade garantida.
            </p>
            
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground justify-center lg:justify-start">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <span>Entrega em 30-45 min</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Raio de 10km</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 fill-current text-primary" />
                <span>4.8 (2.5k avaliações)</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg" 
                className="text-lg px-8"
                onClick={handleScrollToRestaurants}
              >
                Ver Restaurantes
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="h-48 rounded-lg overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1722125680299-783f98369451?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXJnZXIlMjBmb29kJTIwcmVzdGF1cmFudHxlbnwxfHx8fDE3NTg4MTkxNTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Hamburger delicioso"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-32 rounded-lg overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1630534375958-074cdc332d6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNzZXJ0JTIwY2FrZSUyMHN3ZWV0fGVufDF8fHx8MTc1ODgxODU2MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Sobremesa deliciosa"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="h-32 rounded-lg overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1667422542005-eb6909ac24c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXp6YSUyMHNsaWNlJTIwZm9vZHxlbnwxfHx8fDE3NTg4MDYzMzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Pizza saborosa"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-48 rounded-lg overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1606757819934-d61a9f7279d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHNhbGFkJTIwaGVhbHRoeXxlbnwxfHx8fDE3NTg3MDQxNzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Salada fresca"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}