import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Heart, Shuffle, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function FoodTools() {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/30">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ferramentas <span className="text-primary">Inovadoras</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Descubra nossas ferramentas exclusivas para tornar sua escolha alimentar ainda mais fácil e divertida
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Par de Comida */}
          <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden border-2 hover:border-primary/20">
            <div className="relative h-48 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1758523417997-648f3b740f63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhjb3VwbGUlMjBlYXRpbmclMjBmb29kJTIwdG9nZXRoZXJ8ZW58MXx8fHwxNzU4ODIzMzUxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Casal comendo juntos"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <div className="flex items-center space-x-2 text-white">
                  <Heart className="h-6 w-6 fill-current text-primary" />
                  <span className="font-semibold text-lg">Par de Comida</span>
                </div>
              </div>
            </div>
            <CardContent className="p-6">
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Está indeciso no que comer com seu par ou amigo? Utilize nossa ferramenta inovadora de Par de comida. 
                Com essa ferramenta iremos fazer você e a pessoa junto a voce escolher a comida ideal para ambos.
              </p>
              <Button 
                onClick={() => navigate("/par-de-comida")}
                className="w-full group/btn cursor-pointer"
                size="lg"
              >
                Descobrir Juntos
                <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>

          {/* Comida Aleatória */}
          <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden border-2 hover:border-primary/20">
            <div className="relative h-48 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1741448682476-55786f461576?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxyYW5kb20lMjBmb29kJTIwc3VycHJpc2V8ZW58MXx8fHwxNzU4ODIzMzUzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Comida surpresa"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <div className="flex items-center space-x-2 text-white">
                  <Shuffle className="h-6 w-6 text-primary" />
                  <span className="font-semibold text-lg">Comida Aleatória</span>
                </div>
              </div>
            </div>
            <CardContent className="p-6">
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Se não sabe o que comer para bater aquele 'sarrinho' utilize a nosso meio para achar a melhor comida para voce. 
                Deixe a sorte decidir e descubra novos sabores incríveis!
              </p>
              <Button 
                onClick={() => navigate("/comida-aleatoria")}
                variant="outline"
                className="w-full group/btn border-primary text-primary hover:bg-primary hover:text-primary-foreground cursor-pointer"
                size="lg"
              >
                Surpreenda-me
                <Shuffle className="ml-2 h-4 w-4 group-hover/btn:rotate-180 transition-transform duration-300" />
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground">
            Novas ferramentas em breve! Fique atento às nossas novidades.
          </p>
        </div>
      </div>
    </section>
  );
}