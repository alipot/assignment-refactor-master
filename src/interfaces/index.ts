export interface Product {
  title: string;
  description: string;
  price: number;
  isFavorite?: boolean;
  rating?: { rate: number; count: number };
}
