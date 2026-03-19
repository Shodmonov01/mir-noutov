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

export const categories: Category[] = [
  { id: 1, name: 'Ноутбуки', image: 'https://picsum.photos/200?random=1' },
  { id: 2, name: 'Компьютеры', image: 'https://picsum.photos/200?random=2' },
  { id: 3, name: 'Комплектующие', image: 'https://picsum.photos/200?random=3' },
  { id: 4, name: 'Аксессуары', image: 'https://picsum.photos/200?random=4' },
  { id: 5, name: 'Офисные', image: 'https://picsum.photos/200?random=5' },
  { id: 6, name: 'Серверные', image: 'https://picsum.photos/200?random=6' },
];

export const products: Product[] = [
  {
    id: 1,
    categoryId: 1,
    title: 'Razer Blade Pro 17',
    price: 600,
    currency: 'USD',
    image: 'https://picsum.photos/300?random=11',
    description: '17" FHD IPS 300Hz, i7-10875H, 16GB RAM, 512GB SSD, RTX 2070',
    specs: { cpu: 'Intel Core i7-10875H', ram: '16GB', storage: '512GB SSD', gpu: 'RTX 2070' },
    condition: 'Б/У',
    warranty: '3 месяца',
    contacts: ['+998903576787', '+998946914699'],
    location: 'Малика, B36',
  },
  {
    id: 2,
    categoryId: 1,
    title: 'MacBook Pro 16 M1 Pro',
    price: 1800,
    currency: 'USD',
    image: 'https://picsum.photos/300?random=12',
    description: '16", M1 Pro, 16GB RAM, 512GB SSD',
    specs: { cpu: 'M1 Pro', ram: '16GB', storage: '512GB' },
    condition: 'Новый',
  },
  {
    id: 3,
    categoryId: 1,
    title: 'ASUS ROG Strix G15',
    price: 1200,
    currency: 'USD',
    image: 'https://picsum.photos/300?random=13',
    description: 'Ryzen 7, 16GB, RTX 3060',
  },
  {
    id: 4,
    categoryId: 1,
    title: 'HP Omen 15',
    price: 950,
    image: 'https://picsum.photos/300?random=14',
    description: 'i7, GTX 1660Ti',
  },
  {
    id: 5,
    categoryId: 1,
    title: 'Lenovo Legion 5',
    price: 1000,
    image: 'https://picsum.photos/300?random=15',
  },
  { id: 6, categoryId: 2, title: 'Игровой ПК RTX 3060', price: 1100, image: 'https://picsum.photos/300?random=16' },
  { id: 7, categoryId: 2, title: 'ПК для офиса i5', price: 400, image: 'https://picsum.photos/300?random=17' },
  { id: 8, categoryId: 2, title: 'ПК RTX 4070', price: 1800, image: 'https://picsum.photos/300?random=18' },
  { id: 9, categoryId: 2, title: 'Mini PC Intel NUC', price: 500, image: 'https://picsum.photos/300?random=19' },
  { id: 10, categoryId: 3, title: 'RTX 3080 10GB', price: 700, image: 'https://picsum.photos/300?random=20' },
  { id: 11, categoryId: 3, title: 'SSD 1TB NVMe', price: 120, image: 'https://picsum.photos/300?random=21' },
  { id: 12, categoryId: 3, title: 'DDR4 16GB', price: 60, image: 'https://picsum.photos/300?random=22' },
  { id: 13, categoryId: 3, title: 'Ryzen 5 5600X', price: 200, image: 'https://picsum.photos/300?random=23' },
  { id: 14, categoryId: 3, title: 'Материнская плата B550', price: 150, image: 'https://picsum.photos/300?random=24' },
  { id: 15, categoryId: 4, title: 'Игровая мышь Logitech', price: 50, image: 'https://picsum.photos/300?random=25' },
  { id: 16, categoryId: 4, title: 'Клавиатура RGB', price: 80, image: 'https://picsum.photos/300?random=26' },
  { id: 17, categoryId: 4, title: 'Монитор 144Hz', price: 250, image: 'https://picsum.photos/300?random=27' },
  { id: 18, categoryId: 4, title: 'Наушники HyperX', price: 70, image: 'https://picsum.photos/300?random=28' },
  { id: 19, categoryId: 4, title: 'Коврик для мыши XL', price: 20, image: 'https://picsum.photos/300?random=29' },
  { id: 20, categoryId: 4, title: 'Webcam Full HD', price: 90, image: 'https://picsum.photos/300?random=30' },
];
