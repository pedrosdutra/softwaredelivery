import { useState } from "react";
import { SidebarProvider, SidebarInset } from "./components/ui/sidebar";
import { RestaurantSidebar } from "./components/RestaurantSidebar";
import { DashboardStats } from "./components/DashboardStats";
import { OrderList } from "./components/OrderList";
import { MenuManagement, type MenuItem } from "./components/MenuManagement";
import { type Order } from "./components/OrderCard";
import { Separator } from "./components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";

// Mock data
const mockOrders: Order[] = [
  {
    id: "001",
    customerName: "João Silva",
    customerPhone: "(11) 99999-1234",
    customerAddress: "Rua das Flores, 123 - Vila Madalena",
    items: [
      { name: "Prime Classic", quantity: 1, price: 32.90 },
      { name: "Batata Premium", quantity: 1, price: 18.90 },
      { name: "Refrigerante 2L", quantity: 1, price: 12.90, notes: "Coca-Cola" }
    ],
    total: 64.70,
    status: "pending",
    orderTime: "19:30",
    estimatedTime: "20:15",
    paymentMethod: "Cartão de Crédito"
  },
  {
    id: "002",
    customerName: "Maria Oliveira",
    customerPhone: "(11) 88888-5678",
    customerAddress: "Av. Paulista, 1000 - Bela Vista",
    items: [
      { name: "Prime Bacon", quantity: 2, price: 38.90 },
      { name: "Batata Premium", quantity: 2, price: 18.90 }
    ],
    total: 115.60,
    status: "preparing",
    orderTime: "19:15",
    estimatedTime: "20:00",
    paymentMethod: "PIX"
  },
  {
    id: "003",
    customerName: "Carlos Santos",
    customerPhone: "(11) 77777-9012",
    customerAddress: "Rua Augusta, 500 - Consolação",
    items: [
      { name: "Prime Classic", quantity: 1, price: 32.90 },
      { name: "Prime Bacon", quantity: 1, price: 38.90 },
      { name: "Batata Premium", quantity: 2, price: 18.90 }
    ],
    total: 109.60,
    status: "ready",
    orderTime: "19:00",
    estimatedTime: "19:45",
    paymentMethod: "Dinheiro"
  },
  {
    id: "004",
    customerName: "Ana Costa",
    customerPhone: "(11) 66666-3456",
    customerAddress: "Rua Oscar Freire, 200 - Jardins",
    items: [
      { name: "Prime Classic", quantity: 1, price: 32.90 },
      { name: "Batata Premium", quantity: 1, price: 18.90 }
    ],
    total: 51.80,
    status: "delivered",
    orderTime: "18:30",
    paymentMethod: "Cartão de Débito"
  },
  {
    id: "005",
    customerName: "Pedro Lima",
    customerPhone: "(11) 55555-7890",
    customerAddress: "Rua da Consolação, 800 - Centro",
    items: [
      { name: "Prime Bacon", quantity: 1, price: 38.90, notes: "Sem cebola" },
      { name: "Batata Premium", quantity: 1, price: 18.90 }
    ],
    total: 57.80,
    status: "pending",
    orderTime: "19:45",
    estimatedTime: "20:30",
    paymentMethod: "PIX"
  }
];

const mockStats = {
  todayOrders: 24,
  todayRevenue: 1650.50,
  averageTime: 32,
  pendingOrders: 2
};

// Mock menu items
const mockMenuItems: MenuItem[] = [
  {
    id: "1",
    name: "Prime Classic",
    description: "Hambúrguer artesanal com carne 180g, queijo cheddar, alface, tomate e molho especial",
    price: 32.90,
    category: "Hambúrgueres",
    available: true
  },
  {
    id: "2",
    name: "Prime Bacon",
    description: "Hambúrguer artesanal com carne 180g, bacon crocante, queijo cheddar e molho barbecue",
    price: 38.90,
    category: "Hambúrgueres",
    available: true
  },
  {
    id: "3",
    name: "Batata Premium",
    description: "Batatas rústicas com temperos especiais e molho aioli",
    price: 18.90,
    category: "Acompanhamentos",
    available: true
  },
  {
    id: "4",
    name: "Refrigerante 2L",
    description: "Refrigerante gelado - Coca-Cola, Guaraná ou Fanta",
    price: 12.90,
    category: "Bebidas",
    available: true
  }
];

export default function App() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(mockMenuItems);
  const [isOnline, setIsOnline] = useState(true);
  const [activeTab, setActiveTab] = useState("orders");

  const handleStatusChange = (orderId: string, newStatus: Order["status"]) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const handleAddMenuItem = (item: Omit<MenuItem, 'id'>) => {
    const newItem: MenuItem = {
      ...item,
      id: Date.now().toString()
    };
    setMenuItems(prev => [...prev, newItem]);
  };

  const handleUpdateMenuItem = (id: string, updates: Partial<MenuItem>) => {
    setMenuItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, ...updates } : item
      )
    );
  };

  const handleDeleteMenuItem = (id: string) => {
    setMenuItems(prev => prev.filter(item => item.id !== id));
  };

  const pendingOrdersCount = orders.filter(order => order.status === "pending").length;

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <RestaurantSidebar
          restaurantName="Burguer Prime"
          isOnline={isOnline}
          onToggleOnline={setIsOnline}
          pendingOrders={pendingOrdersCount}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        
        <SidebarInset className="flex-1">
          <div className="flex h-full flex-col">
            {/* Header */}
            <header className="flex h-16 shrink-0 items-center border-b px-6">
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-semibold">
                  {activeTab === "orders" ? "Painel do Restaurante" : "Gerenciar Cardápio"}
                </h1>
                <Separator orientation="vertical" className="h-6" />
                <span className="text-sm text-muted-foreground">
                  {new Date().toLocaleDateString('pt-BR', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
              {!isOnline && activeTab === "orders" && (
                <div className="flex items-center gap-2 px-3 py-2 bg-red-50 text-red-700 rounded-md text-sm ml-auto">
                  <div className="h-2 w-2 bg-red-500 rounded-full animate-pulse" />
                  Restaurante offline - Não está recebendo novos pedidos
                </div>
              )}
            </header>

            {/* Main Content */}
            <main className="flex-1 overflow-auto p-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsContent value="orders" className="space-y-6 mt-0">
                  {/* Stats */}
                  <DashboardStats stats={mockStats} />
                  
                  {/* Orders */}
                  <div className="space-y-4">
                    <h2 className="text-lg font-semibold">Pedidos</h2>
                    <OrderList orders={orders} onStatusChange={handleStatusChange} />
                  </div>
                </TabsContent>

                <TabsContent value="menu" className="mt-0">
                  <MenuManagement
                    menuItems={menuItems}
                    onAddItem={handleAddMenuItem}
                    onUpdateItem={handleUpdateMenuItem}
                    onDeleteItem={handleDeleteMenuItem}
                  />
                </TabsContent>
              </Tabs>
            </main>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}