import { Card, CardContent } from "./ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Percent, Truck, Gift } from "lucide-react";

const discountOffers = [
  {
    id: 1,
    title: "30% OFF",
    subtitle: "New Customer Special",
    description: "Get 30% off your first order with code WELCOME30",
    icon: Percent,
    gradient: "from-primary/20 to-primary/10",
  },
  {
    id: 2,
    title: "FREE SHIPPING",
    subtitle: "Orders Over $75",
    description: "Free shipping on all orders above $75 - no code needed",
    icon: Truck,
    gradient: "from-accent/20 to-accent/10",
  },
  {
    id: 3,
    title: "BUY 2 GET 1",
    subtitle: "Mix & Match Deal",
    description: "Buy any 2 items and get the 3rd one absolutely free",
    icon: Gift,
    gradient: "from-secondary/20 to-secondary/10",
  },
];

const DiscountBanner = () => {
  return (
    <section className="py-8 bg-muted/30">
      <div className="container mx-auto px-4">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent>
            {discountOffers.map((offer) => {
              const IconComponent = offer.icon;
              return (
                <CarouselItem
                  key={offer.id}
                  className="md:basis-1/2 lg:basis-1/3"
                >
                  <Card
                    className={`border-0 bg-gradient-to-r ${offer.gradient} shadow-soft`}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-background/80 rounded-full mb-4">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">
                        {offer.title}
                      </h3>
                      <p className="text-lg font-semibold text-primary mb-2">
                        {offer.subtitle}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {offer.description}
                      </p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
      </div>
    </section>
  );
};

export default DiscountBanner;
