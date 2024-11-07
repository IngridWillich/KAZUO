"use client";
import { useState } from "react";
import Link from "next/link";

import { FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";

type Platform = "instagram" | "linkedin" | "github";
type Participant = { name: string; url: string };

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
    { name: "Lautaro Olmos", url: "https://www.linkedin.com/in/lautaroolmos/" },
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

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [dropdownOpen, setDropdownOpen] = useState<Record<Platform, boolean>>({
    instagram: false,
    linkedin: false,
    github: false,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Formulario enviado:", formData);
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  const toggleDropdown = (platform: Platform) => {
    setDropdownOpen((prevState) => ({
      ...prevState,
      [platform]: !prevState[platform],
    }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">
          Contáctanos
        </h1>

        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 p-6 bg-blue-600 text-white">
              <h2 className="text-2xl font-semibold mb-4">
                Conéctate con Kazuo
              </h2>
              <p className="mb-4">
                Estamos desarrollando soluciones innovadoras para el control de
                inventario. Nos encantaría escuchar tus ideas y necesidades.
              </p>

              <div className="mb-4">
                <h3 className="font-semibold mb-2">Comunidad:</h3>
                <p>
                  Únete a nuestra comunidad de desarrolladores y usuarios en
                  Discord para discusiones en tiempo real y soporte.
                </p>
              </div>
              <div className="mb-4">
                <h3 className="font-semibold mb-2">
                  Síguenos en redes sociales:
                </h3>
                <div className="space-y-4">
                  {(Object.keys(participants) as Platform[]).map((platform) => (
                    <div key={platform}>
                      <button
                        onClick={() => toggleDropdown(platform)}
                        className="flex items-center space-x-2 text-white hover:text-blue-200"
                      >
                        {platform === "instagram" && (
                          <FaInstagram className="text-lg" />
                        )}
                        {platform === "linkedin" && (
                          <FaLinkedin className="text-lg" />
                        )}
                        {platform === "github" && (
                          <FaGithub className="text-lg" />
                        )}
                        <span>
                          {platform.charAt(0).toUpperCase() + platform.slice(1)}
                        </span>
                      </button>
                      {dropdownOpen[platform] && (
                        <ul className="mt-2 pl-4 bg-blue-700 rounded shadow-lg">
                          {participants[platform].map((participant, index) => (
                            <li key={index} className="py-1">
                              <Link
                                href={participant.url}
                                className="hover:underline text-blue-100"
                                target="_blank"
                              >
                                {participant.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-8 p-6 rounded-lg text-center">
                <p className=" text-white ">
                  Tambien podes descargar nuestra App
                </p>
                <div className="flex justify-center">
                  <img
                    src="https://play.google.com/intl/en_us/badges/images/generic/en_badge_web_generic.png?hl=es-419"
                    alt="Google Play"
                    className="h-10 mt-5 mx-2"
                  />
                  <img
                    src="https://www.pngarts.com/files/8/App-Store-Logo-Transparent-Images.png"
                    alt="App Store"
                    className="h-20 mx-2"
                  />
                </div>
              </div>
            </div>
            <div className="md:w-1/2 p-6">
              <h2 className="text-2xl font-semibold mb-4 text-blue-600">
                Envíanos un Mensaje
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-gray-700 font-semibold mb-2"
                  >
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-gray-700 font-semibold mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="subject"
                    className="block text-gray-700 font-semibold mb-2"
                  >
                    Asunto
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Selecciona un asunto</option>
                    <option value="feedback">Feedback de la aplicación</option>
                    <option value="feature">Sugerencia de Funcionalidad</option>
                    <option value="partnership">
                      Propuesta de Colaboración
                    </option>
                    <option value="otro">Otro</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="message"
                    className="block text-gray-700 font-semibold mb-2"
                  >
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
                >
                  Enviar Mensaje
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
