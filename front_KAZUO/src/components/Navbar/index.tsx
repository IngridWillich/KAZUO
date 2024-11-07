"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { Menu, X, Globe } from "lucide-react";
import "@fortawesome/fontawesome-free/css/all.min.css";

interface AuthButtonsProps {
  isLoggedIn: boolean;
  handleLogout: () => void;
  handleOnClick: (route: string) => void;
}

export default function Navbar() {
  const { isLoggedIn, logout } = useAppContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
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
      router.push("/Login");
    }
  };

  const handleOnClick = (route: string) => {
    router.push(route);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between">
        <button className="lg:hidden" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <nav className="hidden lg:flex items-center space-x-6">
          <NavLinks />
        </nav>
        <div className="hidden lg:flex items-center space-x-4">
          <AuthButtons
            isLoggedIn={isLoggedIn}
            handleLogout={handleLogout}
            handleOnClick={handleOnClick}
          />
        </div>
      </div>
      {isMenuOpen && (
        <div className="lg:hidden mt-4">
          <nav className="flex flex-col space-y-4">
            <NavLinks />
          </nav>
          <div className="mt-4 flex flex-col space-y-4">
            <AuthButtons
              isLoggedIn={isLoggedIn}
              handleLogout={handleLogout}
              handleOnClick={handleOnClick}
            />
          </div>
        </div>
      )}
    </header>
  );
}

function NavLinks() {
  return (
    <>
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
      <Link href="/Nosotros" className="text-gray-600">
        Nosotros
      </Link>
      <Link href="/GoogleTranslate " className="text-gray-600">
        <i className="fa fa-globe fa-1.7x" aria-hidden="true"></i> Traducir
      </Link>
    </>
  );
}

function AuthButtons({
  isLoggedIn,
  handleLogout,
  handleOnClick,
}: AuthButtonsProps) {
  return (
    <>
      {isLoggedIn ? (
        <>
          <button
            onClick={handleLogout}
            className="w-full lg:w-auto px-4 py-2 text-gray-600"
          >
            Cerrar sesión
          </button>
          <button
            className="w-full lg:w-auto px-4 py-2 bg-blue-600 text-white rounded-md"
            onClick={() => handleOnClick("/GestionInventario")}
          >
            Gestion de inventario
          </button>
        </>
      ) : (
        <>
          <Link
            href="/Login"
            className="w-full lg:w-auto px-4 py-2 text-gray-600"
          >
            Iniciar sesión
          </Link>
          <Link
            href="/Register"
            className="w-full lg:w-auto px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Registrarme
          </Link>
        </>
      )}
    </>
  );
}
