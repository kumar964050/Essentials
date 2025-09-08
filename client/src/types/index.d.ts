export interface User {
  id: string;
  name: string;
  phone: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  photos: [{ url: string; id: string }];
  category: "shirts" | "pants";
  stock: number;
  brand: string;
  ratings: number;
  sizes: string[];
  color: string;
}

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  size: string;
  quantity: number;
  price: number;
}

export type Order = {
  id: string;
  createdAt: string;
  status: string;
  totalAmount: number;
  deliveryAddress: {
    fullName: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
    instructions?: string;
  };
  items: {
    id: string;
    product: Product;
    quantity: number;
    // You could enrich with more info if needed
  }[];
};
