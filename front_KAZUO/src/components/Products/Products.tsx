"use client";
import { IEditStoreProps, IProduct } from "@/interfaces/types";
import { useEffect, useState, useRef } from "react";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { faTrash} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Products: React.FC<IEditStoreProps> = ({ storeId }) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("stock");
  const [products, setProducts] = useState<IProduct[]>([]);
  const [currencySettings, setCurrencySettings] = useState<{ [key: string]: string }>({});
  const [lowStockProducts, setLowStockProducts] = useState<IProduct[]>([]);
  const { userData } = useAppContext();
  const kazuo_back = process.env.NEXT_PUBLIC_API_URL;

  // Tasas de cambio (simuladas)
  const exchangeRates: { [key: string]: number } = {
    USD: 1,
    EUR: 0.85,
    MXN: 20,
    ARS: 365,
  };

  // Convierte el precio de acuerdo a la moneda seleccionada
  const convertPrice = (price: number, currency: string) => {
    return (price * (exchangeRates[currency] || 1)).toFixed(2);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${kazuo_back}/products/store/${storeId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${userData?.token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Error al obtener los productos");
        }

        const data = await response.json();
        const sortedProducts = data.sort((a: IProduct, b: IProduct) => 
          a.name.localeCompare(b.name)
        );
        // setProducts(sortedProducts);
        setProducts(data);
      } catch (error) {
        console.error("Error:", error);
        setProducts([]);
      }
    };

    if (userData?.token) {
      fetchProducts();
    }
  }, [userData]);

  useEffect(() => {
    const filterLowStockProducts = () => {
      const lowStock = products.filter(
        (product) => Number(product.quantity) <= Number(product.minStock)
      );
      setLowStockProducts(lowStock);
    };

    filterLowStockProducts();
  }, [products]);
  

  const handleCreateNewProduct = () => {
    router.push(`/AddNewProduct/${storeId}`);
  };

  const handleCurrencyChange = (productId: string, newCurrency: string) => {
    setCurrencySettings((prev) => ({
      ...prev,
      [productId]: newCurrency,
    }));
  };

  return (
    <div className="min-h-screen flex flex-col justify-center">
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="rounded-md p-8 md:w-2/3 mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Aquí va el nombre de la bodega</h2>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded" onClick={() => {}}>
              Generar Informe
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded" onClick={handleCreateNewProduct}>
              Agregar Producto
            </button>
          </div>

          <div className="mb-4">
            <div className="flex space-x-4 border-b pb-2">
              <button
                className={`py-2 px-4 ${activeTab === "stock" ? "border-b-2 border-blue-600" : ""}`}
                onClick={() => setActiveTab("stock")}
              >
                Stock
              </button>
              {/* <button
                className={`py-2 px-4 ${
                  activeTab === "low" ? "border-b-2 border-blue-600" : ""
                }`}
                onClick={() => setActiveTab("low")}
              >
                Bajo Stock
              </button> */}
            </div>
          </div>

          {activeTab === "stock" && (
            <div className="mt-4">
              <div className="bg-gray-100 rounded-md p-4">
                <div className="grid grid-cols-5 font-medium border-b pb-2">
                  <span className="text-center">Nombre</span>
                  <span className="text-center">Cantidad</span>
                  <span className="text-center">Precio de venta</span>
                  <span className="text-center">Cantidad mínima</span>
                  <span className="text-center">Acciones</span>
                </div>
                {products && products.length > 0 ? (
                  products.map((product) => (
                    <div key={String(product.id)} className="grid grid-cols-5 py-2 border-t items-center">
                      <span className="text-center">{product.name}</span>
                      <span className="text-center">{product.quantity}</span>
                      
                      {/* Precio y selector de moneda */}
                      <div className="text-center flex justify-center items-center">
                        <span>
                          {convertPrice(product.price, currencySettings[String(product.id)] ?? "USD")}{" "}
                        </span>
                        <select
                          value={currencySettings[String(product.id)] ?? "USD"}
                          onChange={(e) => handleCurrencyChange(String(product.id), e.target.value)}
                          className="ml-2 border border-gray-300 rounded px-1 py-1"
                        >
                          <option value="USD">USD</option>
                          <option value="EUR">EUR</option>
                          <option value="MXN">MXN</option>
                          <option value="ARS">ARS</option>
                        </select>
                      </div>

                      <span className="text-center text-red-600 font-bold">{product.minStock}</span>
                      <span className="text-center">
                        <FontAwesomeIcon icon={faTrash} className="text-red-500 hover:text-red-600 cursor-pointer" />
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4">No hay productos en este inventario</div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}



// / "use client";

// import { useState, useEffect } from "react";
// import Swal from "sweetalert2";
// import { useRouter } from "next/navigation";
// import { IProduct, IProductsErrors } from "@/interfaces/types";
// import { validateProductForm } from "@/helpers/validate";

// const ProductForm: React.FC = () => {
//   const kazuo_back = process.env.NEXT_PUBLIC_API_URL;
//   const router = useRouter();

//   const [formData, setFormData] = useState<IProduct>({
//     name: "",
//     quantity: 0,
//     price: 0,
//     minStock: 0,
//     storeId: "",
//     userId: "",
//   });

//   const [errors, setErrors] = useState<IProductsErrors>({});
//   const [currency, setCurrency] = useState("USD");
//   const [convertedPrice, setConvertedPrice] = useState(formData.price);

//   // Función para obtener el tipo de cambio en tiempo real
//   useEffect(() => {
//     if (currency !== "USD") {
//       const conversionRates: { [key: string]: number } = {
//         EUR: 0.85,
//         GBP: 0.76,
//       };
//       setConvertedPrice(formData.price * (conversionRates[currency] || 1));
//     } else {
//       setConvertedPrice(formData.price);
//     }
//   }, [formData.price, currency]);

//   const areFieldsFilled = () => {
//     return (
//       formData.name &&
//       formData.quantity &&
//       formData.price &&
//       formData.minStock &&
//       formData.storeId
//     );
//   };

//   const validateField = (name: string, value: string) => {
//     const validationErrors = validateProductForm({
//       ...formData,
//       [name]: value,
//     });
//     setErrors((prevErrors) => ({
//       ...prevErrors,
//       [name]: validationErrors[name] || "",
//     }));
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//     validateField(name, value);
//   };

//   const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setCurrency(e.target.value);
//   };

//   const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     validateField(name, value);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const validationErrors = validateProductForm(formData);
//     setErrors(validationErrors);

//     if (Object.keys(validationErrors).length === 0) {
//       let userId = "";
//       const userData = localStorage.getItem("userData");
//       if (userData) {
//         const parsedUserData = JSON.parse(userData);
//         userId = parsedUserData.id;
//       }

//       const dataToSend = {
//         ...formData,
//         quantity: Number(formData.quantity),
//         price: convertedPrice,
//         minStock: Number(formData.minStock),
//         userId: userId,
//       };

//       try {
//         const response = await fetch(`${kazuo_back}/product`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(dataToSend),
//         });

//         if (response.ok) {
//           Swal.fire({
//             title: "¡Producto creado!",
//             text: "El producto se ha creado correctamente.",
//             icon: "success",
//             confirmButtonText: "Aceptar",
//           });
//           router.push("/Products");
//         } else {
//           const errorData = await response.json();
//           throw new Error(errorData.message || "Error al crear el producto");
//         }
//       } catch (error) {
//         Swal.fire({
//           title: "Error",
//           text: "No se pudo crear el producto. Por favor, inténtalo de nuevo.",
//           icon: "error",
//           confirmButtonText: "Aceptar",
//         });
//       }
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
//       <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
//         <h2 className="text-2xl font-bold text-center text-blue-700">
//           Registrar Producto
//         </h2>
//         <form className="space-y-6" onSubmit={handleSubmit}>
//           <div className="space-y-2">
//             <label htmlFor="name" className="block text-sm font-medium text-gray-700">
//               Nombre del Producto:
//             </label>
//             <input
//               type="text"
//               name="name"
//               id="name"
//               value={formData.name}
//               onChange={handleChange}
//               onBlur={handleBlur}
//               className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//               placeholder="Ingrese el nombre del producto"
//               required
//             />
//             {errors.name && <p className="text-red-600">{errors.name}</p>}
//           </div>

//           <div className="space-y-2">
//             <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
//               Cantidad:
//             </label>
//             <input
//               type="number"
//               name="quantity"
//               id="quantity"
//               value={formData.quantity}
//               onChange={handleChange}
//               onBlur={handleBlur}
//               className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//               placeholder="Ingrese la cantidad"
//               min="0"
//               required
//             />
//             {errors.quantity && <p className="text-red-600">{errors.quantity}</p>}
//           </div>

//           <div className="space-y-2">
//             <label htmlFor="price" className="block text-sm font-medium text-gray-700">
//               Precio:
//             </label>
//             <div className="flex items-center">
//               <input
//                 type="number"
//                 name="price"
//                 id="price"
//                 value={formData.price}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                 placeholder="Ingrese el precio"
//                 min="0"
//                 required
//               />
//               <select
//                 value={currency}
//                 onChange={handleCurrencyChange}
//                 className="ml-2 px-2 py-1 border rounded-md"
//               >
//                 <option value="USD">USD</option>
//                 <option value="EUR">EUR</option>
//                 <option value="GBP">GBP</option>
//               </select>
//             </div>
//             <p className="text-gray-500 mt-1">
//               Precio en {currency}: {convertedPrice.toFixed(2)} {currency}
//             </p>
//             {errors.price && <p className="text-red-600">{errors.price}</p>}
//           </div>

//           <div className="space-y-2">
//             <label htmlFor="minStock" className="block text-sm font-medium text-gray-700">
//               Stock Mínimo:
//             </label>
//             <input
//               type="number"
//               name="minStock"
//               id="minStock"
//               value={formData.minStock}
//               onChange={handleChange}
//               onBlur={handleBlur}
//               className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//               placeholder="Ingrese el stock mínimo"
//               min="0"
//               required
//             />
//             {errors.minStock && <p className="text-red-600">{errors.minStock}</p>}
//           </div>

//           <div className="space-y-2">
//             <label htmlFor="storeId" className="block text-sm font-medium text-gray-700">
//               ID de la Tienda:
//             </label>
//             <input
//               type="text"
//               name="storeId"
//               id="storeId"
//               value={formData.storeId}
//               onChange={handleChange}
//               onBlur={handleBlur}
//               className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//               placeholder="Ingrese el ID de la tienda"
//               required
//             />
//             {errors.storeId && <p className="text-red-600">{errors.storeId}</p>}
//           </div>

//           <button
//             type="submit"
//             disabled={!areFieldsFilled()}
//             className={`w-full py-2 px-4 text-white rounded-md ${
//               areFieldsFilled()
//                 ? "bg-blue-500 hover:bg-blue-900"
//                 : "bg-gray-300 cursor-not-allowed"
//             } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
//           >
//             Registrar Producto
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ProductForm;
