import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { StatusBadge } from "./StatusBadge";
import { Separator } from "./ui/separator";
import { Clock, MapPin, Phone, User } from "lucide-react";

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    notes?: string;
  }>;
  total: number;
  status: "pending" | "preparing" | "ready" | "delivered" | "cancelled";
  orderTime: string;
  estimatedTime?: string;
  paymentMethod: string;
}

interface OrderCardProps {
  order: Order;
  onStatusChange: (orderId: string, newStatus: Order["status"]) => void;
}

export function OrderCard({ order, onStatusChange }: OrderCardProps) {
  const getStatusActions = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return [
          { label: "Aceitar", action: () => onStatusChange(order.id, "preparing"), variant: "default" as const },
          { label: "Rejeitar", action: () => onStatusChange(order.id, "cancelled"), variant: "destructive" as const }
        ];
      case "preparing":
        return [
          { label: "Pronto", action: () => onStatusChange(order.id, "ready"), variant: "default" as const }
        ];
      case "ready":
        return [
          { label: "Saiu para entrega", action: () => onStatusChange(order.id, "delivered"), variant: "default" as const }
        ];
      default:
        return [];
    }
  };

  const actions = getStatusActions(order.status);

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">Pedido #{order.id}</h3>
              <StatusBadge status={order.status} />
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {order.orderTime}
              </div>
              {order.estimatedTime && (
                <div className="flex items-center gap-1">
                  <span>Entrega prevista: {order.estimatedTime}</span>
                </div>
              )}
            </div>
          </div>
          <Badge variant="outline" className="ml-2">
            R$ {order.total.toFixed(2)}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Customer Info */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{order.customerName}</span>
            <a href={`tel:${order.customerPhone}`} className="ml-auto">
              <Button variant="ghost" size="sm" className="h-7 px-2">
                <Phone className="h-3 w-3" />
              </Button>
            </a>
          </div>
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
            <span className="text-sm text-muted-foreground">{order.customerAddress}</span>
          </div>
        </div>

        <Separator />

        {/* Items */}
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Itens do pedido:</h4>
          {order.items.map((item, index) => (
            <div key={index} className="flex justify-between items-start text-sm">
              <div className="flex-1">
                <span>{item.quantity}x {item.name}</span>
                {item.notes && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Obs: {item.notes}
                  </p>
                )}
              </div>
              <span className="font-medium">R$ {(item.quantity * item.price).toFixed(2)}</span>
            </div>
          ))}
        </div>

        <Separator />

        {/* Payment and Actions */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Pagamento: {order.paymentMethod}
          </div>
          {actions.length > 0 && (
            <div className="flex gap-2">
              {actions.map((action, index) => (
                <Button
                  key={index}
                  variant={action.variant}
                  size="sm"
                  onClick={action.action}
                >
                  {action.label}
                </Button>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}