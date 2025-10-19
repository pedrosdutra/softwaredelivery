import { OrderEvaluation } from "./components/OrderEvaluation";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  // Dados simulados de um pedido entregue
  const orderData = {
    orderId: "FD-2024-001",
    restaurantName: "Burger King",
    deliveryTime: "35 min",
    orderItems: [
      "Big King",
      "Batata Frita Grande", 
      "Coca-Cola 500ml",
      "Sundae de Chocolate"
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <OrderEvaluation {...orderData} />
      <Toaster />
    </div>
  );
}