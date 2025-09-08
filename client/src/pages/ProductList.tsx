import { useLocation } from "react-router-dom";
import { ProductCard } from "../components/productCard";
// import { products } from "../data/products";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import type { Product } from "../types";

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const location = useLocation();
  const category = location.pathname;

  // title based on path
  const title =
    category === "/products"
      ? "All Products"
      : `${category.charAt(1).toUpperCase()}${category.slice(2)}`;

  // get products
  useEffect(() => {
    (async () => {
      const url = `${
        import.meta.env.VITE_API_URL
      }/products?category=${category.slice(1)}`;
      const res = await fetch(url);
      const data = await res.json();
      setProducts(data.products);
    })();
  }, [category]);

  const filteredProducts =
    category === "/products"
      ? products
      : products.filter((product) => product.category === category.slice(1));

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">{title}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {category === "/shirts"
              ? "Discover our collection of comfortable and stylish shirts, from casual tees to cozy sweaters."
              : category === "/pants"
              ? "Find the perfect pair of pants, from classic jeans to versatile chinos."
              : "Explore our complete collection of essential clothing for everyone."}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              No products found in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
