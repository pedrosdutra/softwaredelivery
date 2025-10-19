import { useState } from "react";
import { OrderCard, type Order } from "./OrderCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search, Filter, RefreshCw } from "lucide-react";
import { Badge } from "./ui/badge";

interface OrderListProps {
  orders: Order[];
  onStatusChange: (orderId: string, newStatus: Order["status"]) => void;
}

export function OrderList({ orders, onStatusChange }: OrderListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTab = activeTab === "all" || order.status === activeTab;
    
    return matchesSearch && matchesTab;
  });

  const getOrderCountByStatus = (status: string) => {
    if (status === "all") return orders.length;
    return orders.filter(order => order.status === status).length;
  };

  return (
    <div className="space-y-4">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por cliente ou pedido..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Atualizar
          </Button>
        </div>
      </div>

      {/* Status Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all" className="flex items-center gap-2">
            Todos
            <Badge variant="secondary" className="h-5 px-2 text-xs">
              {getOrderCountByStatus("all")}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="pending" className="flex items-center gap-2">
            Pendentes
            <Badge variant="destructive" className="h-5 px-2 text-xs">
              {getOrderCountByStatus("pending")}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="preparing" className="flex items-center gap-2">
            Preparando
            <Badge variant="secondary" className="h-5 px-2 text-xs">
              {getOrderCountByStatus("preparing")}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="ready" className="flex items-center gap-2">
            Prontos
            <Badge variant="default" className="h-5 px-2 text-xs">
              {getOrderCountByStatus("ready")}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="delivered" className="flex items-center gap-2">
            Entregues
            <Badge variant="outline" className="h-5 px-2 text-xs">
              {getOrderCountByStatus("delivered")}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-4">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>Nenhum pedido encontrado.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredOrders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  onStatusChange={onStatusChange}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}