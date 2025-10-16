import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { MenuCategories } from "./components/MenuCategories";
import { FoodTools } from "./components/FoodTools";
import { OrderTracking } from "./components/OrderTracking";
import { Features } from "./components/Features";
import { Footer } from "./components/Footer";
import { CartProvider } from "./contexts/CartContext";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="overflow-x-hidden">
          <div id="home">
            <Hero />
          </div>
          <div id="menu">
            <MenuCategories />
          </div>
          <OrderTracking />
          <FoodTools />
          <Features />
        </main>
        <div id="footer">
          <Footer />
        </div>
        <Toaster position="top-right" />
      </div>
    </CartProvider>
  );
}