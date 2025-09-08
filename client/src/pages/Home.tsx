import { Link } from "react-router-dom";
import { Shirt, Package } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { ProductCard } from "../components/productCard";
import { useAuth } from "../hooks/useAuth";

import DiscountBanner from "../components/DiscountBanner";

const Home = () => {
  const { user, isAuthenticated } = useAuth();

  const Shirts = {
    _id: "68be6becb63052831b2dbed4",
    name: "Black Surfing",
    price: 799,
    description: "Smmer time 2020",
    photos: [
      {
        id: "Essentials/gmbfhphfa3xc2wq0reqo",
        url: "https://res.cloudinary.com/narri/image/upload/v1757309931/Essentials/gmbfhphfa3xc2wq0reqo.jpg",
        _id: {
          $oid: "68be6becb63052831b2dbed5",
        },
      },
      {
        id: "Essentials/o5tajvh17uip6utbq1g8",
        url: "https://res.cloudinary.com/narri/image/upload/v1757309932/Essentials/o5tajvh17uip6utbq1g8.jpg",
        _id: {
          $oid: "68be6becb63052831b2dbed6",
        },
      },
    ],
    category: "shirts",
    stock: 10,
    brand: "Surfing",
    ratings: 0,
  };
  const Pants = {
    _id: "68be701db63052831b2dbf15",
    name: "pants navy jeans",
    price: 1199,
    description: "pants navy jeans",
    photos: [
      {
        id: "Essentials/eeq33z5ogt4h7qcsnwy9",
        url: "https://res.cloudinary.com/narri/image/upload/v1757311003/Essentials/eeq33z5ogt4h7qcsnwy9.jpg",
        _id: {
          $oid: "68be701db63052831b2dbf16",
        },
      },
      {
        id: "Essentials/h9hdirhuzj48lzfdwp9t",
        url: "https://res.cloudinary.com/narri/image/upload/v1757311005/Essentials/h9hdirhuzj48lzfdwp9t.jpg",
        _id: {
          $oid: "68be701db63052831b2dbf17",
        },
      },
    ],
    category: "pants",
    stock: 5,
    brand: "tones",
    ratings: 0,
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/10 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              {isAuthenticated ? (
                <>
                  Welcome back,{" "}
                  <span className="text-primary">
                    {user?.name.split(" ")[0]}
                  </span>
                </>
              ) : (
                <>
                  Essential Clothing for{" "}
                  <span className="text-primary">Everyone</span>
                </>
              )}
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              {isAuthenticated
                ? "Ready to shop for your next essentials? We have new arrivals waiting for you."
                : "Simple, quality basics that fit perfectly into your life. Shirts and pants designed with care, made to last."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="rounded-full px-8">
                <Link to="/shirts">Shop Shirts</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full px-8"
              >
                <Link to="/pants">Shop Pants</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/*  */}
      <DiscountBanner />
      {/* Categories Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Shop by Category
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Link to="/shirts">
              <Card className="group cursor-pointer overflow-hidden rounded-2xl border-0 bg-gradient-to-br from-primary/5 to-primary/10 shadow-card hover:shadow-soft transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6 group-hover:bg-primary/20 transition-colors">
                    <Shirt className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground mb-4">
                    Shirts
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Comfortable tees, cozy sweaters, and versatile tops for
                    every occasion
                  </p>
                  <Button variant="outline" className="rounded-full">
                    Explore Shirts
                  </Button>
                </CardContent>
              </Card>
            </Link>

            <Link to="/pants">
              <Card className="group cursor-pointer overflow-hidden rounded-2xl border-0 bg-gradient-to-br from-accent/5 to-accent/10 shadow-card hover:shadow-soft transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/20 rounded-full mb-6 group-hover:bg-accent/30 transition-colors">
                    <Package className="h-8 w-8 text-accent-foreground" />
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground mb-4">
                    Pants
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Classic jeans, comfortable chinos, and relaxed fits that
                    move with you
                  </p>
                  <Button variant="outline" className="rounded-full">
                    Explore Pants
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Featured Essentials
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <ProductCard product={Shirts} />
            <ProductCard product={Pants} />
          </div>
          <div className="text-center mt-12">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full px-8"
            >
              <Link to="/products">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
