import { Button } from './ui/button';
import { ExternalLink } from 'lucide-react';

export function OrderTracking() {
  const handleTrackOrders = () => {
    // Redireciona para site de acompanhamento de pedidos de delivery
    const trackingUrl = `https://www.foodly.com.br/meus-pedidos`;
    window.open(trackingUrl, '_blank');
  };

  return (
    <section className="py-16 bg-background">
      <div className="max-w-md mx-auto px-4 text-center">
        <Button 
          onClick={handleTrackOrders}
          className="w-full h-12"
        >
          Acompanhar Meu Pedido
          <ExternalLink className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </section>
  );
}