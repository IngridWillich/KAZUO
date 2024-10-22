"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function Navbar() {
  const { isLoggedIn, logout } = useAppContext();
  const router = useRouter();

  const handleLogout =async  () => {
        const result = await Swal.fire({
        title: "¿Estás seguro que quieres cerrar sesión?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, cerrar sesión",
        cancelButtonText: "Cancelar",
      });

      if (result.isConfirmed) {
        logout();
        router.push("/");
      }
    };
    const handleOnClick =  (route: string) => {
      router.push(route);
    };

  return (
    <header className="container mx-auto px-4 py-6 flex items-center justify-between">
      <nav className="flex items-center space-x-6">
      <Link href="/" className="text-blue-600 font-medium">
      Inicio
      </Link>
        <Link href="/Soluciones" className="text-blue-600 font-medium">
          Soluciones
        </Link>
        <Link href="/Planes" className="text-gray-600">
          Planes
        </Link>
        <Link href="/Contacto" className="text-gray-600">
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
          <>
          <button onClick={handleLogout} className="px-4 py-2 text-gray-600">
            Cerrar sesión
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md" onClick={() => handleOnClick("/GestionInventario")}>
          Gestion de inventario
          </button>
          </>
        ) : (
          <>
            <Link href="/Login" className="px-4 py-2 text-gray-600">
              Iniciar sesión
            </Link>
            <Link
              href="/Register"
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
