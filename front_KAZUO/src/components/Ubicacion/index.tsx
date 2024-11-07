"use client";
import React, { useState } from "react";
import { MapPin, Globe } from "lucide-react";

const teamMembers = [
  {
    country: "Argentina",
    members: ["Defillipi Antonella", "Olmos Lautaro", "Willich Ingrid"],
    coordinates: [-38.4161, -63.6167],
  },
  {
    country: "Bolivia",
    members: ["Saul Ortiz"],
    coordinates: [-16.2902, -63.5887],
  },
  {
    country: "México",
    members: ["Arturo Guzman"],
    coordinates: [23.6345, -102.5528],
  },
  {
    country: "Colombia",
    members: ["Fredy Rigueros"],
    coordinates: [4.5709, -74.2973],
  },
];

const Ubicacion: React.FC = () => {
  const [activeCountry, setActiveCountry] = useState(teamMembers[0]);

  return (
    <div className="bg-gray-60 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl text-blue-600 font-bold mb-8 text-center">
          Nuestro Equipo Global
        </h2>
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
            <div className="relative aspect-video bg-gray-800 rounded-lg overflow-hidden">
              <iframe
                src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${activeCountry.coordinates[0]},${activeCountry.coordinates[1]}&zoom=4`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
          <div className="w-full lg:w-1/2 lg:pl-8">
            <div className="grid grid-cols-2 gap-4">
              {teamMembers.map((location) => (
                <div
                  key={location.country}
                  className={`bg-white text-gray-600 p-4 rounded-lg cursor-pointer transition-all duration-300 shadow-lg shadow-gray-500 ${
                    activeCountry.country === location.country
                      ? "ring-2 ring-blue-500"
                      : ""
                  }`}
                  onClick={() => setActiveCountry(location)}
                >
                  <div className="flex items-center mb-3">
                    <Globe className="h-5 w-5 text-blue-500 mr-2" />
                    <h3 className="text-lg font-semibold">
                      {location.country}
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {location.members.map((member) => (
                      <li key={member} className="flex items-center">
                        <MapPin className="h-4 w-4 text-blue-400 mr-2" />
                        <span>{member}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ubicacion;
