import { useQuery } from '@tanstack/react-query';
import { fetchCategories, fetchProducts } from '../api/catalogApi';
import { catalogKeys } from '../api/queryKeys';

export function useCategories() {
  return useQuery({
    queryKey: catalogKeys.categories(),
    queryFn: fetchCategories,
  });
}

export function useProducts() {
  return useQuery({
    queryKey: catalogKeys.products(),
    queryFn: fetchProducts,
  });
}
