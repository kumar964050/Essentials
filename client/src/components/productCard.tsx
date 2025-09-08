import { Link } from "react-router-dom";

import { Card, CardContent } from "./ui/card";

import type { Product } from "../types";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link to={`/product/${product._id}`}>
      <Card className="group cursor-pointer overflow-hidden rounded-2xl border-0 bg-gradient-to-br from-card to-muted/30 shadow-card hover:shadow-soft transition-all duration-300 hover:-translate-y-1">
        <CardContent className="p-0">
          <div className="aspect-square overflow-hidden bg-muted/20">
            <img
              src={product.photos[0].url}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="p-6">
            <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              {product.color}
            </p>
            <p className="text-lg font-semibold text-foreground">
              ₹{product.price}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
