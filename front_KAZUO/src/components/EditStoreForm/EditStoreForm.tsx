"use client";

import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { ICategory, IEditStoreProps } from "@/interfaces/types";
import Loader from "../Loader/Loader";

const EditStoreForm: React.FC<IEditStoreProps> = ({ storeId }) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState<ICategory[]>([]);
  const kazuo_back = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();

  useEffect(() => {
    const categoriesFromStorage: ICategory[] = JSON.parse(
      localStorage.getItem("Categorias") || "[]"
    );
    setCategories(categoriesFromStorage);

    const fetchStoreData = async () => {
      try {
        const response = await fetch(`${kazuo_back}/store/${storeId}`);
        if (response.ok) {
          const storeData = await response.json();
          setName(storeData.name);
          setSelectedCategory(storeData.categoryName);
        }
      } catch (error) {
        console.error("Error al obtener datos de la tienda:", error);
      }
    };

    fetchStoreData();
  }, [storeId]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const handleNombreBodegaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    const userId = userData.id;

    const dataStore = {
      name,
      categoryName: selectedCategory,
      userId,
    };

    try {
      setLoading(true);
      const response = await fetch(`${kazuo_back}/store/${storeId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        },
        body: JSON.stringify(dataStore),
      });
      console.log(userData.token);
      if (response.ok) {
        Swal.fire({
          title: "¡Bodega actualizada!",
          text: "La bodega se ha actualizado correctamente.",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
        router.push("/GestionInventario");
      } else {
        throw new Error("Error en la actualización de la bodega");
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "No se pudo actualizar la bodega. Por favor, inténtalo de nuevo.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    } finally {
      setLoading(false);
    }
  };
  const isButtonDisabled = !name || !selectedCategory;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-blue-700">
          Actualizar Bodega
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Nuevo nombre de la Bodega:
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

          <div className="space-y-2">
            <label
              htmlFor="categoryName"
              className="block text-sm font-medium text-gray-700"
            >
              Seleccione la nueva categoría:
            </label>
            <select
              name="categoryName"
              id="category"
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Selecciona una categoría</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            disabled={isButtonDisabled}
            className={`flex items-center justify-center w-full py-2 px-4 text-white ${
              isButtonDisabled ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-900"
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-md`}
          >
            {loading ? <Loader /> : "Actualizar bodega"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditStoreForm;
