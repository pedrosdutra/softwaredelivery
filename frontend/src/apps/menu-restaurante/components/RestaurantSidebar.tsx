import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Switch } from "./ui/switch";
import { 
  ShoppingBag, 
  LogOut,
  Store,
  Power,
  ChefHat
} from "lucide-react";
import logoImage from '../../assets/SegundaLogodoProjeto.png';

interface RestaurantSidebarProps {
  restaurantName: string;
  isOnline: boolean;
  onToggleOnline: (online: boolean) => void;
  pendingOrders: number;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function RestaurantSidebar({ 
  restaurantName, 
  isOnline, 
  onToggleOnline, 
  pendingOrders,
  activeTab,
  onTabChange
}: RestaurantSidebarProps) {
  const menuItems = [
    {
      title: "Pedidos",
      icon: ShoppingBag,
      key: "orders",
      badge: pendingOrders > 0 ? pendingOrders : undefined
    },
    {
      title: "Cardápio",
      icon: ChefHat,
      key: "menu"
    }
  ];

  return (
    <Sidebar>
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={logoImage} alt="Foodly Logo" />
            <AvatarFallback className="bg-primary text-primary-foreground">
              <Store className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h2 className="font-semibold truncate">{restaurantName}</h2>
            <div className="flex items-center gap-2 mt-1">
              <div className={`h-2 w-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className="text-xs text-muted-foreground">
                {isOnline ? 'Online' : 'Offline'}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-4 p-3 bg-muted rounded-lg">
          <div className="flex items-center gap-2">
            <Power className="h-4 w-4" />
            <span className="text-sm font-medium">Status do restaurante</span>
          </div>
          <Switch 
            checked={isOnline} 
            onCheckedChange={onToggleOnline}
          />
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton 
                isActive={activeTab === item.key}
                className="w-full justify-start"
                onClick={() => onTabChange(item.key)}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.title}</span>
                {item.badge && (
                  <Badge variant="destructive" className="ml-auto h-5 px-2 text-xs">
                    {item.badge}
                  </Badge>
                )}
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10">
          <LogOut className="h-4 w-4 mr-2" />
          Sair
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}