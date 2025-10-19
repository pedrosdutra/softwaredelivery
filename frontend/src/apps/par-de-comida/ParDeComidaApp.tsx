import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Users, Play } from 'lucide-react';
import { FoodCard } from './components/FoodCard';
import { MatchResult } from './components/MatchResult';
import { Button } from './components/ui/button';
import exampleImage from '../assets/SegundaLogodoProjeto.png';

// Mock data
const foods = [
  {
    id: '1',
    name: 'Pizza',
    image: 'https://images.unsplash.com/photo-1703073186021-021fb5a0bde1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXp6YSUyMGZvb2R8ZW58MXx8fHwxNzU4ODA5MDQzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Pizza clássica italiana com mozzarella e manjericão',
    category: 'Pizza'
  },
  {
    id: '2',
    name: 'Sushi',
    image: 'https://images.unsplash.com/photo-1700324822763-956100f79b0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXNoaSUyMGphcGFuZXNlJTIwZm9vZHxlbnwxfHx8fDE3NTg3NzA5MzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Combinado de sushis frescos e sashimis',
    category: 'Japonesa'
  },
  {
    id: '3',
    name: 'Hambúrguer Artesanal',
    image: 'https://images.unsplash.com/photo-1656439659132-24c68e36b553?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXJnZXIlMjBmYXN0JTIwZm9vZHxlbnwxfHx8fDE3NTg3MTcxMTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Hambúrguer gourmet com carne angus e queijo cheddar',
    category: 'Hambúrguer'
  },
  {
    id: '4',
    name: 'Pasta Carbonara',
    image: 'https://images.unsplash.com/photo-1749169337822-d875fd6f4c9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0YSUyMGl0YWxpYW4lMjBmb29kfGVufDF8fHx8MTc1ODc5NjUyMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Massa italiana cremosa com bacon e parmesão',
    category: 'Italiana'
  },
  {
    id: '5',
    name: 'Tacos Mexicanos',
    image: 'https://images.unsplash.com/photo-1615818449536-f26c1e1fe0f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXhpY2FuJTIwdGFjb3MlMjBmb29kfGVufDF8fHx8MTc1ODgzMzIxNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Tacos autênticos com carne temperada e guacamole',
    category: 'Mexicana'
  },
  {
    id: '6',
    name: 'Pad Thai',
    image: 'https://images.unsplash.com/photo-1637806928975-166803236042?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aGFpJTIwYXNpYW4lMjBmb29kfGVufDF8fHx8MTc1ODgzMzUyNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Macarrão tailandês com camarão e amendoim',
    category: 'Tailandesa'
  }
];

const restaurantsByCategory = {
  'Pizza': [
    {
      id: 'p1',
      name: 'Pizzaria Bella Vista',
      image: 'https://images.unsplash.com/photo-1667388968964-4aa652df0a9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwaW50ZXJpb3IlMjBkaW5pbmd8ZW58MXx8fHwxNzU4ODAwNTAzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      rating: 4.8,
      deliveryTime: '25-35 min',
      distance: '1.2 km',
      cuisine: 'Italiana'
    },
    {
      id: 'p2',
      name: 'Pizza Express',
      image: 'https://images.unsplash.com/photo-1753918256348-b336dd9d500b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjByZXN0YXVyYW50JTIwa2l0Y2hlbnxlbnwxfHx8fDE3NTg3MzM3MTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      rating: 4.5,
      deliveryTime: '20-30 min',
      distance: '0.8 km',
      cuisine: 'Italiana'
    }
  ],
  'Japonesa': [
    {
      id: 'j1',
      name: 'Sushi House',
      image: 'https://images.unsplash.com/photo-1615391532954-6018911bdc95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwcmVzdGF1cmFudCUyMGF0bW9zcGhlcmV8ZW58MXx8fHwxNzU4ODMzNTM0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      rating: 4.9,
      deliveryTime: '30-40 min',
      distance: '1.5 km',
      cuisine: 'Japonesa'
    }
  ],
  'Hambúrguer': [
    {
      id: 'h1',
      name: 'Burger Station',
      image: 'https://images.unsplash.com/photo-1667388968964-4aa652df0a9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwaW50ZXJpb3IlMjBkaW5pbmd8ZW58MXx8fHwxNzU4ODAwNTAzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      rating: 4.6,
      deliveryTime: '15-25 min',
      distance: '0.9 km',
      cuisine: 'Americana'
    }
  ],
  'Italiana': [
    {
      id: 'i1',
      name: 'Nonna Pasta',
      image: 'https://images.unsplash.com/photo-1753918256348-b336dd9d500b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjByZXN0YXVyYW50JTIwa2l0Y2hlbnxlbnwxfHx8fDE3NTg3MzM3MTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      rating: 4.7,
      deliveryTime: '25-35 min',
      distance: '1.1 km',
      cuisine: 'Italiana'
    }
  ],
  'Mexicana': [
    {
      id: 'm1',
      name: 'El Mariachi',
      image: 'https://images.unsplash.com/photo-1615391532954-6018911bdc95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwcmVzdGF1cmFudCUyMGF0bW9zcGhlcmV8ZW58MXx8fHwxNzU4ODMzNTM0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      rating: 4.4,
      deliveryTime: '20-30 min',
      distance: '1.3 km',
      cuisine: 'Mexicana'
    }
  ],
  'Tailandesa': [
    {
      id: 't1',
      name: 'Thai Garden',
      image: 'https://images.unsplash.com/photo-1667388968964-4aa652df0a9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwaW50ZXJpb3IlMjBkaW5pbmd8ZW58MXx8fHwxNzU4ODAwNTAzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      rating: 4.5,
      deliveryTime: '30-40 min',
      distance: '1.8 km',
      cuisine: 'Tailandesa'
    }
  ]
};

type GameState = 'intro' | 'playing' | 'match';

export default function App() {
  const [gameState, setGameState] = useState<GameState>('intro');
  const [currentFoodIndex, setCurrentFoodIndex] = useState(0);
  const [player1Likes, setPlayer1Likes] = useState<string[]>([]);
  const [player2Likes, setPlayer2Likes] = useState<string[]>([]);
  const [matchedFood, setMatchedFood] = useState<any>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState<1 | 2>(1);
  const [player1Choice, setPlayer1Choice] = useState<boolean | null>(null);
  const [player2Choice, setPlayer2Choice] = useState<boolean | null>(null);

  const currentFood = foods[currentFoodIndex];

  const handleChoice = (playerId: 1 | 2, liked: boolean) => {
    if (isAnimating || currentPlayer !== playerId) return;

    setIsAnimating(true);

    // Store the choice for the current player
    if (playerId === 1) {
      setPlayer1Choice(liked);
      if (liked) {
        setPlayer1Likes(prev => [...prev, currentFood.id]);
      }
    } else {
      setPlayer2Choice(liked);
      if (liked) {
        setPlayer2Likes(prev => [...prev, currentFood.id]);
      }
    }

    setTimeout(() => {
      // Switch to the other player
      setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
      setIsAnimating(false);
    }, 800);
  };

  // Check for results when both players have made their choices
  useEffect(() => {
    if (player1Choice !== null && player2Choice !== null) {
      setIsAnimating(true);
      
      setTimeout(() => {
        // Check if both players liked the current food
        if (player1Choice && player2Choice) {
          setMatchedFood(currentFood);
          setGameState('match');
          setIsAnimating(false);
          return;
        }

        // Move to next food or restart if we've gone through all
        if (currentFoodIndex < foods.length - 1) {
          setCurrentFoodIndex(prev => prev + 1);
          setPlayer1Choice(null);
          setPlayer2Choice(null);
          setCurrentPlayer(1); // Reset to player 1
        } else {
          // Reset game if no matches found
          resetGame();
        }
        setIsAnimating(false);
      }, 1000);
    }
  }, [player1Choice, player2Choice, currentFoodIndex, currentFood]);

  const resetGame = () => {
    setGameState('intro');
    setCurrentFoodIndex(0);
    setPlayer1Likes([]);
    setPlayer2Likes([]);
    setMatchedFood(null);
    setIsAnimating(false);
    setCurrentPlayer(1);
    setPlayer1Choice(null);
    setPlayer2Choice(null);
  };

  const startGame = () => {
    setGameState('playing');
  };

  if (gameState === 'intro') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
        <motion.div
          className="text-center max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="w-24 h-24 mx-auto mb-6"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img 
              src={exampleImage} 
              alt="Foodly" 
              className="w-full h-full rounded-2xl shadow-lg"
            />
          </motion.div>
          
          <h1 className="text-3xl mb-4 text-orange-600">Par de Comida</h1>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Descubram juntos o que vocês querem comer! Ambos os jogadores devem curtir 
            a mesma comida para encontrar restaurantes perfeitos para vocês.
          </p>
          
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="w-4 h-4" />
              <span>2 Jogadores</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Heart className="w-4 h-4" />
              <span>Match Food</span>
            </div>
          </div>
          
          <Button
            onClick={startGame}
            size="lg"
            className="bg-orange-500 hover:bg-orange-600 text-white px-8"
          >
            <Play className="w-5 h-5 mr-2" />
            Começar Jogo
          </Button>
        </motion.div>
      </div>
    );
  }

  if (gameState === 'match' && matchedFood) {
    const restaurants = restaurantsByCategory[matchedFood.category as keyof typeof restaurantsByCategory] || [];
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4 flex items-center justify-center">
        <MatchResult
          matchedFood={matchedFood}
          restaurants={restaurants}
          onPlayAgain={resetGame}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <img 
              src={exampleImage} 
              alt="Foodly" 
              className="w-12 h-12 rounded-lg"
            />
            <h1 className="text-2xl text-orange-600">Par de Comida</h1>
          </div>
          <p className="text-muted-foreground mb-2">
            Comida {currentFoodIndex + 1} de {foods.length}
          </p>
          
          {/* Turn indicator */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className={`px-4 py-2 rounded-full transition-all ${
              currentPlayer === 1 && player1Choice === null 
                ? 'bg-orange-500 text-white shadow-lg' 
                : player1Choice !== null 
                ? 'bg-green-100 text-green-600' 
                : 'bg-gray-100 text-gray-500'
            }`}>
              Jogador 1 {player1Choice !== null && (player1Choice ? '❤️' : '❌')}
            </div>
            
            <div className={`px-4 py-2 rounded-full transition-all ${
              currentPlayer === 2 && player2Choice === null 
                ? 'bg-orange-500 text-white shadow-lg' 
                : player2Choice !== null 
                ? 'bg-green-100 text-green-600' 
                : 'bg-gray-100 text-gray-500'
            }`}>
              Jogador 2 {player2Choice !== null && (player2Choice ? '❤️' : '❌')}
            </div>
          </div>
          
          {player1Choice === null && player2Choice === null && (
            <p className="text-sm text-orange-600">
              É a vez do Jogador {currentPlayer}
            </p>
          )}
          
          {player1Choice !== null && player2Choice === null && (
            <p className="text-sm text-blue-600">
              Aguardando Jogador {currentPlayer}...
            </p>
          )}
          
          {player1Choice !== null && player2Choice !== null && (
            <p className="text-sm text-green-600">
              Verificando match...
            </p>
          )}
        </div>

        {/* Game Area */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 mb-8">
          <AnimatePresence mode="wait">
            <FoodCard
              key={`left-${currentFood.id}`}
              food={currentFood}
              onLike={() => handleChoice(1, true)}
              onDislike={() => handleChoice(1, false)}
              playerSide="left"
              isAnimating={isAnimating}
              isCurrentPlayer={currentPlayer === 1}
              hasChosen={player1Choice !== null}
              choice={player1Choice}
            />
          </AnimatePresence>

          <div className="flex flex-col items-center gap-4">
            <div className="text-center">
              <Heart className="w-8 h-8 text-red-500 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">VS</p>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <FoodCard
              key={`right-${currentFood.id}`}
              food={currentFood}
              onLike={() => handleChoice(2, true)}
              onDislike={() => handleChoice(2, false)}
              playerSide="right"
              isAnimating={isAnimating}
              isCurrentPlayer={currentPlayer === 2}
              hasChosen={player2Choice !== null}
              choice={player2Choice}
            />
          </AnimatePresence>
        </div>

        {/* Instructions */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Os jogadores se alternam para escolher. Ambos devem curtir a mesma comida para fazer match!
          </p>
          <Button 
            onClick={resetGame}
            variant="outline"
            className="border-orange-500 text-orange-500 hover:bg-orange-50"
          >
            Reiniciar Jogo
          </Button>
        </div>
      </div>
    </div>
  );
}