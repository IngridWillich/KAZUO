"use client";

import { useEffect, useState } from "react";
import ButtonCheckout from "../ButtonCheckout";

import { useAppContext } from "@/context/AppContext";

interface Price {
  id: string;
  nickname: string;
  unit_amount: number;
  currency: string;
  interval: string;
}

export default function Planes() {
  const [prices, setPrices] = useState<Price[]>([]);

  const { userData } = useAppContext();

  useEffect(() => {
    async function fetchPrices() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/stripe/prices`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch prices");
        }
        const fetchedPrices = await res.json();
        setPrices(fetchedPrices);
      } catch (error) {
        console.error("Error fetching prices:", error);
      }
    }

    fetchPrices();
  }, []);

  return (
    <div className="max-w-screen px-4 sm:px-6 lg:px-8">
      <div className="animate-fade-in">
        {prices.map((price: Price) => (
          <div
            key={price.id}
            className="bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg shadow-lg p-6 transition-transform duration-300 transform hover:scale-105"
          >
            <div className="text-center">
              <h3 className="font-semibold text-lg sm:text-xl md:text-2xl lg:text-3xl text-center uppercase mb-4">
                {price.nickname}
              </h3>
              <h2 className="font-extrabold text-4xl lg:text-5xl mb-6">
                ${(price.unit_amount / 100).toFixed(2)}{" "}
                {price.currency.toUpperCase()}
              </h2>

              {/* <p className="text-sm mb-4">Facturación {price.interval}</p> */}
            </div>
            <ul className="text-sm md:text-base space-y-3 mb-8">
              <li className="flex items-center space-x-2">
                <span className="text-green-300 font-bold">✔</span>
                <span>Crea y gestiona bodegas</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-green-300 font-bold">✔</span>
                <span>Crea equipos y agrega empleados</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-green-300 font-bold">✔</span>
                <span>Gestión completa de inventario</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-green-300 font-bold">✔</span>
                <span>Importa productos con Excel</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-green-300 font-bold">✔</span>
                <span>Escanea códigos de barras para eliminar productos</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-green-300 font-bold">✔</span>
                <span>Gestión de productos por empleados</span>
              </li>
            </ul>

            <ButtonCheckout priceId={price.id} userEmail={userData?.email!} />
            <p className="mt-6 text-center text-gray-200 text-sm animate-pulse duration-1000">
              Descarga la app y lleva tu gestión a donde vayas
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
