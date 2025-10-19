import { motion } from 'motion/react';
import { Heart, X } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface FoodCardProps {
  food: {
    id: string;
    name: string;
    image: string;
    description: string;
    category: string;
  };
  onLike: () => void;
  onDislike: () => void;
  playerSide: 'left' | 'right';
  isAnimating: boolean;
  isCurrentPlayer: boolean;
  hasChosen: boolean;
  choice?: boolean | null;
}

export function FoodCard({ food, onLike, onDislike, playerSide, isAnimating, isCurrentPlayer, hasChosen, choice }: FoodCardProps) {
  const isDisabled = !isCurrentPlayer || hasChosen || isAnimating;

  return (
    <motion.div
      className={`relative bg-white rounded-2xl shadow-lg overflow-hidden w-full max-w-sm mx-4 transition-all ${
        isCurrentPlayer && !hasChosen ? 'ring-4 ring-orange-500 ring-opacity-50' : ''
      } ${isDisabled ? 'opacity-60' : ''}`}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="aspect-square">
        <ImageWithFallback
          src={food.image}
          alt={food.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-4">
        <h3 className="mb-2 text-center">{food.name}</h3>
        <p className="text-muted-foreground text-center mb-4">{food.description}</p>
        
        {hasChosen ? (
          <div className="flex justify-center">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${
              choice ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
            }`}>
              {choice ? <Heart className="w-5 h-5" /> : <X className="w-5 h-5" />}
              <span>{choice ? 'Curtiu' : 'Não curtiu'}</span>
            </div>
          </div>
        ) : (
          <div className="flex justify-center gap-4">
            <motion.button
              onClick={onDislike}
              disabled={isDisabled}
              className={`flex items-center justify-center w-12 h-12 rounded-full transition-colors ${
                isDisabled 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-red-100 hover:bg-red-200 text-red-600'
              }`}
              whileHover={!isDisabled ? { scale: 1.1 } : {}}
              whileTap={!isDisabled ? { scale: 0.9 } : {}}
            >
              <X className="w-6 h-6" />
            </motion.button>
            
            <motion.button
              onClick={onLike}
              disabled={isDisabled}
              className={`flex items-center justify-center w-12 h-12 rounded-full transition-colors ${
                isDisabled 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-green-100 hover:bg-green-200 text-green-600'
              }`}
              whileHover={!isDisabled ? { scale: 1.1 } : {}}
              whileTap={!isDisabled ? { scale: 0.9 } : {}}
            >
              <Heart className="w-6 h-6" />
            </motion.button>
          </div>
        )}
      </div>
      
      <div className={`absolute top-4 ${playerSide === 'left' ? 'left-4' : 'right-4'}`}>
        <div className={`px-3 py-1 rounded-full transition-all ${
          isCurrentPlayer && !hasChosen 
            ? 'bg-orange-500 text-white shadow-lg animate-pulse' 
            : hasChosen 
            ? 'bg-green-500 text-white' 
            : 'bg-black/70 text-white'
        }`}>
          Jogador {playerSide === 'left' ? '1' : '2'}
          {isCurrentPlayer && !hasChosen && ' (Sua vez)'}
          {hasChosen && ' ✓'}
        </div>
      </div>
    </motion.div>
  );
}