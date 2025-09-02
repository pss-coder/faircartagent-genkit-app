import { Button } from "@/components/ui/button";
import { ShoppingItem } from "@/types/shopping";
import { ShoppingCart, Heart, DollarSign } from "lucide-react";

interface ItemCardProps {
  item: ShoppingItem;
}

export const ItemCard = ({ item }: ItemCardProps) => {
  return (
    <div className="overflow-hidden shadow-product hover:shadow-lg transition-shadow duration-200 bg-gray-50 rounded-lg border border-gray-200">
      {/* <div className="aspect-square bg-accent/30 relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = '/placeholder.svg';
          }}
        />
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.isHealthier && (
            <Badge variant="secondary" className="bg-success text-success-foreground">
              <Heart className="h-3 w-3 mr-1" />
              Healthier
            </Badge>
          )}
          {product.isCheaper && (
            <Badge variant="secondary" className="bg-warning text-warning-foreground">
              <DollarSign className="h-3 w-3 mr-1" />
              Cheaper
            </Badge>
          )}
        </div>
      </div> */}
      
      <div className="p-4">
        <div className="space-y-2">
          <div>
            <h4 className="font-medium line-clamp-2">{item.name}</h4>
            {/* <p className="text-sm text-muted-foreground">{product.brand}</p> */}
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <span className="text-lg font-bold text-primary">
                ${item.price.toFixed(2)}
              </span>
              {/* <span className="text-sm text-muted-foreground ml-1">
                per {item.unit}
              </span> */}
            </div>
            
            {/* {product.nutritionScore && (
              <div className="text-right">
                <div className="text-xs text-muted-foreground">Nutrition</div>
                <div className="text-sm font-medium text-success">
                  {product.nutritionScore}/10
                </div>
              </div>
            )} */}
          </div>
          
          <Button
            // onClick={() => onAddToCart(product)}
            className="w-full"
            // variant={isInCart ? "secondary" : "default"}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {/* {isInCart ? "Added" : "Add to Cart"} */}
          </Button>
        </div>
      </div>
    </div>
  );
};