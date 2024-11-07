"use client";
import Link from "next/link";
import { useState } from "react";
import { FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";

type Platform = "instagram" | "linkedin" | "github";

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
      {
        name: "Ingrid Willich",
        url: "https://www.instagram.com/ingridwillich/?hl=es",
      },
      {
        name: "Arturo Guzman",
        url: "https://www.instagram.com/arthurgantego/profilecard/?igsh=MXMwaTIzY3dzNnZleQ==",
      },
      { name: "Lautaro Olmos", url: "https://www.instagram.com/lauti.olmos/" },
      {
        name: "Fredy Rigueros",
        url: "https://www.instagram.com/fredyrigueros91",
      },
      {
        name: "Antonella Defilippi",
        url: "https://www.instagram.com/antonella.deff",
      },
    ],
    linkedin: [
      {
        name: "Ingrid Willich",
        url: "https://www.linkedin.com/in/ingrid-willich-09631b303/",
      },
      {
        name: "Arturo Guzman",
        url: "https://www.linkedin.com/in/arturo-guzm%C3%A1n-10730a269?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      },
      {
        name: "Lautaro Olmos",
        url: "https://www.linkedin.com/in/lautaroolmos/",
      },
      {
        name: "Saul Ortiz",
        url: "https://www.linkedin.com/in/saul-ortiz-1010872b5/",
      },
      {
        name: "Fredy Rigueros",
        url: "https://www.linkedin.com/in/fredy-rigueros-3a376a1b9/",
      },
      {
        name: "Antonella Defilippi",
        url: "https://www.linkedin.com/in/antonella-defilippi-b91b82289?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      },
    ],

    github: [
      { name: "Ingrid Willich", url: "https://github.com/IngridWillich" },
      { name: "Arturo Guzman", url: "https://github.com/ArturoGuzman555" },
      { name: "Lautaro Olmos", url: "https://github.com/LAUTYH" },
      { name: "Saul Ortiz", url: "https://github.com/XsporosX" },
      { name: "Fredy Rigueros", url: "https://github.com/M3CH4N1Z3D" },
      { name: "Antonella Defilippi", url: "https://github.com/antonelladeff" },
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
                <button
                  onClick={() => toggleDropdown(platform as Platform)}
                  className="flex items-center space-x-2"
                >
                  {platform === "instagram" && (
                    <FaInstagram className="text-lg" />
                  )}
                  {platform === "linkedin" && (
                    <FaLinkedin className="text-lg" />
                  )}
                  {platform === "github" && <FaGithub className="text-lg" />}
                  <span>
                    {platform.charAt(0).toUpperCase() + platform.slice(1)}
                  </span>
                </button>
                {dropdownOpen[platform as Platform] && (
                  <ul className="mt-2 pl-4 bg-blue-800 rounded shadow-lg">
                    {participants[platform as Platform].map(
                      (participant, index) => (
                        <li key={index} className="py-1">
                          <Link
                            href={participant.url}
                            className="hover:underline"
                            target="_blank"
                          >
                            {participant.name}
                          </Link>
                        </li>
                      )
                    )}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Secciones adicionales de Kazuo, Soluciones y Recursos */}
        <div>
          <h3 className="font-bold text-lg mb-4">Kazuo</h3>
          <ul className="space-y-2">
            <li>
              <a href="/Nosotros" className="hover:underline">
                Quiénes somos
              </a>
            </li>
            <li>
              <a href="/Ubicacion" className="hover:underline">
                Ubicación
              </a>
            </li>

            <li>
              <a href="/Contacto" className="hover:underline">
                Contáctanos
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-4">Soluciones</h3>
          <ul className="space-y-2">
            <li>
              <a href="/Soluciones" className="hover:underline">
                Sistema de gestión
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-4">Recursos</h3>
          <ul className="space-y-2">
            <li>
              <a href="/Contacto" className="hover:underline">
                Soporte
              </a>
            </li>
            <li>
              <a href="/Sobre Nosotros" className="hover:underline">
                Desarrolladores
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-12 text-sm text-blue-300">
        <p>
          Al navegar en los sitios webs propiedad de Kazuo, se acepta el uso de
          Cookies según nuestros{" "}
          <a href="#" className="underline">
            términos y condiciones
          </a>
        </p>
        <p className="mt-2">© 2024 Kazuo Project. All rights reserved.</p>
      </div>
    </footer>
  );
}
