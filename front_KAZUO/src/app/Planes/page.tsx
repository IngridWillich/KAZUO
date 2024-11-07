import Planes from "@/components/Planes";
import Link from "next/link";

function planes() {
  return (
    <div className="container mx-auto px-4 mb-10">
      <h1 className="text-3xl text-center my-8 font-extrabold text-blue-700">
        ¡Lleva tu empresa al siguiente nivel!
      </h1>
      <section className="bg-blue-600 flex flex-col lg:flex-row justify-around items-center lg:items-start border border-spacing-32 border-green-500 rounded-2xl p-6 lg:p-10">
        <div className="w-full lg:w-1/2 mb-10 lg:mb-0">
          <h2 className="text-white font-extrabold text-3xl lg:text-4xl w-full lg:w-80 mt-8">
            Potencia tu negocio con más supervelocidad
          </h2>
          <p className="text-gray-300 font-light w-full lg:w-96 mb-6 mt-2">
            Con Kazuo tienes todas las herramientas para automatizar cada
            proceso empresarial. Fácil, rápido y siempre en la nube.
          </p>
          <div className="flex flex-col lg:flex-row items-center lg:items-baseline w-full bg-gradient-to-r from-green-600 to-green-800 text-white py-4 px-6 rounded-xl text-center lg:text-left font-semibold shadow-md">
            <div className="mb-4 lg:mb-0 lg:mr-4">
              <h2 className="text-xl mb-2">¿Tienes dudas?</h2>
              <p className="font-light max-w-[400px]">
                Comunícate gratis con nuestro equipo especializado, te están
                esperando.
              </p>
            </div>
            <Link href={"/Contacto"}>
              <button className="mt-3 transition-transform duration-300 hover:scale-105 px-6 py-3 rounded-lg bg-white text-green-700 text-sm hover:bg-blue-700 hover:text-white ease-in-out">
                Contáctanos
              </button>
            </Link>
          </div>
        </div>
        <div className="w-full lg:w-1/2 mt-10 lg:mt-0">
          <Planes />
        </div>
      </section>
      <div></div>
    </div>
  );
}

export default planes;
