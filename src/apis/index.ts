import { Product } from '../interfaces';
import Environment from '../env-config';
import { PRODUCTS } from './endpoints';

const { API_BASE_URL } = Environment;

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}${PRODUCTS}`);
    return await response.json();
  } catch (e) {
    throw new Error('Unable to fetch products at the moment!');
  }
};

export const addProduct = async (product: Product): Promise<Product> => {
  try {
    await (
      await fetch(`${API_BASE_URL}${PRODUCTS}`, {
        method: 'POST',
        body: JSON.stringify(product),
      })
    ).json();
    return product;
  } catch (e) {
    throw new Error('Unable to add product at the moment!');
  }
};
