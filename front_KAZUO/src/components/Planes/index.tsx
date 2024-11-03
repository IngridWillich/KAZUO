"use client"
import Stripe from "stripe";
import ButtonCheckout from "../ButtonCheckout";

async function loadPrices() {
  // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/prices`);
  // if (!res.ok) {
  //   throw new Error("Failed to fetch prices");
  // }
  // const prices = await res.json();
  // return prices;
     const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  
    // Listar todos los precios
    const prices = await stripe.prices.list({
      expand: ['data.product'], // Expandimos los productos para acceder a sus propiedades
    });
  
    // Filtrar los precios que están activos y cuyos productos también estén activos
    const activePrices = prices.data.filter(
      (price) => price.active && price.product && (price.product as Stripe.Product).active
    );
  
    // Ordenar por unit_amount
    const sortedPrices = activePrices.sort((a, b) => a.unit_amount! - b.unit_amount!);
    
    return sortedPrices;
}

export default async function Planes() {
  const prices = await loadPrices();
  return (
    <div className="flex justify-center max-w-screen-lg mx-auto my-16 px-4 sm:px-6 lg:px-8">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 animate-fade-in">
        {prices &&
          prices.map((price: any) => (
            <div
              key={price.id}
              className="bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg shadow-lg p-6 transition-transform duration-300 transform hover:scale-105"
            >
              <div className="text-center">
                <h3 className="font-semibold text-lg sm:text-xl md:text-2xl lg:text-3xl text-center uppercase mb-4">
                  {price.nickname}
                </h3>
                <h2 className="font-extrabold text-4xl lg:text-5xl mb-6">
                  ${(price.unit_amount! / 100).toFixed(2)}
                </h2>
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
              <ButtonCheckout priceId={price.id} />
              <p className="mt-6 text-center text-gray-200 text-sm animate-pulse">
                Descarga la app y lleva tu gestión a donde vayas
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}
