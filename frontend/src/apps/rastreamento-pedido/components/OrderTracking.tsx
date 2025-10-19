import { 
  Clock, MapPin, Phone, CheckCircle2, Package, Truck, Home, Star 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useNavigate } from 'react-router-dom';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  description?: string;
}

interface OrderTrackingProps {
  orderId: string;
  status: 'preparing' | 'ready' | 'on-route' | 'delivered';
  estimatedTime: string;
  items: OrderItem[];
  total: number;
  restaurant: {
    name: string;
    phone: string;
    address: string;
  };
  delivery: {
    driverName: string;
    driverPhone: string;
    driverPhoto?: string;
    vehicleInfo: string;
  };
}

const statusSteps = [
  { key: 'preparing', label: 'Preparando', icon: Package, color: 'text-orange-600' },
  { key: 'ready', label: 'Pronto', icon: CheckCircle2, color: 'text-blue-600' },
  { key: 'on-route', label: 'A caminho', icon: Truck, color: 'text-purple-600' },
  { key: 'delivered', label: 'Entregue', icon: Home, color: 'text-green-600' }
];

export function OrderTracking({
  orderId,
  status,
  estimatedTime,
  items,
  total,
  restaurant,
  delivery
}: OrderTrackingProps) {
  const navigate = useNavigate();
  const currentStepIndex = statusSteps.findIndex(step => step.key === status);
  const progress = ((currentStepIndex + 1) / statusSteps.length) * 100;

  const getStatusText = () => {
    switch (status) {
      case 'preparing':
        return 'Seu pedido está sendo preparado com carinho 🍳';
      case 'ready':
        return 'Pedido pronto! Aguardando entregador 🛵';
      case 'on-route':
        return 'Pedido a caminho da sua casa 🚗';
      case 'delivered':
        return 'Pedido entregue com sucesso! 🍔';
      default:
        return 'Acompanhando seu pedido...';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <div className="max-w-6xl mx-auto px-8 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold">{restaurant.name}</h1>
              <p className="text-orange-100 text-lg">Pedido #{orderId}</p>
            </div>
            <div className="text-right">
              <p className="text-orange-100">Tempo estimado</p>
              <p className="text-3xl font-bold">{estimatedTime}</p>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-orange-100 mb-3">Status do pedido</p>
            <Progress value={progress} className="bg-orange-300 h-3" />
          </div>

          <p className="text-center text-white text-lg font-medium">{getStatusText()}</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-8">
        {/* Status Timeline */}
        <div className="mb-12">
          <div className="flex justify-center items-center">
            <div className="flex items-center space-x-16">
              {statusSteps.map((step, index) => {
                const Icon = step.icon;
                const isActive = index <= currentStepIndex;
                const isConnected = index < statusSteps.length - 1;

                return (
                  <div key={step.key} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 ${
                          isActive ? 'bg-green-500 text-white shadow-lg' : 'bg-gray-200 text-gray-400'
                        }`}
                      >
                        <Icon className="w-8 h-8" />
                      </div>
                      <span
                        className={`text-sm font-medium ${
                          isActive ? 'text-green-600' : 'text-gray-400'
                        }`}
                      >
                        {step.label}
                      </span>
                    </div>
                    {isConnected && (
                      <div
                        className={`h-1 w-16 mx-8 rounded-full ${
                          index < currentStepIndex ? 'bg-green-500' : 'bg-gray-200'
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Order Items */}
          <div className="lg:col-span-2">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Package className="w-6 h-6" />
                  Seus itens
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {items.map((item, index) => (
                    <div key={index} className="flex justify-between items-start py-3 border-b last:border-b-0">
                      <div className="flex-1">
                        <p className="font-medium text-lg">{item.quantity}x {item.name}</p>
                        {item.description && (
                          <p className="text-gray-600 mt-1">{item.description}</p>
                        )}
                      </div>
                      <p className="font-medium text-lg">R$ {item.price.toFixed(2)}</p>
                    </div>
                  ))}
                  <div className="border-t-2 pt-4 flex justify-between items-center">
                    <p className="font-bold text-xl">Total</p>
                    <p className="font-bold text-2xl text-green-600">R$ {total.toFixed(2)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Rate Order Button */}
            {status === 'delivered' && (
              <Card className="shadow-sm mt-6">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <h3 className="font-medium text-lg mb-2">Como foi sua experiência?</h3>
                    <p className="text-gray-600 mb-4">Sua opinião é muito importante para nós!</p>
                    <Button 
                      className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white"
                      onClick={() => navigate("/avaliacao")}
                    >
                      <Star className="w-5 h-5 mr-2" />
                      Avaliar Pedido
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Restaurant and Delivery Info */}
          <div className="space-y-6">
            {/* Restaurant Info */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-6 h-6" />
                  {restaurant.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{restaurant.address}</p>
                <Button variant="outline" className="w-full h-12">
                  <Phone className="w-5 h-5 mr-2" />
                  Ligar para o restaurante
                </Button>
              </CardContent>
            </Card>

            {/* Delivery Info */}
            {status !== 'preparing' && (
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="w-6 h-6" />
                    Informações da entrega
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 mb-6">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={delivery.driverPhoto} />
                      <AvatarFallback className="text-lg">
                        {delivery.driverName
                          .split(' ')
                          .map(n => n[0])
                          .join('')
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium text-lg">{delivery.driverName}</p>
                      <p className="text-gray-600">{delivery.vehicleInfo}</p>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800 px-3 py-1">
                      Online
                    </Badge>
                  </div>
                  <Button variant="outline" className="w-full h-12">
                    <Phone className="w-5 h-5 mr-2" />
                    Ligar para o entregador
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}