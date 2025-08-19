
import { IProduct } from '../types/productTypes';

export const mockProducts: IProduct[] = [
  {
    id: 1,
    name: "Smartphone X",
    description: "El último modelo de smartphone con características avanzadas.",
    price: 999.99,
    stock: 50,
    image: "https://via.placeholder.com/150",
    categoryId: 1
  },
  {
    id: 2,
    name: "Laptop Pro",
    description: "Laptop de alto rendimiento para profesionales.",
    price: 1499.99,
    stock: 30,
    image: "https://via.placeholder.com/150",
    categoryId: 2
  },
  {
    id: 3,
    name: "Auriculares Inalámbricos",
    description: "Auriculares con cancelación de ruido y gran calidad de sonido.",
    price: 199.99,
    stock: 100,
    image: "https://via.placeholder.com/150",
    categoryId: 3
  },
  
];