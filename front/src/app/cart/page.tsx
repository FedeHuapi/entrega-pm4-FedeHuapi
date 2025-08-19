"use client"; 

import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function Cart() {
  const { isAuthenticated } = useAuth();
  const { cartItems, removeFromCart, clearCart, updateQuantity } = useCart();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login'); // Redirige a login si no está autenticado
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return <div>Cargando...</div>; // Mensaje temporal mientras redirige
  }

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      alert('El carrito está vacío');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No estás autenticado');

      const response = await fetch(`${apiUrl}/orders`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: JSON.parse(atob(token.split('.')[1])).userId, // Extrae userId del token
          products: cartItems.map(item => item.productId),
        }),
      });

      if (!response.ok) throw new Error('Error al crear la orden');

      const order = await response.json();
      alert(`Compra realizada con éxito. Orden #${order.id}`);
      clearCart(); // Limpia el carrito después de la compra
      router.push('/dashboard'); // Redirige al Dashboard para ver el historial
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error desconocido');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="bg-background min-h-screen py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8 text-text">Carrito de Compras</h1>
          <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-500">
            <p>Tu carrito está vacío. ¡Explora nuestros productos y añade algunos!</p>
            <button
              onClick={() => router.push('/product')}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Ver productos
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-text">Carrito de Compras</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center mb-4 pb-4 border-b">
              <span className="font-semibold text-text">{item.name}</span>
              <div className="flex items-center space-x-4">
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.productId, parseInt(e.target.value) || 1)}
                  min="1"
                  max="1"
                  className="w-16 p-1 border rounded"
                />
                <span className="text-primary font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                <button
                  onClick={() => removeFromCart(item.productId)}
                  className="text-red-500 hover:text-red-700"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
          <div className="flex justify-between items-center mt-6 pt-6 border-t">
            <span className="text-2xl font-bold text-text">Total:</span>
            <span className="text-2xl font-bold text-primary">${total.toFixed(2)}</span>
          </div>
          <button
            onClick={handleCheckout}
            className="mt-8 w-full bg-secondary text-white py-3 rounded-full hover:bg-opacity-80 transition duration-300"
          >
            Proceder al pago
          </button>
        </div>
      </div>
    </div>
  );
}