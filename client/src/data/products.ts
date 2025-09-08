// import shirtCream from "@/assets/shirt-cream.jpg";
// import pantsNavy from "@/assets/pants-navy.jpg";
// import shirtCoral from "@/assets/shirt-coral.jpg";
// import pantsBeige from "@/assets/pants-beige.jpg";

import type { Product } from "../types";

export const products: Product[] = [
  {
    id: "1",
    name: "Essential Cotton Tee",
    price: 789,
    image: "/shirt-coral-DgS89x5O.jpg",
    category: "shirts",
    sizes: ["XS", "S", "M", "L", "XL"],
    description:
      "Soft, breathable cotton tee perfect for everyday wear. Made from 100% organic cotton.",
    color: "Cream",
  },
  {
    id: "2",
    name: "Classic Navy Jeans",
    price: 899,
    image: "/pants-beige-CXm_ox0N.jpg",
    category: "pants",
    sizes: ["28", "30", "32", "34", "36"],
    description:
      "Timeless straight-fit jeans in premium denim. Comfortable and durable for all-day wear.",
    color: "Navy Blue",
  },
  {
    id: "3",
    name: "Cozy Coral Sweater",
    price: 659,
    image: "/shirt-cream--jOpqSzD.jpg",
    category: "shirts",
    sizes: ["XS", "S", "M", "L", "XL"],
    description:
      "Ultra-soft merino wool blend sweater. Perfect for layering or wearing on its own.",
    color: "Coral Pink",
  },
  {
    id: "4",
    name: "Relaxed Chino Pants",
    price: 759,
    image: "/pants-navy-HjUvh7l3.jpg",
    category: "pants",
    sizes: ["28", "30", "32", "34", "36"],
    description:
      "Comfortable cotton chinos with a relaxed fit. Versatile for both casual and smart-casual looks.",
    color: "Beige",
  },
];
