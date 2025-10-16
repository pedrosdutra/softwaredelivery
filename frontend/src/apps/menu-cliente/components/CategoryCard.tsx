import { ImageWithFallback } from './figma/ImageWithFallback';

interface CategoryCardProps {
  title: string;
  description: string;
  imageUrl: string;
  itemCount: number;
  onClick?: () => void;
}

export function CategoryCard({ title, description, imageUrl, itemCount, onClick }: CategoryCardProps) {
  return (
    <div 
      className="group cursor-pointer rounded-xl overflow-hidden bg-card border hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-2"
      onClick={onClick}
    >
      <div className="aspect-[4/3] relative overflow-hidden">
        <ImageWithFallback
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium shadow-lg">
            {itemCount} restaurantes
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-semibold mb-2 text-lg">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}