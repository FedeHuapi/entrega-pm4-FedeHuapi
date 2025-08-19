"use client"; 

import { useAuth } from '@/context/AuthContext'; 
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const apiUrl = process.env.NEXT_PUBLIC_API_URL 

interface User {
  id: number;
  name: string;
  email: string;
  address: string;
  phone: string;
  role: string;
  orders?: Order[];
}

interface Order {
  id: number;
  status: string;
  date: string;
  products: Product[];
}

interface Product {
  id: number;
  name: string;
  price: number;
}

export default function Dashboard() {
  const { isAuthenticated, logout } = useAuth(); // Verificamos si el usuario está autenticado y accedemos a logout
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Redirigimos a /login si el usuario no está autenticado
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    } else {
      fetchUserData();
    }
  }, [isAuthenticated, router]);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No se encontró token de autenticación');
        setLoading(false);
        return;
      }

      console.log('Token enviado:', token); // Log para depurar el token
      const response = await fetch(`${apiUrl}/users/me`, { 
        headers: {
          'Authorization': `Bearer ${token}`, // Enviamos el token en el formato correcto
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.log('Error response:', errorText); // Log para depurar la respuesta de error
        throw new Error(`Error al obtener los datos del usuario: ${response.status} - ${errorText}`);
      }

      const userData = await response.json();
      console.log('User Data received:', userData); // Log para depurar los datos recibidos
      setUser(userData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">Cargando...</div>;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-2xl font-bold text-red-500">Error</h1>
        <p className="mb-4 text-black">{error}</p>
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Cerrar sesión
        </button>
      </div>
    );
  }

  if (!user) {
    return <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">No se encontraron datos del usuario</div>;
  }

  return (
    <div className="bg-background min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-text">Dashboard de Usuario</h1>
        <div className="bg-white rounded-lg shadow-md p-6 text-black">
          <h2 className="text-2xl font-semibold mb-4 text-text">Información del usuario</h2>
          <p><strong>Nombre:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Dirección:</strong> {user.address}</p>
          <p><strong>Teléfono:</strong> {user.phone}</p>

          {/* Listado de compras */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-4 text-text">Historial de Compras</h2>
            {user.orders && user.orders.length > 0 ? (
              <ul className="space-y-4">
                {user.orders.map((order) => (
                  <li key={order.id} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                    <p className="text-lg font-medium text-black">Orden #{order.id}</p>
                    <p className="text-gray-600">Estado: {order.status}</p>
                    <p className="text-gray-600">Fecha: {new Date(order.date).toLocaleDateString()}</p>
                    <p className="text-gray-600">Total: ${order.products.reduce((sum, product) => sum + product.price, 0).toFixed(2)}</p>
                    <div className="mt-2">
                      <h3 className="text-md font-semibold text-black">Productos:</h3>
                      <ul className="list-disc list-inside text-gray-700">
                        {order.products.map((product) => (
                          <li key={product.id}>{product.name} - ${product.price.toFixed(2)}</li>
                        ))}
                      </ul>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center text-gray-500 p-4 bg-gray-50 rounded-lg">
                <p>No has realizado compras aún. ¡Explora nuestros productos y realiza tu primera compra!</p>
              </div>
            )}
          </div>

          <button
            onClick={logout}
            className="mt-6 bg-secondary text-white py-3 px-4 rounded-full hover:bg-opacity-80 transition duration-300"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
}