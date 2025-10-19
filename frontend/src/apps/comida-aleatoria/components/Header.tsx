import exampleImage from '../../assets/SegundaLogodoProjeto.png';
import { useNavigate } from 'react-router-dom';

export function Header() {
  const navigate = useNavigate();
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img 
            src={exampleImage} 
            alt="Foodly" 
            className="w-12 h-12 rounded-xl"
          />
          <h1 className="text-2xl font-bold text-orange-600">Foodly</h1>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <a onClick={() => navigate("/menu")} className="text-gray-700 hover:text-orange-600 transition-colors cursor-pointer">Início</a>
          <a onClick={() => navigate("/menu")} className="text-gray-700 hover:text-orange-600 transition-colors cursor-pointer">Restaurantes</a>
          <a onClick={() => navigate("/menu")} className="text-gray-700 hover:text-orange-600 transition-colors cursor-pointer">Ofertas</a>
          <a onClick={() => navigate("/menu")} className="text-gray-700 hover:text-orange-600 transition-colors cursor-pointer">Contato</a>
        </nav>
      </div>
    </header>
  );
}