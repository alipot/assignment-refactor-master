import { Product } from '../interfaces';

const products: Product[] = [
  {
    title: 'A Boxing Glove',
    description: 'Sample Description of the Boxing glove',
    price: 123.12,
    rating: { rate: 3.1, count: 120 },
  },
  {
    title: 'iPods',
    description: 'Sample Description of the iPods',
    price: 35.92,
    rating: { rate: 4.6, count: 5402 },
  },
];

export const fetchProducts = async (): Promise<Product[]> => {
  return new Promise<Product[]>((resolve, reject) => {
    setTimeout(() => {
      resolve(products);
    }, 1000);
  });
};

export const addProduct = async (product: Product): Promise<Product[]> => {
  return new Promise<Product[]>((resolve, reject) => {
    setTimeout(() => {
      resolve([...products, product]);
    }, 1000);
  });
};
