"use client";

import { useEffect, useState } from 'react';
import Card from '../../components/Card';
import { IProduct } from '../../types/productTypes';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;


export default function ProductsPage() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(`${apiUrl}/products`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log('Fetch response status:', response.status);
        const text = await response.text();
        console.log('Fetch response body:', text);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = JSON.parse(text) as IProduct[];
        console.log('Datos recibidos:', data);
        setProducts(data);
      } catch (err) {
        setError('Error al cargar los productos. Revisa la consola');
        console.error('Error en fetchProducts:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  );
  
  if (error) return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
      <p>{error}</p>
    </div>
  );

  return (
  
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Nuestros Productos</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <Card key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  
  );
}