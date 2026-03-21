import type { Category, Product } from '../dto/catalog';
import { categories, products } from './mockData';

export async function fetchCategories(): Promise<Category[]> {
  return Promise.resolve(categories);
}

export async function fetchProducts(): Promise<Product[]> {
  return Promise.resolve(products);
}
