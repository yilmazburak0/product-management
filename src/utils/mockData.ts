import { Product } from '../types';

export const productCategories = [
  'Electronics', 'Clothing', 'Books', 'Home & Kitchen', 'Toys', 'Sports', 'Other'
];

export const initialProducts: Product[] = [
  {
    id: 1,
    name: 'Laptop',
    price: 999.99,
    category: 'Electronics',
    description: 'High-performance laptop with 16GB RAM and 512GB SSD.'
  },
  {
    id: 2,
    name: 'Smartphone',
    price: 699.99,
    category: 'Electronics',
    description: 'Latest model with 128GB storage and triple camera.'
  },
  {
    id: 3,
    name: 'T-shirt',
    price: 19.99,
    category: 'Clothing',
    description: '100% cotton t-shirt, available in multiple colors.'
  }
];
