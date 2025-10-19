import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { StarRating } from "./StarRating";
import { Badge } from "./ui/badge";
import { Clock, Utensils, User, MessageSquare } from "lucide-react";
import { toast } from "sonner";

interface OrderEvaluationProps {
  orderId: string;
  restaurantName: string;
  deliveryTime: string;
  orderItems: string[];
}

export function OrderEvaluation({ 
  orderId, 
  restaurantName, 
  deliveryTime, 
  orderItems 
}: OrderEvaluationProps) {
  const [overallRating, setOverallRating] = useState(0);
  const [foodRating, setFoodRating] = useState(0);
  const [deliveryRating, setDeliveryRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (overallRating === 0) {
      toast.error("Por favor, dê uma avaliação geral");
      return;
    }

    setIsSubmitting(true);
    
    // Simular envio da avaliação
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success("Avaliação enviada com sucesso! Obrigado pelo seu feedback.");
    setIsSubmitting(false);
    
    // Reset form
    setOverallRating(0);
    setFoodRating(0);
    setDeliveryRating(0);
    setComment("");
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-orange-600">Foodly</h1>
        <p className="text-gray-600">Como foi sua experiência?</p>
      </div>

      {/* Order Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Utensils className="w-5 h-5" />
            Detalhes do Pedido
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Pedido #</span>
            <Badge variant="outline">{orderId}</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Restaurante</span>
            <span>{restaurantName}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 flex items-center gap-1">
              <Clock className="w-4 h-4" />
              Tempo de entrega
            </span>
            <span>{deliveryTime}</span>
          </div>
          <div className="space-y-1">
            <span className="text-sm text-gray-600">Itens do pedido:</span>
            <div className="flex flex-wrap gap-2">
              {orderItems.map((item, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Evaluation Form */}
      <Card>
        <CardHeader>
          <CardTitle>Avalie sua experiência</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Overall Rating */}
          <div className="space-y-3">
            <label className="block">
              Avaliação Geral
            </label>
            <div className="flex items-center gap-3">
              <StarRating 
                rating={overallRating}
                onRatingChange={setOverallRating}
                size={32}
              />
              <span className="text-sm text-gray-600">
                {overallRating > 0 && (
                  <>
                    {overallRating === 1 && "Muito ruim"}
                    {overallRating === 2 && "Ruim"}
                    {overallRating === 3 && "Regular"}
                    {overallRating === 4 && "Bom"}
                    {overallRating === 5 && "Excelente"}
                  </>
                )}
              </span>
            </div>
          </div>

          {/* Food Rating */}
          <div className="space-y-3">
            <label className="block flex items-center gap-2">
              <Utensils className="w-4 h-4" />
              Qualidade da Comida
            </label>
            <StarRating 
              rating={foodRating}
              onRatingChange={setFoodRating}
            />
          </div>

          {/* Delivery Rating */}
          <div className="space-y-3">
            <label className="block flex items-center gap-2">
              <User className="w-4 h-4" />
              Entrega
            </label>
            <StarRating 
              rating={deliveryRating}
              onRatingChange={setDeliveryRating}
            />
          </div>

          {/* Comment */}
          <div className="space-y-3">
            <label className="block flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Comentários (opcional)
            </label>
            <Textarea
              placeholder="Deixe um comentário sobre seu pedido..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
            />
          </div>

          {/* Submit Button */}
          <Button 
            onClick={handleSubmit}
            disabled={isSubmitting || overallRating === 0}
            className="w-full bg-orange-600 hover:bg-orange-700"
          >
            {isSubmitting ? "Enviando..." : "Enviar Avaliação"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}