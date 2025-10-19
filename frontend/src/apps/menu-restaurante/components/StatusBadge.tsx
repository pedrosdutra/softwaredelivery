import { Badge } from "./ui/badge";
import { Clock, CheckCircle, Truck, AlertCircle } from "lucide-react";

type OrderStatus = "pending" | "preparing" | "ready" | "delivered" | "cancelled";

interface StatusBadgeProps {
  status: OrderStatus;
  showIcon?: boolean;
}

export function StatusBadge({ status, showIcon = true }: StatusBadgeProps) {
  const statusConfig = {
    pending: {
      label: "Pendente",
      variant: "destructive" as const,
      icon: AlertCircle,
      className: "bg-orange-100 text-orange-800 hover:bg-orange-100 border-orange-200"
    },
    preparing: {
      label: "Preparando",
      variant: "secondary" as const,
      icon: Clock,
      className: "bg-orange-50 text-orange-700 hover:bg-orange-50 border-orange-200"
    },
    ready: {
      label: "Pronto",
      variant: "default" as const,
      icon: CheckCircle,
      className: "bg-green-100 text-green-800 hover:bg-green-100 border-green-200"
    },
    delivered: {
      label: "Entregue",
      variant: "outline" as const,
      icon: Truck,
      className: "bg-gray-100 text-gray-800 hover:bg-gray-100 border-gray-200"
    },
    cancelled: {
      label: "Cancelado",
      variant: "destructive" as const,
      icon: AlertCircle,
      className: "bg-red-100 text-red-800 hover:bg-red-100 border-red-200"
    }
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Badge variant={config.variant} className={`${config.className} flex items-center gap-1`}>
      {showIcon && <Icon className="h-3 w-3" />}
      {config.label}
    </Badge>
  );
}