import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { products } from "../data/products";
import { useCartContext } from "../contexts/CartContext";

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCartContext();
  const [selectedSize, setSelectedSize] = useState<string>("");

  const handleAddToCart = () => {
    if (!selectedSize) return;
    addToCart(product, selectedSize);
  };

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const url = `${import.meta.env.VITE_API_URL}/products/${id}`;
        const res = await fetch(url);
        const data = await res.json();
        setProduct(data.product);
      } catch (error) {
        console.log("error", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [id]);

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {isLoading && <div>Loading...</div>}
        {!isLoading && (
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Product Image */}
            <div className="aspect-square overflow-hidden rounded-2xl bg-muted/20">
              <img
                src={product.photos[0].url}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-center space-y-6">
              <div>
                <Badge variant="secondary" className="mb-4">
                  {product.category === "shirts" ? "Shirt" : "Pants"}
                </Badge>
                <h1 className="text-4xl font-bold text-foreground mb-4">
                  {product.name}
                </h1>
                <p className="text-2xl font-semibold text-primary mb-6">
                  ₹{product.price}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-foreground mb-2">
                  Color
                </h3>
                <p className="text-muted-foreground mb-6">red</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-foreground mb-4">
                  Size
                </h3>
                <div className="grid grid-cols-5 gap-2">
                  {product.sizes.map((size) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? "default" : "outline"}
                      className="aspect-square rounded-xl"
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-foreground mb-2">
                  Description
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="pt-6">
                <Button
                  size="lg"
                  className="w-full rounded-xl"
                  onClick={handleAddToCart}
                  disabled={!selectedSize}
                >
                  {selectedSize ? "Add to Cart" : "Select a Size"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
