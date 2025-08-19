"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { IProduct } from '../../../types/productTypes';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;


export default function ProductDetail() {
  const params = useParams();
  const { id } = params as { id: string };
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();

  useEffect(() => {
    if (!id) {
    setError('ID del producto no proporcionado');
    setLoading(false);
    return;
    }



    async function fetchProduct() {
      if (!id) return;
      try {
        const response = await fetch(`${apiUrl}/products/${id}`, {
          cache: "no-cache",
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        console.log('Fetch response status:', response.status);
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to fetch product: ${response.status} - ${errorText || 'Sin detalles'}`);
        }
        const data = await response.json() as IProduct;
        console.log('Parsed product:', data);
        setProduct(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        setError(`Error al cargar el producto: ${errorMessage}`);
        console.error('Error en fetchProduct:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      alert('Por favor, inicia sesión para añadir productos al carrito.');
      return;
    }
    if (!product) return;

    addToCart({
      id: Date.now(), // ID temporal para el carrito (puedes usar product.id si es único)
      name: product.name,
      price: product.price,
      productId: product.id, // ID del producto en la base de datos
    });
    alert(`${product.name} añadido al carrito`); 
  }


  if (loading) return <div>Cargando detalles del producto...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>No se encontró el producto</div>; // Esto es un fallback

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-black">{product.name}</h1>
      <img src={product.image} alt={product.name} className="w-full h-64 object-cover mb-4" />
      <p className="text-xl mb-2 text-black">${product.price.toFixed(2)}</p>
      <p className="mb-4 text-black">{product.description}</p>
      <p className="mb-4 text-black">Stock: {product.stock}</p>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleAddToCart} disabled={product.stock <= 0}>
        Añadir al carrito
      </button>
    </div>
  );
}