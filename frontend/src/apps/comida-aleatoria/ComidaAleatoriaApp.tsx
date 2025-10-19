import { useState } from 'react';
import { Header } from './components/Header';
import { FoodRandomizer, FoodItem } from './components/FoodRandomizer';
import { RestaurantRecommendations } from './components/RestaurantRecommendations';


export default function App() {
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Não sabe o que comer hoje?
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Deixe nossa ferramenta mágica escolher por você! Descubra novos sabores e encontre os melhores restaurantes da sua região.
          </p>
        </section>

        {/* Food Randomizer */}
        <section className="mb-12">
          <FoodRandomizer onFoodSelected={setSelectedFood} />
        </section>

        {/* Restaurant Recommendations */}
        {selectedFood && (
          <section className="mb-12">
            <RestaurantRecommendations selectedFood={selectedFood} />
          </section>
        )}
      </main>
    </div>
  );
}