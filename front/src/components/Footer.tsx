"use client";

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

const Footer = () => {
    const { isAuthenticated } = useAuth();
    console.log('isAuthenticated:', isAuthenticated);

    if (isAuthenticated === undefined) {
      return (
        <footer className="bg-primary text-white mt-12">
          <div className="container mx-auto px-4 py-8">
            <p>Error de autenticación. Contacta al soporte.</p>
          </div>
        </footer>
      );
    }

    return (
<footer className="bg-primary text-white mt-12">
  <div className="container mx-auto px-4 py-8">
    <div className="flex flex-wrap justify-between">
      <div className="w-full md:w-1/3 mb-6 md:mb-0">
        <h3 className="text-xl font-bold mb-4">Tu E-Commerce</h3>
        <p>Ofreciendo los mejores productos desde 2024.</p>
      </div>
      <div className="w-full md:w-1/3 mb-6 md:mb-0">
        <h3 className="text-xl font-bold mb-4">Enlaces rápidos</h3>
        <ul>
          <li><Link href="/home" className="hover:text-secondary">Inicio</Link></li>
          <li>
            {isAuthenticated ? (
              <Link href="/product" className="hover:text-secondary">Productos</Link>
            ) : (
              <Link href="/not-found?from=products" className="hover:text-secondary">Productos</Link>
            )}
            </li>
          <li><Link href="/about" className="hover:text-secondary">Acerca de</Link></li>
        </ul>
      </div>
      <div className="w-full md:w-1/3">
        <h3 className="text-xl font-bold mb-4">Contáctanos</h3>
        <p>Email: info@miecommerce.com</p>
        <p>Teléfono: (123) 456-7890</p>
      </div>
    </div>
    <div className="mt-8 pt-8 border-t border-white text-center">
      <p>© 2024 Tu E-Commerce. Todos los derechos reservados.</p>
    </div>
  </div>
</footer>
    );
};
  
  export default Footer;