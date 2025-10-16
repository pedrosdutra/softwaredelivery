import { ArrowLeft, Star, Clock, MapPin, Plus, ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useCart } from '../contexts/CartContext';
import { Restaurant, MenuItem } from '../data/restaurants';
import { toast } from 'sonner';

interface RestaurantDetailsProps {
  restaurant: Restaurant;
  onBack: () => void;
}

export function RestaurantDetails({ restaurant, onBack }: RestaurantDetailsProps) {
  const { addItem } = useCart();

  const renderPriceRange = (priceRange: number) => {
    const dollarSigns = '$'.repeat(priceRange);
    const grayDollars = '$'.repeat(4 - priceRange);
    return (
      <span className="flex items-center">
        <span className="text-primary">{dollarSigns}</span>
        <span className="text-muted-foreground">{grayDollars}</span>
      </span>
    );
  };

  const handleAddToCart = (menuItem: MenuItem) => {
    addItem({
      id: menuItem.id,
      name: menuItem.name,
      description: menuItem.description,
      price: menuItem.price,
      restaurantId: restaurant.id,
      restaurantName: restaurant.name,
      imageUrl: menuItem.imageUrl
    });
    
    toast.success(`${menuItem.name} adicionado ao carrinho!`, {
      description: `R$ ${menuItem.price.toFixed(2)} - ${restaurant.name}`
    });
  };

  const groupedMenuItems = restaurant.menuItems?.reduce((groups, item) => {
    const category = item.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(item);
    return groups;
  }, {} as Record<string, MenuItem[]>) || {};

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b">
        <div className="container max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={onBack}
              className="rounded-full"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold">{restaurant.name}</h1>
              <p className="text-muted-foreground">{restaurant.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container max-w-7xl mx-auto px-6 py-6">
        {/* Restaurant Info */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="lg:w-1/3">
                <div className="aspect-[4/3] relative overflow-hidden rounded-lg">
                  <ImageWithFallback
                    src={restaurant.imageUrl}
                    alt={restaurant.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant={restaurant.isOpen ? 'default' : 'destructive'}>
                      {restaurant.isOpen ? 'Aberto' : 'Fechado'}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="lg:w-2/3 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium text-lg">{restaurant.rating}</span>
                    <span className="text-muted-foreground">
                      ({restaurant.reviewCount} avaliações)
                    </span>
                  </div>
                  {renderPriceRange(restaurant.priceRange)}
                </div>

                <div className="flex items-center gap-6 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{restaurant.deliveryTime} min</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{restaurant.address}</span>
                  </div>
                </div>

                <div>
                  <Badge variant="outline">{restaurant.cuisine}</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Menu */}
        {restaurant.menuItems && restaurant.menuItems.length > 0 ? (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold">Cardápio</h2>
            
            {Object.entries(groupedMenuItems).map(([category, items]) => (
              <div key={category}>
                <h3 className="text-xl font-semibold mb-4">{category}</h3>
                <div className="grid gap-4">
                  {items.map((item) => (
                    <Card key={item.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex gap-4">
                          <div className="h-20 w-20 rounded-lg overflow-hidden flex-shrink-0">
                            <ImageWithFallback
                              src={item.imageUrl}
                              alt={item.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold mb-1">{item.name}</h4>
                            <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                              {item.description}
                            </p>
                            <p className="text-lg font-bold text-primary">
                              R$ {item.price.toFixed(2)}
                            </p>
                          </div>

                          <div className="flex items-center">
                            <Button
                              onClick={() => handleAddToCart(item)}
                              disabled={!restaurant.isOpen}
                              className="gap-2"
                            >
                              <Plus className="h-4 w-4" />
                              Adicionar
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                {Object.keys(groupedMenuItems).indexOf(category) < Object.keys(groupedMenuItems).length - 1 && (
                  <Separator className="mt-8" />
                )}
              </div>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <ShoppingCart className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="font-semibold mb-2">Cardápio não disponível</h3>
              <p className="text-muted-foreground">
                Este restaurante ainda não possui cardápio digital disponível.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}