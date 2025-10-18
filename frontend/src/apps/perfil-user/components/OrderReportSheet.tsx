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
      total: 35.90,
      status: 'delivered',
      deliveryTime: '35 min',
      address: 'Rua das Flores, 123'
    },
    {
      id: '002',
      date: '2024-09-24',
      restaurant: 'Pizza Hut',
      items: ['Pizza Margherita G', 'Refrigerante 2L'],
      total: 52.90,
      status: 'delivered',
      deliveryTime: '45 min',
      address: 'Rua das Flores, 123'
    },
    {
      id: '003',
      date: '2024-09-23',
      restaurant: 'Subway',
      items: ['Sanduíche Italian BMT', 'Cookies', 'Suco'],
      total: 28.90,
      status: 'delivered',
      deliveryTime: '25 min',
      address: 'Rua das Flores, 123'
    },
    {
      id: '004',
      date: '2024-09-22',
      restaurant: 'McDonald\'s',
      items: ['Big Mac', 'McFritas', 'Milk Shake'],
      total: 32.90,
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
    .filter(order => order.status === 'delivered')
    .reduce((sum, order) => sum + order.total, 0);

  const totalOrders = orders.length;
  const deliveredOrders = orders.filter(order => order.status === 'delivered').length;

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-[600px] sm:w-[900px]">
        <SheetHeader>
          <SheetTitle>Relatório de Pedidos</SheetTitle>
          <SheetDescription>
            Visualize seu histórico completo de pedidos e estatísticas.
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 mt-6">
          {/* Estatísticas */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="border-orange-200">
              <CardContent className="p-4 text-center">
                <Package className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                <p className="text-2xl font-bold">{totalOrders}</p>
                <p className="text-sm text-muted-foreground">Total de Pedidos</p>
              </CardContent>
            </Card>

            <Card className="border-orange-200">
              <CardContent className="p-4 text-center">
                <CalendarDays className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold">{deliveredOrders}</p>
                <p className="text-sm text-muted-foreground">Entregues</p>
              </CardContent>
            </Card>

            <Card className="border-orange-200">
              <CardContent className="p-4 text-center">
                <DollarSign className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold">R$ {totalSpent.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">Total Gasto</p>
              </CardContent>
            </Card>
          </div>

          {/* Lista de Pedidos */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Histórico de Pedidos</h3>
              <Button 
                variant="outline" 
                size="sm"
                className="flex items-center gap-2 border-orange-300 text-orange-600 hover:bg-orange-50"
              >
                <Download className="w-4 h-4" />
                Exportar
              </Button>
            </div>

            <ScrollArea className="h-[400px]">
              <div className="space-y-4">
                {orders.map((order) => (
                  <Card key={order.id} className="border-orange-200">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">{order.restaurant}</CardTitle>
                        <Badge className={getStatusColor(order.status)}>
                          {getStatusText(order.status)}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
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
                    <CardContent className="pt-0">
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-medium mb-1">Itens:</p>
                          <p className="text-sm text-muted-foreground">
                            {order.items.join(', ')}
                          </p>
                        </div>
                        
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          {order.address}
                        </div>
                        
                        <div className="flex justify-between items-center pt-2 border-t">
                          <span className="text-sm text-muted-foreground">Total:</span>
                          <span className="font-bold text-lg">R$ {order.total.toFixed(2)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}