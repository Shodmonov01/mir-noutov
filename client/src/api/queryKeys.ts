export const catalogKeys = {
  all: ['catalog'] as const,
  categories: () => [...catalogKeys.all, 'categories'] as const,
  products: () => [...catalogKeys.all, 'products'] as const,
};
