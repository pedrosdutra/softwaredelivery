import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Bell, Clock, Percent, ExternalLink } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function PromotionalNotifications() {
  const promotions = [
    {
      id: 1,
      title: "50% OFF na primeira compra",
      description: "Aproveite desconto especial no Burger Prime",
      restaurant: "Burger Prime",
      discount: "50%",
      validUntil: "Válido até amanhã",
      image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXJnZXIlMjBmb29kfGVufDF8fHx8MTc1ODgzMjQ1OXww&ixlib=rb-4.1.0&q=80&w=1080",
      type: "new-user"
    },
    {
      id: 2,
      title: "Pizza Família por R$ 39,90",
      description: "Oferta especial de final de semana",
      restaurant: "Nonna Bella",
      discount: "30%",
      validUntil: "Até domingo",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXp6YSUyMGZvb2R8ZW58MXx8fHwxNzU4ODMyNDU5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      type: "weekend"
    },
    {
      id: 3,
      title: "Combo Saudável + Suco",
      description: "Refeição completa com desconto imperdível",
      restaurant: "Green Life",
      discount: "25%",
      validUntil: "Por tempo limitado",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwZm9vZHxlbnwxfHx8fDE3NTg4MzI0NTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      type: "healthy"
    }
  ];

  const handleViewPromotion = (restaurant: string) => {
    // Redireciona para site da promoção
    const promotionUrl = `https://www.ifood.com.br/delivery/${restaurant.toLowerCase().replace(' ', '-')}/promocoes`;
    window.open(promotionUrl, '_blank');
  };

  return (
    <section className="py-16 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Bell className="h-6 w-6 text-primary" />
            <h2 className="text-primary">Promoções Especiais</h2>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Não perca as melhores ofertas dos nossos restaurantes afiliados
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {promotions.map((promotion) => (
            <Card key={promotion.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
              <div className="relative">
                <ImageWithFallback
                  src={promotion.image}
                  alt={promotion.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <Badge className="bg-primary text-primary-foreground">
                    <Percent className="h-3 w-3 mr-1" />
                    {promotion.discount}
                  </Badge>
                </div>
                <div className="absolute top-3 right-3">
                  <Badge variant="secondary" className="bg-white/90 text-foreground">
                    {promotion.restaurant}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-6">
                <h3 className="mb-2 group-hover:text-primary transition-colors">
                  {promotion.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {promotion.description}
                </p>

                <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  {promotion.validUntil}
                </div>

                <Button 
                  onClick={() => handleViewPromotion(promotion.restaurant)}
                  className="w-full"
                  size="sm"
                >
                  Ver Promoção
                  <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            onClick={() => window.open('https://www.ifood.com.br/promocoes', '_blank')}
          >
            Ver Todas as Promoções
            <ExternalLink className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}