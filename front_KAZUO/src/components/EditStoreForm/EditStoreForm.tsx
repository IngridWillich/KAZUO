














"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { ICategory } from "@/interfaces/types";

const EditStoreForm = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [storeId, setStoreId] = useState<string>("");
  const [categoriesFromStorage, setCategoriesFromStorage] = useState<ICategory[]>([]); // Estado para almacenar las categorías
  const kazuo_back = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();

  useEffect(() => {
    const handleFetchCategories = async () => {
      try {
        const response = await fetch(`${kazuo_back}/category`);
        const dataCategory = await response.json();
        localStorage.setItem("Categorias", JSON.stringify(dataCategory));
        setCategoriesFromStorage(dataCategory); // Almacena en el estado
      } catch (error) {
        console.log(error);
      }
    };

    // Solo se ejecuta en el cliente
    if (typeof window !== "undefined") {
      handleFetchCategories();

      const storeData = JSON.parse(localStorage.getItem("StoreToEdit") || "{}");
      if (storeData && storeData.id && storeData.name && storeData.categoryName) {
        setStoreId(storeData.id || ""); // Asegura que nunca sea undefined
        setName(storeData.name || ""); // Asegura que nunca sea undefined
        setSelectedCategory(storeData.categoryName || ""); // Asegura que nunca sea undefined
      }

      const storedCategories = JSON.parse(localStorage.getItem("Categorias") || "[]");
      setCategoriesFromStorage(storedCategories);
    }
  }, [kazuo_back]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const handleNombreBodegaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const dataStore = {
    //   id: storeId,
      name,
      categoryName: selectedCategory,
    };

    try {
      const response = await fetch(`${kazuo_back}/store/${storeId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataStore),
     
      });
 
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
    }
    finally {console.log(dataStore)}
  };

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
            className="w-full py-2 px-4 text-white bg-blue-500 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-md"
          >
            Actualizar Bodega
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditStoreForm;














// "use client";

// import { useEffect, useState } from "react";
// import Swal from "sweetalert2";
// import { useRouter } from "next/navigation";
// import { ICategory } from "@/interfaces/types";

// const EditStoreForm = () => {
//   const [selectedCategory, setSelectedCategory] = useState<string>("");
//   const [name, setName] = useState<string>("");
//   const [storeId, setStoreId] = useState<string>(""); // Almacena el ID de la bodega a actualizar
//   const kazuo_back = process.env.NEXT_PUBLIC_API_URL;
//   const router = useRouter();

//   useEffect(() => {
//     const handleFetchCategories = async () => {
//       try {
//         const response = await fetch(`${kazuo_back}/category`);
//         const dataCategory = await response.json();
//         localStorage.setItem("Categorias", JSON.stringify(dataCategory));
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     // Fetch categories on component mount
//     handleFetchCategories();

//     // Fetch store data for updating
//     const storeData = JSON.parse(localStorage.getItem("StoreToEdit") || "{}");
//     if (storeData) {
//       setStoreId(storeData.id);
//       setName(storeData.name);
//       setSelectedCategory(storeData.categoryName);
//     }
//   }, [kazuo_back]);

//   const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setSelectedCategory(e.target.value);
//   };

//   const handleNombreBodegaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setName(e.target.value);
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const dataStore = {
//       id: storeId,
//       name,
//       categoryName: selectedCategory,
//     };

//     try {
//         const response = await fetch(`${kazuo_back}/store/${storeId}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(dataStore),
//       });

//       if (response.ok) {
//         Swal.fire({
//           title: "¡Bodega actualizada!",
//           text: "La bodega se ha actualizado correctamente.",
//           icon: "success",
//           confirmButtonText: "Aceptar",
//         });
//         router.push("/GestionInventario");
//       } else {
//         throw new Error("Error en la actualización de la bodega");
//       }
//     } catch (error) {
//       Swal.fire({
//         title: "Error",
//         text: "No se pudo actualizar la bodega. Por favor, inténtalo de nuevo.",
//         icon: "error",
//         confirmButtonText: "Aceptar",
//       });
//     }
//   };

//   const categoriesFromStorage: ICategory[] = JSON.parse(localStorage.getItem("Categorias") || "[]");

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
//       <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
//         <h2 className="text-2xl font-bold text-center text-blue-700">
//           Actualizar Bodega
//         </h2>
//         <form className="space-y-6" onSubmit={handleSubmit}>
//           {/* Campo para el nombre de la bodega */}
//           <div className="space-y-2">
//             <label
//               htmlFor="name"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Nombre de la Bodega:
//             </label>
//             <input
//               type="text"
//               name="name"
//               id="name"
//               value={name}
//               onChange={handleNombreBodegaChange}
//               className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//               placeholder="Ingrese el nombre de la bodega"
//             />
//           </div>

//           {/* Desplegable para seleccionar categoría */}
//           <div className="space-y-2">
//             <label
//               htmlFor="categoryName"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Seleccione su categoría:
//             </label>
//             <select
//               name="categoryName"
//               id="categoryName"
//               value={selectedCategory}
//               onChange={handleCategoryChange}
//               className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//             >
//               <option value="" disabled>
//                 Seleccione una categoría
//               </option>
//               {categoriesFromStorage.map((category: ICategory) => (
//                 <option key={category.id} value={category.name}>
//                   {category.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <button
//             type="submit"
//             className="w-full py-2 px-4 text-white bg-blue-500 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-md"
//           >
//             Actualizar Bodega
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditStoreForm;
