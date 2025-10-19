import { motion } from 'motion/react';
import { Heart, Star, MapPin, Clock } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';

interface Restaurant {
  id: string;
  name: string;
  image: string;
  rating: number;
  deliveryTime: string;
  distance: string;
  cuisine: string;
}

interface MatchResultProps {
  matchedFood: {
    name: string;
    image: string;
    category: string;
  };
  restaurants: Restaurant[];
  onPlayAgain: () => void;
}

export function MatchResult({ matchedFood, restaurants, onPlayAgain }: MatchResultProps) {
  return (
    <motion.div
      className="w-full max-w-4xl mx-auto p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Match Celebration */}
      <motion.div
        className="text-center mb-8"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", damping: 10 }}
      >
        <div className="flex items-center justify-center mb-4">
          <Heart className="w-16 h-16 text-red-500 fill-current" />
        </div>
        <h1 className="text-3xl mb-2 text-green-600">É um Match!</h1>
        <p className="text-muted-foreground mb-4">
          Vocês dois curtiram <span className="font-semibold">{matchedFood.name}</span>
        </p>
        <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-green-500">
          <ImageWithFallback
            src={matchedFood.image}
            alt={matchedFood.name}
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>

      {/* Restaurants Section */}
      <div className="mb-8">
        <h2 className="text-center mb-6">Restaurantes de {matchedFood.category} próximos</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map((restaurant, index) => (
            <motion.div
              key={restaurant.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <div className="aspect-video">
                <ImageWithFallback
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-4">
                <h3 className="mb-2">{restaurant.name}</h3>
                <p className="text-muted-foreground mb-3">{restaurant.cuisine}</p>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span>{restaurant.rating}</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <span>{restaurant.deliveryTime}</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-green-500" />
                    <span>{restaurant.distance}</span>
                  </div>
                </div>
                
                <Button className="w-full mt-4 bg-orange-500 hover:bg-orange-600">
                  Pedir Agora
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Play Again Button */}
      <div className="text-center">
        <Button 
          onClick={onPlayAgain}
          variant="outline"
          className="border-orange-500 text-orange-500 hover:bg-orange-50"
        >
          Jogar Novamente
        </Button>
      </div>
    </motion.div>
  );
}