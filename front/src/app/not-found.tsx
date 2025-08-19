"use client"

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Suspense } from 'react';
import {  useSearchParams } from 'next/navigation';

export default function NotFound() {
return (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <Suspense fallback={<div>Cargando...</div>}>
  <NotFoundContent />
    </Suspense>
  </div>
);
}

 function NotFoundContent() {
  const { isAuthenticated } = useAuth();
  const searchParams = useSearchParams();

  const fromProducts = searchParams.get('from') === 'products';
  const showLoginMessage = !isAuthenticated && fromProducts;



  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {showLoginMessage ? (
        <>
        <h1 className="text-4xl font-bold mb-4 text-black">Acceso restringido</h1>
        <h2 className="text-2xl mb-4 text-black">Debes iniciar sesión para acceder a la compra de productos</h2>
        <Link href="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Iniciar sesión
        </Link>
        </>
      ) : (
        <>
      <h1 className="text-6xl font-bold mb-4 text-black">404</h1>
      <h2 className="text-2xl mb-4 text-black">Página no encontrada</h2>
      <p className="mb-4 text-black">Lo sentimos, la página que estás buscando no existe.</p>
      <Link href="/home" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Volver al inicio
      </Link>
        </>
      )}
    </div>
  );
}