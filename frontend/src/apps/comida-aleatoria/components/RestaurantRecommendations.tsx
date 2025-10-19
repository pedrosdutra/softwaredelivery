import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Star, Clock, MapPin, ShoppingCart } from 'lucide-react';
import { FoodItem } from './FoodRandomizer';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Restaurant {
  id: string;
  name: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  cuisine: string;
  image: string;
  distance: string;
  specialties: string[];
}

const restaurantsByCategory: Record<string, Restaurant[]> = {
  'Italiana': [
    {
      id: '1',
      name: 'Nonna\'s Kitchen',
      rating: 4.8,
      deliveryTime: '25-35 min',
      deliveryFee: 4.99,
      cuisine: 'Italiana',
      image: 'https://images.unsplash.com/photo-1629407119384-d42320c3e576?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHJlc3RhdXJhbnQlMjBraXRjaGVuJTIwY2hlZnxlbnwxfHx8fDE3NTg3MTczOTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      distance: '1.2 km',
      specialties: ['Pizza Margherita', 'Lasanha', 'Risotto']
    },
    {
      id: '2',
      name: 'Bella Vista',
      rating: 4.6,
      deliveryTime: '30-40 min',
      deliveryFee: 5.99,
      cuisine: 'Italiana',
      image: 'https://images.unsplash.com/photo-1629407119384-d42320c3e576?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHJlc3RhdXJhbnQlMjBraXRjaGVuJTIwY2hlZnxlbnwxfHx8fDE3NTg3MTczOTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      distance: '2.1 km',
      specialties: ['Carbonara', 'Pizza Quattro Stagioni', 'Tiramisu']
    }
  ],
  'Fast Food': [
    {
      id: '3',
      name: 'Burger House',
      rating: 4.4,
      deliveryTime: '15-25 min',
      deliveryFee: 3.99,
      cuisine: 'Fast Food',
      image: 'https://images.unsplash.com/photo-1629407119384-d42320c3e576?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHJlc3RhdXJhbnQlMjBraXRjaGVuJTIwY2hlZnxlbnwxfHx8fDE3NTg3MTczOTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      distance: '0.8 km',
      specialties: ['Hambúrguer Artesanal', 'Batata Frita', 'Milkshake']
    },
    {
      id: '4',
      name: 'Smash Brothers',
      rating: 4.7,
      deliveryTime: '20-30 min',
      deliveryFee: 4.50,
      cuisine: 'Fast Food',
      image: 'https://images.unsplash.com/photo-1629407119384-d42320c3e576?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHJlc3RhdXJhbnQlMjBraXRjaGVuJTIwY2hlZnxlbnwxfHx8fDE3NTg3MTczOTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      distance: '1.5 km',
      specialties: ['Smash Burger', 'Onion Rings', 'Cheesecake']
    }
  ],
  'Japonesa': [
    {
      id: '5',
      name: 'Tokyo Sushi',
      rating: 4.9,
      deliveryTime: '35-45 min',
      deliveryFee: 6.99,
      cuisine: 'Japonesa',
      image: 'https://images.unsplash.com/photo-1629407119384-d42320c3e576?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHJlc3RhdXJhbnQlMjBraXRjaGVuJTIwY2hlZnxlbnwxfHx8fDE3NTg3MTczOTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      distance: '2.3 km',
      specialties: ['Sushi Premium', 'Sashimi', 'Temaki']
    },
    {
      id: '6',
      name: 'Sakura House',
      rating: 4.5,
      deliveryTime: '30-40 min',
      deliveryFee: 5.50,
      cuisine: 'Japonesa',
      image: 'https://images.unsplash.com/photo-1629407119384-d42320c3e576?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHJlc3RhdXJhbnQlMjBraXRjaGVuJTIwY2hlZnxlbnwxfHx8fDE3NTg3MTczOTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      distance: '1.8 km',
      specialties: ['Hot Roll', 'Yakissoba', 'Mochi']
    }
  ],
  'Mexicana': [
    {
      id: '7',
      name: 'El Mariachi',
      rating: 4.3,
      deliveryTime: '25-35 min',
      deliveryFee: 4.99,
      cuisine: 'Mexicana',
      image: 'https://images.unsplash.com/photo-1629407119384-d42320c3e576?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHJlc3RhdXJhbnQlMjBraXRjaGVuJTIwY2hlZnxlbnwxfHx8fDE3NTg3MTczOTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      distance: '1.7 km',
      specialties: ['Tacos Mexicanos', 'Burritos', 'Guacamole']
    }
  ],
  'Tailandesa': [
    {
      id: '8',
      name: 'Bangkok Street',
      rating: 4.6,
      deliveryTime: '30-40 min',
      deliveryFee: 5.99,
      cuisine: 'Tailandesa',
      image: 'https://images.unsplash.com/photo-1629407119384-d42320c3e576?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHJlc3RhdXJhbnQlMjBraXRjaGVuJTIwY2hlZnxlbnwxfHx8fDE3NTg3MTczOTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      distance: '2.5 km',
      specialties: ['Pad Thai', 'Green Curry', 'Mango Sticky Rice']
    }
  ]
};

interface RestaurantRecommendationsProps {
  selectedFood: FoodItem | null;
}

export function RestaurantRecommendations({ selectedFood }: RestaurantRecommendationsProps) {
  if (!selectedFood) return null;

  const restaurants = restaurantsByCategory[selectedFood.category] || [];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Restaurantes Recomendados</h2>
        <p className="text-muted-foreground">
          Encontramos {restaurants.length} restaurantes que servem <span className="font-semibold text-orange-600">{selectedFood.name}</span>
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {restaurants.map((restaurant) => (
          <Card key={restaurant.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="aspect-video w-full overflow-hidden rounded-lg mb-4">
                <ImageWithFallback
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl">{restaurant.name}</CardTitle>
                  <Badge variant="outline" className="mt-1">{restaurant.cuisine}</Badge>
                </div>
                <div className="flex items-center space-x-1 text-sm">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{restaurant.rating}</span>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{restaurant.deliveryTime}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{restaurant.distance}</span>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-2">Especialidades:</p>
                <div className="flex flex-wrap gap-1">
                  {restaurant.specialties.map((specialty) => (
                    <Badge key={specialty} variant="secondary" className="text-xs">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-2">
                <div className="text-sm">
                  <span className="text-muted-foreground">Taxa de entrega: </span>
                  <span className="font-semibold">R$ {restaurant.deliveryFee.toFixed(2)}</span>
                </div>
                <Button className="bg-orange-600 hover:bg-orange-700">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Pedir Agora
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}