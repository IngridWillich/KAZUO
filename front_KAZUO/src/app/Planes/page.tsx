import Planes from "@/components/Planes";
import ProtectedRoutes from "@/context/ProtectedRoutes";
import Link from "next/link";

function planes() {
  return (
    <div className="container mx-auto px-4 mb-10">
        <h1 className="text-3xl text-center my-8 font-extrabold text-blue-700">
          ¡Lleva tu empresa al siguiente nivel!
        </h1>
        <section className="bg-blue-600 flex justify-around align-baseline border border-spacing-32 border-green-500 rounded-2xl">
          <div className="mt-20">
            <h2 className="text-white font-extrabold text-4xl w-80 mt-8">
              Potencia tu negocio con más supervelocidad
            </h2>
            <p className="text-gray-300 font-light w-96 mb-6 mt-2">
              Con Kazuo tienes todas las herramientas para automatizar cada
              proceso empresarial. Fácil, rápido y siempre en la nube.
            </p>
            <div className="flex align-baseline w-full bg-gradient-to-r from-green-600 to-green-800 text-white py-2 rounded-xl text-center font-semibold shadow-md">
              <div>
                <h2 className="flex justify-start text-xl ml-4">
                  ¿Tienes dudas?
                </h2>
                <p className="flex justify-start font-light max-w-[400px] text-left ml-4">
                  Comunícate gratis con nuestro equipo especializado, te están
                  esperando.
                </p>
              </div>
              <Link href={"/Contacto"}>
                <div>
                  <button className="mt-3 mr-4 ml-3 transition-transform duration-300 hover:scale-105 pl-3 pr-3 pt-4 pb-4 rounded-lg bg-white text-green-700 text-sm hover:bg-blue-700 hover:to-blue-900 ease-in-out">
                    Contactanos
                  </button>
                </div>
              </Link>
            </div>
          </div>
          <div className="mt-10 mb-10">
            <Planes />
          </div>
        </section>
        <div></div>
    </div>
  );
}

export default planes;
