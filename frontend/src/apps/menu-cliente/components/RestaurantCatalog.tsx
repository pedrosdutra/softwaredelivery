import { useState } from 'react';
import { ArrowLeft, Star, MapPin, Clock, DollarSign } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { RestaurantDetails } from './RestaurantDetails';

interface Restaurant {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  priceRange: 1 | 2 | 3 | 4; // 1 = $, 2 = $$, 3 = $$$, 4 = $$$$
  deliveryTime: string;
  address: string;
  cuisine: string;
  isOpen: boolean;
}

interface RestaurantCatalogProps {
  category: string;
  restaurants: Restaurant[];
  onBack: () => void;
}

export function RestaurantCatalog({ category, restaurants, onBack }: RestaurantCatalogProps) {
  const [sortBy, setSortBy] = useState<'rating' | 'price' | 'time'>('rating');
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);

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

  const sortedRestaurants = [...restaurants].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'price':
        return a.priceRange - b.priceRange;
      case 'time':
        return parseInt(a.deliveryTime) - parseInt(b.deliveryTime);
      default:
        return 0;
    }
  });

  // Se um restaurante está selecionado, mostra os detalhes
  if (selectedRestaurant) {
    return (
      <RestaurantDetails
        restaurant={selectedRestaurant}
        onBack={() => setSelectedRestaurant(null)}
      />
    );
  }

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
            <div>
              <h1 className="text-2xl font-bold">{category}</h1>
              <p className="text-muted-foreground">{restaurants.length} restaurantes encontrados</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="container max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center gap-4 mb-8">
          <span className="font-medium">Ordenar por:</span>
          <div className="flex gap-2">
            <Button 
              variant={sortBy === 'rating' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSortBy('rating')}
            >
              <Star className="h-4 w-4 mr-2" />
              Avaliação
            </Button>
            <Button 
              variant={sortBy === 'price' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSortBy('price')}
            >
              <DollarSign className="h-4 w-4 mr-2" />
              Preço
            </Button>
            <Button 
              variant={sortBy === 'time' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSortBy('time')}
            >
              <Clock className="h-4 w-4 mr-2" />
              Tempo
            </Button>
          </div>
        </div>

        {/* Restaurant Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedRestaurants.map((restaurant) => (
            <Card 
              key={restaurant.id} 
              className="group cursor-pointer hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1"
              onClick={() => setSelectedRestaurant(restaurant)}
            >
              <CardHeader className="p-0">
                <div className="aspect-[4/3] relative overflow-hidden rounded-t-lg">
                  <ImageWithFallback
                    src={restaurant.imageUrl}
                    alt={restaurant.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge 
                      variant={restaurant.isOpen ? 'default' : 'destructive'}
                      className={restaurant.isOpen ? 'bg-green-500 hover:bg-green-600' : ''}
                    >
                      {restaurant.isOpen ? 'Aberto' : 'Fechado'}
                    </Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                    <Badge variant="outline" className="bg-background/90">
                      {restaurant.cuisine}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2">{restaurant.name}</h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {restaurant.description}
                </p>
                
                {/* Rating and Price */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{restaurant.rating}</span>
                    <span className="text-muted-foreground text-sm">
                      ({restaurant.reviewCount})
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {renderPriceRange(restaurant.priceRange)}
                  </div>
                </div>

                {/* Delivery Info */}
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{restaurant.deliveryTime} min</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span className="truncate max-w-[120px]">{restaurant.address}</span>
                  </div>
                </div>

                {/* Action Button */}
                <div className="mt-4 pt-4 border-t">
                  <Button 
                    size="sm" 
                    className="w-full"
                    disabled={!restaurant.isOpen}
                  >
                    {restaurant.menuItems && restaurant.menuItems.length > 0 
                      ? 'Ver Cardápio' 
                      : 'Visitar Restaurante'
                    }
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}