
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import './globals.css'; 

export const metadata = {
  title: 'Tu E-Commerce',
  description: 'Una tienda en línea creada con Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="flex flex-col min-h-screen font-sans antialiased text-gray-800  bg-gray-50 overflow-x-hidden">
        <AuthProvider>
          <CartProvider>
        <Navbar />
        <main className="flex-grow w-full">
          {children}
        </main>
        <Footer />
        </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}