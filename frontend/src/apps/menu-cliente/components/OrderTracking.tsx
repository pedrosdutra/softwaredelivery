import { Button } from './ui/button';
import { ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function OrderTracking() {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-background">
      <div className="max-w-md mx-auto px-4 text-center">
        <Button 
          onClick={() => navigate("/rastreamento-pedido")}
          className="w-full h-12"
        >
          Acompanhar Meu Pedido
          <ExternalLink className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </section>
  );
}