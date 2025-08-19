'use client'

import React, { useState } from 'react'
import Button from "@/components/UI/Button"
import Input from "@/components/UI/Input"
import Label from "@/components/UI/Label"
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [loading, setLoading] = useState(false) // Estado de carga
  const router = useRouter()
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}
    if (!formData.email) {
      newErrors.email = 'El email es requerido'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido'
    }
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setLoading(true) // Mostrar loader mientras se hace la petición
    setErrors({})
    

    try {
      const response = await fetch(`${apiUrl}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        const { token } = data

        // Almacenar el token en localStorage (o sessionStorage)
        localStorage.setItem('token', token)

        login();
        // Redirigir al usuario al dashboard o página protegida
        router.push('/dashboard')
        
        setLoading(false)

      } else {
        const errorData = await response.json()
        setErrors({ form: errorData.message || 'Error en el inicio de sesión' })
        setLoading(false)
      }
    } catch (error) {
      console.log(error);
      setErrors({ form: 'Hubo un error en el servidor' })
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-900">Iniciar Sesión</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Mostrar mensaje de error global */}
          {errors.form && (
            <p className="text-sm text-red-500 text-center">
              {errors.form}
            </p>
          )}

          <div className="space-y-2 text-black space-x-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="tu@email.com"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
          </div>

          <div className="space-y-2 text-black space-x-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? "border-red-500" : ""}
            />
            {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
          </div>

          {/* Botón de inicio de sesión */}
          <Button type="submit" className="w-full text-black" disabled={loading}>
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </Button>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            ¿No tienes una cuenta?{' '}
            <a href="/register" className="text-blue-600 hover:underline">
              Regístrate
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
