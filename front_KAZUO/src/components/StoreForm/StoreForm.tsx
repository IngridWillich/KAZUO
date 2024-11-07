"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { ICategory } from "@/interfaces/types";
import Loader from "../Loader/Loader";
import { useAppContext } from "@/context/AppContext";

export const StoreForm = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState<string>("");
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true); // Estado para habilitar/deshabilitar el botón
  const kazuo_back = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
  const { userData} = useAppContext();

  const categoriesFromStorage: ICategory[] =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("Categorias") || "[]")
      : [];

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const handleNombreBodegaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  // Verifica si los campos están completos para habilitar el botón
  useEffect(() => {
    setIsButtonDisabled(!(name && selectedCategory));
  }, [name, selectedCategory]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 
    
    const userId = userData?.id || "";
    const companyIds = userData?.company ? [userData.company] : [];
    

    const dataStore = {
      name,
      categoryName: selectedCategory,
      userId,
      companyIds,
    };
    console.log(dataStore);

    try {
      setLoading(true);
      const response = await fetch(`${kazuo_back}/store/bodega/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataStore),
      });

      console.log(dataStore);

      if (response.ok) {
        Swal.fire({
          title: "¡Bodega creada!",
          text: "La bodega se ha creado correctamente.",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
        router.push("/GestionInventario");
      } else {
        throw new Error("Error en la creación de la bodega");
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "No se pudo crear la bodega. Por favor, inténtalo de nuevo.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    } finally {
      setLoading(false); // Desactiva el loader
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-blue-700">
          Crear Bodega
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Campo para el nombre de la bodega */}
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Nombre de la Bodega:
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={handleNombreBodegaChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Ingrese el nombre de la bodega"
            />
          </div>

          {/* Desplegable para seleccionar categoría */}
          <div className="space-y-2">
            <label
              htmlFor="categoryName"
              className="block text-sm font-medium text-gray-700"
            >
              Seleccione su categoría:
            </label>
            <select
              name="categoryName"
              id="categoryName"
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="" disabled>
                Seleccione una categoría
              </option>
              {categoriesFromStorage.map((category: ICategory) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={isButtonDisabled} // Deshabilita el botón si isButtonDisabled es true
            className={`w-full py-2 px-4 text-white ${
              isButtonDisabled ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-900"
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-md flex items-center justify-center`}
          >
            {loading ? <Loader /> : "Crear Bodega"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default StoreForm;
