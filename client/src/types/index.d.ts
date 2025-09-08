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
