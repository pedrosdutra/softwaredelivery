import { useState } from "react";
import { CategoryCard } from "./CategoryCard";
import { RestaurantCatalog } from "./RestaurantCatalog";
import { restaurantData } from "../data/restaurants";

const categories = [
  {
    title: "Lanchonetes",
    description: "Hamburguerias, sanduicherias e petiscarias",
    imageUrl: "https://images.unsplash.com/photo-1651981101695-219fa3653bf1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXJnZXIlMjByZXN0YXVyYW50JTIwaW50ZXJpb3J8ZW58MXx8fHwxNzU4NzM5NTU3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    itemCount: 3
  },
  {
    title: "Pizzarias",
    description: "Pizzarias tradicionais e gourmet",
    imageUrl: "https://images.unsplash.com/photo-1672596467349-0ec1280368f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXp6ZXJpYSUyMHJlc3RhdXJhbnR8ZW58MXx8fHwxNzU4ODIxNjY1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    itemCount: 3
  },
  {
    title: "Comida Saudável",
    description: "Restaurantes fit e naturais",
    imageUrl: "https://images.unsplash.com/photo-1555057949-7e4a30956f1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwcmVzdGF1cmFudCUyMHNhbGFkfGVufDF8fHx8MTc1ODgyMTY2OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    itemCount: 2
  },
  {
    title: "Bares e Drinks",
    description: "Bares, pubs e casas de drinks",
    imageUrl: "https://images.unsplash.com/photo-1700627480103-c692253b5f72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXIlMjByZXN0YXVyYW50JTIwZHJpbmtzfGVufDF8fHx8MTc1ODgyMTY3Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    itemCount: 2
  },
  {
    title: "Confeitarias",
    description: "Docerias, padarias e confeitarias",
    imageUrl: "https://images.unsplash.com/photo-1559329374-a792174e7a1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtlcnklMjBkZXNzZXJ0JTIwcmVzdGF1cmFudHxlbnwxfHx8fDE3NTg4MjE2NzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    itemCount: 2
  },
  {
    title: "Cafeterias",
    description: "Coffee shops e cafeterias especiais",
    imageUrl: "https://images.unsplash.com/photo-1685957199051-fa65a527b5e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBzaG9wJTIwcmVzdGF1cmFudHxlbnwxfHx8fDE3NTg4MjE2Nzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    itemCount: 2
  }
];

export function MenuCategories() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategoryClick = (categoryTitle: string) => {
    setSelectedCategory(categoryTitle);
  };

  const handleBackToCategorics = () => {
    setSelectedCategory(null);
  };

  // Se uma categoria está selecionada, mostra o catálogo
  if (selectedCategory) {
    const restaurants = restaurantData[selectedCategory] || [];
    return (
      <RestaurantCatalog
        category={selectedCategory}
        restaurants={restaurants}
        onBack={handleBackToCategorics}
      />
    );
  }

  // Caso contrário, mostra a lista de categorias
  return (
    <section className="py-16" id="menu">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Nossos Afiliados
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Descubra os melhores restaurantes parceiros em diversas categorias gastronômicas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <CategoryCard
              key={index}
              title={category.title}
              description={category.description}
              imageUrl={category.imageUrl}
              itemCount={category.itemCount}
              onClick={() => handleCategoryClick(category.title)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}