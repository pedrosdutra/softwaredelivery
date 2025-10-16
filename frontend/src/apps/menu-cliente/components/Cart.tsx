import { useState } from 'react';
import { Minus, Plus, Trash2, X, CreditCard } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useCart } from '../contexts/CartContext';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Cart({ isOpen, onClose }: CartProps) {
  const { 
    items, 
    updateQuantity, 
    removeItem, 
    clearCart, 
    getTotalPrice, 
    getItemsByRestaurant 
  } = useCart();

  const [isProcessingOrder, setIsProcessingOrder] = useState(false);

  const itemsByRestaurant = getItemsByRestaurant();
  const totalPrice = getTotalPrice();

  const handleFinishOrder = async () => {
    setIsProcessingOrder(true);
    
    // Simular processamento do pedido
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    alert('Pedido realizado com sucesso! Você será redirecionado para o pagamento.');
    clearCart();
    setIsProcessingOrder(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="fixed right-0 top-0 h-full w-full max-w-lg bg-white shadow-xl">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b bg-white">
            <h2 className="text-lg font-semibold">Seu Carrinho</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-8 bg-white min-h-[500px]">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="mb-4 rounded-full bg-muted p-6">
                  <CreditCard className="h-12 w-12 text-muted-foreground" />
                </div>
                <h3 className="mb-2 font-medium">Carrinho vazio</h3>
                <p className="text-sm text-muted-foreground">
                  Adicione itens do catálogo de restaurantes para começar
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {Object.entries(itemsByRestaurant).map(([restaurantId, restaurantItems]) => (
                  <Card key={restaurantId}>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Badge variant="outline">{restaurantItems[0].restaurantName}</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {restaurantItems.map((item) => (
                        <div key={item.id} className="flex items-center gap-3">
                          {item.imageUrl && (
                            <div className="h-12 w-12 rounded-md overflow-hidden flex-shrink-0">
                              <ImageWithFallback
                                src={item.imageUrl}
                                alt={item.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                          )}
                          
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm truncate">{item.name}</h4>
                            <p className="text-xs text-muted-foreground truncate">
                              {item.description}
                            </p>
                            <p className="text-sm font-medium text-primary">
                              R$ {item.price.toFixed(2)}
                            </p>
                          </div>

                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            
                            <span className="w-8 text-center text-sm font-medium">
                              {item.quantity}
                            </span>
                            
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>

                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive hover:text-destructive"
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t p-6 space-y-4 bg-white">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>R$ {totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Taxa de entrega</span>
                  <span>R$ 5,90</span>
                </div>
                <Separator />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span className="text-primary">R$ {(totalPrice + 5.90).toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Button 
                  className="w-full" 
                  onClick={handleFinishOrder}
                  disabled={isProcessingOrder}
                >
                  {isProcessingOrder ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                      Processando...
                    </div>
                  ) : (
                    <>
                      <CreditCard className="h-4 w-4 mr-2" />
                      Finalizar Pedido
                    </>
                  )}
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={clearCart}
                  disabled={isProcessingOrder}
                >
                  Limpar Carrinho
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}