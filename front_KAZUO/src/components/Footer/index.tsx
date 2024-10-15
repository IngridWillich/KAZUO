
"use client";
import Link from "next/link";
import { useState } from "react";
import { FaLinkedin,  FaInstagram, FaGithub } from "react-icons/fa";

type Platform = 'instagram' | 'linkedin'  | 'github';

// Definir tipo para los participantes
type Participant = {
  name: string;
  url: string;
};

export default function Footer() {
  const [dropdownOpen, setDropdownOpen] = useState<{
    instagram: boolean;
    facebook: boolean;
    linkedin: boolean;
    github: boolean;
  }>({
    instagram: false,
    facebook: false,
    linkedin: false,
    github: false,
  });

  const toggleDropdown = (platform: Platform) => {
    setDropdownOpen((prevState) => ({
      ...prevState,
      [platform]: !prevState[platform],
    }));
  };

  // Simulación de participantes por red social
  const participants: Record<Platform, Participant[]> = {
    instagram: [
      { name: "Ingrid Willich", url: "https://www.instagram.com/ingridwillich/?hl=es" },
      { name: "insta_participante2", url: "https://instagram.com/participante2" },
      { name: "insta_participante3", url: "https://instagram.com/participante3" },
    ],
    linkedin: [
      { name: "Ingrid Willich", url: "https://www.linkedin.com/in/ingrid-willich-09631b303/" },
      { name: "linkedin_participante2", url: "https://linkedin.com/participante2" },
    ],
    
    github: [
      { name: "Ingrid Willich", url: "https://github.com/IngridWillich" },
      { name: "github_participante2", url: "https://github.com/participante2" },
    ],
  };

  return (
    <footer className="bg-blue-900 text-white py-12 px-4">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-bold text-lg mb-4">Síguenos</h3>
          <div className="space-y-4">
            {Object.keys(participants).map((platform) => (
              <div key={platform}>
                <button onClick={() => toggleDropdown(platform as Platform)} className="flex items-center space-x-2">
                  {platform === "instagram" && <FaInstagram className="text-lg" />}
                  {platform === "linkedin" && <FaLinkedin className="text-lg" />}
                 {platform === "github" && <FaGithub className="text-lg" />}
                  <span>{platform.charAt(0).toUpperCase() + platform.slice(1)}</span>
                </button>
                {dropdownOpen[platform as Platform] && (
                  <ul className="mt-2 pl-4 bg-blue-800 rounded shadow-lg">
                    {participants[platform as Platform].map((participant, index) => (
                      <li key={index} className="py-1">
                        <Link href={participant.url} className="hover:underline" target="_blank">{participant.name}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
          <h4 className="font-bold mt-6 mb-2">SUSCRÍBETE</h4>
          <form className="space-y-2">
            <input type="email" placeholder="Correo" className="bg-blue-800 border-blue-700 text-white placeholder-blue-400" />
            <button type="submit" className="w-full bg-white text-blue-900 hover:bg-blue-100">Enviar</button>
          </form>
        </div>

        {/* Secciones adicionales de Kazuo, Soluciones y Recursos */}
        <div>
          <h3 className="font-bold text-lg mb-4">Kazuo</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">Quiénes somos</a></li>
            <li><a href="#" className="hover:underline">Centro de prensa</a></li>
            <li><a href="#" className="hover:underline">Ubicación</a></li>
            <li><a href="#" className="hover:underline">Trabaja con nosotros</a></li>
            <li><a href="#" className="hover:underline">Términos y condiciones</a></li>
            <li><a href="#" className="hover:underline">Kazuo fundaciones</a></li>
            <li><a href="#" className="hover:underline">Contáctanos</a></li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-bold text-lg mb-4">Soluciones</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">Sistema de gestión</a></li>
            <li><a href="#" className="hover:underline">Facturación electrónica</a></li>
            <li><a href="#" className="hover:underline">Tienda Online</a></li>
            <li><a href="#" className="hover:underline">Punto de venta</a></li>
            <li><a href="#" className="hover:underline">Alegra para contadores</a></li>
            <li><a href="#" className="hover:underline">Integraciones</a></li>
            <li><a href="#" className="hover:underline">API desarrolladores</a></li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-bold text-lg mb-4">Recursos</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">Blog</a></li>
            <li><a href="#" className="hover:underline">Mejores prácticas</a></li>
            <li><a href="#" className="hover:underline">Colores</a></li>
            <li><a href="#" className="hover:underline">Rueda de colores</a></li>
            <li><a href="#" className="hover:underline">Soporte</a></li>
            <li><a href="#" className="hover:underline">Desarrolladores</a></li>
            <li><a href="#" className="hover:underline">Biblioteca de recursos</a></li>
          </ul>
        </div>
      </div>
      
      <div className="mt-12 text-sm text-blue-300">
        <p>Al navegar en los sitios webs propiedad de Kazuo, se acepta el uso de Cookies según nuestros <a href="#" className="underline">términos y condiciones</a></p>
        <p className="mt-2">© 2024 Kazuo Project. All rights reserved.</p>
      </div>
    </footer>
  );
}
