export interface Category {
  id: number;
  name: string;
  image: string;
}

export interface Product {
  id: number;
  categoryId: number;
  title: string;
  price: number;
  currency?: string;
  image: string;
  description?: string;
  specs?: Record<string, string>;
  condition?: string;
  warranty?: string;
  contacts?: string[];
  location?: string;
}
