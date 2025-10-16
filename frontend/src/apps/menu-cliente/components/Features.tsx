import { Clock, Shield, Truck, Star } from "lucide-react";

const features = [
  {
    icon: Clock,
    title: "Entrega Rápida",
    description: "Seus pratos favoritos chegam em até 45 minutos"
  },
  {
    icon: Shield,
    title: "Qualidade Garantida",
    description: "Ingredientes frescos e preparo cuidadoso"
  },
  {
    icon: Truck,
    title: "Entrega Gratuita",
    description: "Frete grátis em pedidos acima de R$ 35,00"
  },
  {
    icon: Star,
    title: "Avaliação 5 Estrelas",
    description: "Mais de 2.500 clientes satisfeitos"
  }
];

export function Features() {
  return (
    <section className="py-16 bg-muted/50">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Por que escolher a gente?
          </h2>
          <p className="text-lg text-muted-foreground">
            Comprometidos em oferecer a melhor experiência gastronômica
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary">
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}