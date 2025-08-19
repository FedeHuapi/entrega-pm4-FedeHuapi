"use client";

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  categoryId: number;
}

interface CardProps {
  product: Product;
}

const Card: React.FC<CardProps> = ({ product }) => {

  const { id, name, description, price, image, stock } = product;
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const router = useRouter();

 const handleAddToCart = () => {
    if (!isAuthenticated) {
      router.push('/login'); // Redirige a login si no está autenticado
      return;
    }
    addToCart({
      id: Date.now(), // ID temporal para el carrito (puedes usar product.id si es único)
      name,
      price,
      productId: id, // ID del producto en la base de datos
    });
    alert(`${name} añadido al carrito`); // Feedback para el usuario
  };

  const handleCardClick = () => {
    if (isAuthenticated) {
      router.push(`/product/${id}`); // Redirige a la página del producto si está autenticado
    } else {
      router.push('/login'); // Redirige a login si no está autenticado
    }
  }


  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-500 transform hover:scale-105 hover:shadow-2xl cursor-pointer" onClick={handleCardClick}>
      <div className="relative h-64 group">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-80"
        />
        <div className="absolute top-3 right-3 bg-yellow-400 text-gray-900 text-sm font-bold  px-3 py-1 rounded-full shadow-md">
          ${price.toFixed(2)}
        </div>
      </div>
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2 tracking-tight">{name}</h2>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>
        <div className="flex justify-between items-center">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            stock > 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
          }`}>
            {stock > 0 ? 'En Stock' : 'Agotado'}
          </span>
          <button
onClick={handleAddToCart}
className={`font-semibold py-2 px-4 rounded-lg transition-all duration-300 ${
  stock > 0
    ? 'bg-blue-900 text-white hover:bg-blue-800 hover:shadow-lg'
    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
}`}
disabled={stock <= 0}
>
Añadir al Carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
