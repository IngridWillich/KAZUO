import React, { useEffect, useState } from "react";
import { FaDownload } from "react-icons/fa"; // Asegúrate de tener el icono importado

const Loader1 = () => {
  const [count, setCount] = useState(1); // Estado para el conteo

  useEffect(() => {
    // Iniciar el conteo
    const interval = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount < 100) {
          return prevCount + 1; // Incrementar el conteo
        } else {
          clearInterval(interval); // Detener el conteo al llegar a 100
          return prevCount; // Retornar el conteo final
        }
      });
    }, 100); // Actualizar cada 100 ms (0.1 segundos)

    return () => clearInterval(interval); // Limpiar el intervalo al desmontar
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-sm font-bold">Cargando... {count}</h2>
      <div className="w-full bg-gray-200 rounded mt-1 h-2">
        <div
          className="bg-blue-500 h-full rounded transition-all duration-100"
          style={{ width: `${count}%` }} // Ancho de la barra de progreso
        ></div>
      </div>
    </div>
  );
};

export default Loader1;
