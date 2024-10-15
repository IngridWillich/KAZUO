"use client"
import Link from 'next/link'

export default function Navbar() {
  return (
    <header className="container mx-auto px-4 py-6 flex items-center justify-between">
      <nav className="flex items-center space-x-6">
        <Link href="#" className="text-blue-600 font-medium">
          Soluciones
        </Link>
        <Link href="#" className="text-gray-600">
          Planes
        </Link>
        <Link href="#" className="text-gray-600">
          Contacto
        </Link>
      </nav>
      <div className="flex items-center space-x-4">
        <button className="px-4 py-2 bg-blue-100 text-blue-600 rounded-md">
          Nosotros
        </button>
        <button className="px-4 py-2 text-gray-600">Iniciar sesión</button>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md">
          Registrarme
        </button>
      </div>
    </header>
  )
}