import { OrderTracking } from './components/OrderTracking';

// Dados mockados para demonstração
const mockOrderData = {
  orderId: "BP2024-001234",
  status: "delivered" as const,
  estimatedTime: "25-35 min",
  items: [
    {
      name: "Burguer Prime Clássico",
      quantity: 2,
      price: 32.90,
      description: "Pão artesanal, blend 150g, queijo, alface, tomate, molho especial"
    },
    {
      name: "Batata Frita Premium",
      quantity: 1,
      price: 18.90,
      description: "Batatas selecionadas com tempero especial"
    },
    {
      name: "Refrigerante Lata",
      quantity: 2,
      price: 12.90
    }
  ],
  total: 110.50,
  restaurant: {
    name: "Burguer Prime",
    phone: "(11) 99999-9999",
    address: "Rua das Delícias, 123 - Centro, São Paulo - SP"
  },
  delivery: {
    driverName: "Carlos Silva",
    driverPhone: "(11) 98888-7777",
    driverPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    vehicleInfo: "Moto Honda CG 160 - Placa ABC-1234"
  }
};

export default function App() {
  return (
    <div className="min-h-screen">
      <OrderTracking {...mockOrderData} />
    </div>
  );
}