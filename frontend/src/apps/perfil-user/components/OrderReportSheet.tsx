import { useState } from 'react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from './ui/sheet';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { CalendarDays, Package, DollarSign, Clock, MapPin, Download } from 'lucide-react';

interface Order {
  id: string;
  date: string;
  restaurant: string;
  items: string[];
  total: number;
  status: 'delivered' | 'pending' | 'cancelled';
  deliveryTime: string;
  address: string;
}

interface OrderReportSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function OrderReportSheet({ isOpen, onOpenChange }: OrderReportSheetProps) {
  const [orders] = useState<Order[]>([
    {
      id: '001',
      date: '2024-09-25',
      restaurant: 'Burger King',
      items: ['Whopper', 'Batata Frita', 'Coca-Cola'],
      total: 35.9,
      status: 'delivered',
      deliveryTime: '35 min',
      address: 'Rua das Flores, 123'
    },
    {
      id: '002',
      date: '2024-09-24',
      restaurant: 'Pizza Hut',
      items: ['Pizza Margherita G', 'Refrigerante 2L'],
      total: 52.9,
      status: 'delivered',
      deliveryTime: '45 min',
      address: 'Rua das Flores, 123'
    },
    {
      id: '003',
      date: '2024-09-23',
      restaurant: 'Subway',
      items: ['Sanduíche Italian BMT', 'Cookies', 'Suco'],
      total: 28.9,
      status: 'delivered',
      deliveryTime: '25 min',
      address: 'Rua das Flores, 123'
    },
    {
      id: '004',
      date: '2024-09-22',
      restaurant: "McDonald's",
      items: ['Big Mac', 'McFritas', 'Milk Shake'],
      total: 32.9,
      status: 'cancelled',
      deliveryTime: '-',
      address: 'Rua das Flores, 123'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'Entregue';
      case 'pending':
        return 'Pendente';
      case 'cancelled':
        return 'Cancelado';
      default:
        return status;
    }
  };

  const totalSpent = orders
    .filter((order) => order.status === 'delivered')
    .reduce((sum, order) => sum + order.total, 0);

  const totalOrders = orders.length;
  const deliveredOrders = orders.filter((order) => order.status === 'delivered').length;

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-[600px] sm:w-[900px] p-0 overflow-hidden rounded-l-2xl shadow-2xl">
        {/* Header fixo com gradiente */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-5 border-b">
          <SheetHeader>
            <SheetTitle className="text-2xl font-semibold">📦 Relatório de Pedidos</SheetTitle>
            <SheetDescription className="text-orange-100 text-sm">
              Veja seu histórico completo e estatísticas de entrega.
            </SheetDescription>
          </SheetHeader>
        </div>

        {/* Conteúdo principal com scroll interno */}
        <ScrollArea className="h-[calc(100vh-90px)] p-6 space-y-8 bg-gray-50">
          {/* Lista de pedidos */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <Clock className="w-5 h-5 text-orange-500" />
                Histórico de Pedidos
              </h3>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2 border-orange-300 text-orange-600 hover:bg-orange-100 hover:text-orange-700 transition-all"
              >
                <Download className="w-4 h-4 animate-bounce-slow" />
                Exportar
              </Button>
            </div>

            <div className="space-y-4">
              {orders.map((order) => (
                <Card
                  key={order.id}
                  className="border border-gray-200 hover:shadow-md hover:border-orange-300 transition-all duration-200"
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base font-semibold text-gray-800">
                        {order.restaurant}
                      </CardTitle>
                      <Badge className={`${getStatusColor(order.status)} px-2 py-1 rounded-md`}>
                        {getStatusText(order.status)}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                      <span className="flex items-center gap-1">
                        <CalendarDays className="w-4 h-4" />
                        {new Date(order.date).toLocaleDateString('pt-BR')}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {order.deliveryTime}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-2 space-y-3">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Itens:</p>
                      <p className="text-sm text-gray-500">{order.items.join(', ')}</p>
                    </div>

                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <MapPin className="w-4 h-4 text-orange-500" />
                      {order.address}
                    </div>

                    <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                      <span className="text-sm text-gray-500">Total</span>
                      <span className="font-semibold text-lg text-orange-600">
                        R$ {order.total.toFixed(2)}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
