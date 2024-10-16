import Image from 'next/image';

export default function LandingPage() {
  return (
    <div className="bg-white">
      <main className="container mx-auto px-4 py-16 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0 text-center md:text-left">
          <p className="text-sm font-medium text-gray-500 mb-4">
            SISTEMA DE GESTIÓN PARA PYMES
          </p>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-snug">
            Descubre la{' '}
            <span className="text-blue-600">Gestión Eficiente</span> con IA
            organiza tu inventario en solo 2 clics.
          </h1>
          <p className="text-gray-600 mb-8">
            Olvídate de los procesos manuales con nuestro Sistema de Gestión
            Empresarial que automatiza tu facturación, inventario, reportes y
            mucho más.
          </p>
          <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition duration-300">
            Empieza tus 15 días gratis
          </button>
          <div className="flex items-center justify-center md:justify-start mt-6">
            <div className="flex">
              {[1, 2, 3, 4].map((star) => (
                <svg
                  key={star}
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-yellow-400 fill-current"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-yellow-400"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            </div>
            <span className="ml-2 text-gray-600">4.2</span>
          </div>
        </div>

        <div className="md:w-1/2 relative">
          {/* <div className="absolute inset-0 bg-blue-100 rounded-full transform -rotate-6 scale-110 md:scale-125"></div> */}
          
          <Image src="https://www.soc.unicen.edu.ar/images/2024/Estadisticas-wp.jpg" className="rounded-3xl relative z-10" alt="logo" width={500} height={500} />
        </div>
      </main>
    </div>
  );
}
