"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { isLoggedIn, logout } = useAppContext();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

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
        <Link
          href="/Nosotros"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-500 transition duration-300"
        >
          Nosotros
        </Link>
        {isLoggedIn ? (
          <button onClick={handleLogout} className="px-4 py-2 text-gray-600">
            Cerrar sesión
          </button>
        ) : (
          <>
            <Link href="/login" className="px-4 py-2 text-gray-600">
              Iniciar sesión
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Registrarme
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
