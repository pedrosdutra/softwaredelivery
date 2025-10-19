import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Dice6, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export interface FoodItem {
  id: string;
  name: string;
  description: string;
  category: string;
  image: string;
  emoji: string;
}

const foods: FoodItem[] = [
  {
    id: '1',
    name: 'Pizza Margherita',
    description: 'Clássica pizza italiana com molho de tomate, mussarela e manjericão fresco',
    category: 'Italiana',
    image: 'https://images.unsplash.com/photo-1678443316613-dbc3261c8b50?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXp6YSUyMGZvb2QlMjBkZWxpdmVyeXxlbnwxfHx8fDE3NTg4MTU4Mzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    emoji: '🍕'
  },
  {
    id: '2',
    name: 'Hambúrguer Artesanal',
    description: 'Burger suculento com carne premium, queijo cheddar e molhos especiais',
    category: 'Fast Food',
    image: 'https://images.unsplash.com/photo-1656439659132-24c68e36b553?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXJnZXIlMjBmYXN0JTIwZm9vZHxlbnwxfHx8fDE3NTg4MzQ1Njl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    emoji: '🍔'
  },
  {
    id: '3',
    name: 'Sushi Premium',
    description: 'Seleção especial de sushis frescos com peixe de alta qualidade',
    category: 'Japonesa',
    image: 'https://images.unsplash.com/photo-1700324822763-956100f79b0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXNoaSUyMGphcGFuZXNlJTIwZm9vZHxlbnwxfHx8fDE3NTg3NzA5MzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    emoji: '🍣'
  },
  {
    id: '4',
    name: 'Tacos Mexicanos',
    description: 'Autênticos tacos com carne temperada e molhos tradicionais mexicanos',
    category: 'Mexicana',
    image: 'https://images.unsplash.com/photo-1629407119384-d42320c3e576?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHJlc3RhdXJhbnQlMjBraXRjaGVuJTIwY2hlZnxlbnwxfHx8fDE3NTg3MTczOTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    emoji: '🌮'
  },
  {
    id: '5',
    name: 'Lasanha Caseira',
    description: 'Lasanha tradicional com camadas de massa, molho bolonhesa e queijo',
    category: 'Italiana',
    image: 'https://images.unsplash.com/photo-1678443316613-dbc3261c8b50?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXp6YSUyMGZvb2QlMjBkZWxpdmVyeXxlbnwxfHx8fDE3NTg4MTU4Mzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    emoji: '🍝'
  },
  {
    id: '6',
    name: 'Pad Thai',
    description: 'Clássico macarrão tailandês com camarão, amendoim e molho agridoce',
    category: 'Tailandesa',
    image: 'https://images.unsplash.com/photo-1629407119384-d42320c3e576?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHJlc3RhdXJhbnQlMjBraXRjaGVuJTIwY2hlZnxlbnwxfHx8fDE3NTg3MTczOTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    emoji: '🍜'
  }
];

interface FoodRandomizerProps {
  onFoodSelected: (food: FoodItem) => void;
}

export function FoodRandomizer({ onFoodSelected }: FoodRandomizerProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);

  const randomizeFood = () => {
    setIsSpinning(true);
    
    // Simula o tempo de "sorteio"
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * foods.length);
      const food = foods[randomIndex];
      setSelectedFood(food);
      setIsSpinning(false);
      onFoodSelected(food);
    }, 2000);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="text-center">
        <CardHeader>
          <CardTitle className="flex items-center justify-center space-x-2">
            <Sparkles className="w-5 h-5 text-orange-600" />
            <span>Não sabe o que pedir?</span>
          </CardTitle>
          <p className="text-muted-foreground">
            Deixe a sorte decidir! Clique no botão e descubra sua próxima refeição
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {selectedFood && !isSpinning && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-4"
            >
              <div className="text-6xl">{selectedFood.emoji}</div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">{selectedFood.name}</h3>
                <Badge variant="secondary">{selectedFood.category}</Badge>
                <p className="text-sm text-muted-foreground">{selectedFood.description}</p>
              </div>
            </motion.div>
          )}
          
          {isSpinning && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, ease: "linear" }}
              className="text-6xl"
            >
              🎲
            </motion.div>
          )}
          
          <Button 
            onClick={randomizeFood}
            disabled={isSpinning}
            className="w-full bg-orange-600 hover:bg-orange-700 cursor-pointer"
            size="lg"
          >
            {isSpinning ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Dice6 className="w-4 h-4 mr-2" />
                </motion.div>
                Sorteando...
              </>
            ) : (
              <>
                <Dice6 className="w-4 h-4 mr-2" />
                Sortear Comida
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}