'use client';

import React from 'react'
import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'

export default function NavBar() {
  const { isAuthenticated, logout } = useAuth()

  return (
    <nav className="bg-gradient-to-r from-blue-900 to-blue-800 text-white shadow-lg">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-3xl font-bold tracking-tight hover:text-yellow-300 transition-colors duration-300">
          Tu E-Commerce
        </Link>

        <div className="space-x-6 flex items-center">
          {/* Renderizado condicional */}
          {isAuthenticated ? (
            <>
              {/* Enlaces que se muestran cuando el usuario está autenticado */}
              <Link href="/home" className="text-lg font-medium hover:text-yellow-300 transition-colors duration-300">
                Inicio
              </Link>

              <Link href="/dashboard" className="text-lg font-medium hover:text-yellow-300 transition-colors duration-300">
                Mi Cuenta
              </Link>

              <Link href="/product" className="text-lg font-medium hover:text-yellow-300 transition-colors duration-300">
                Productos
              </Link>

              <Link href="/cart" className="text-lg font-medium hover:text-yellow-300 transition-colors duration-300">
                Carrito
              </Link>

              <button
                onClick={logout}
                className="bg-red-500 text-white px-3 py-2 rounded"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              {/* Enlaces que se muestran cuando el usuario no está autenticado */}
              <Link href="/login" className="text-lg font-medium hover:text-yellow-300 transition-colors duration-300">
                Iniciar Sesión
              </Link>
              <Link href="/register" className="bg-blue-500 text-white px-3 py-2 rounded">
                Regístrate
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
