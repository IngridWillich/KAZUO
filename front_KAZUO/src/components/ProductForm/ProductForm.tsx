"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { IEditStoreProps, IProduct, IProductsErrors } from "@/interfaces/types";
import { validateProductForm } from "@/helpers/validate";
import * as XLSX from "xlsx";

const ProductForm: React.FC<IEditStoreProps> = ({ storeId }) => {
  const kazuo_back = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();

  const [formData, setFormData] = useState<IProduct>({
    
    name: "",
    quantity: 0,
    price: 0,
    minStock: 0,
    storeId: storeId,
    userId: "",
  });

  const [errors, setErrors] = useState<IProductsErrors>({});

  // Verificar si todos los campos están completos
  const areFieldsFilled = () => {
    return (
      formData.name && formData.quantity && formData.price && formData.minStock
    );
  };

  const validateField = (name: string, value: string) => {
    const validationErrors = validateProductForm({
      ...formData,
      [name]: value,
    });
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validationErrors[name] || "",
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    const file = e.target.files?.[0];
    if(file){
      const reader = new FileReader();
      reader.onload = (event) =>{
        const data = new Uint8Array(event.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, {type: "array"});
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        const productsData: IProduct[] = XLSX.utils.sheet_to_json(worksheet);
        console.log(storeId);
        console.log(localStorage.getItem("userData"));
const userId = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")!).id : "";
const productsToSend = productsData.map(product => ({
  ...product,
  storeId: storeId,
  userId: userId
}));

handleBulkUpload(productsToSend);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleBulkUpload = async (products: IProduct[]) => {
    try {
      const response = await fetch(`${kazuo_back}/products/bulk`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(products),
      });
      if(response.ok){
        Swal.fire({
          title: "Productos Añadidos con exito",
          text: "Los productos han sido almacenados",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
        router.push(`/Products/${storeId}`);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "No se pudo cargar los productos");
      }
    } catch (error){
      Swal.fire({
        title: "Error",
        text: "No se pudo cargar los productos. Por favor, inténtalo de nuevo.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    validateField(name, value);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateProductForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      let userId = "";
      const userData = localStorage.getItem("userData");
      if (userData) {
        const parsedUserData = JSON.parse(userData);
        userId = parsedUserData.id;
      }
      const dataToSend = {
        ...formData,
        quantity: Number(formData.quantity),
        price: Number(formData.price),
        minStock: Number(formData.minStock),
        userId: userId,
        storeId: storeId,
      };

      try {
        const response = await fetch(`${kazuo_back}/product`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        });

        if (response.ok) {
          Swal.fire({
            title: "¡Producto creado!",
            text: "El producto se ha creado correctamente.",
            icon: "success",
            confirmButtonText: "Aceptar",
          });
          router.push(`/Products/${storeId}`);
        } else {
          const errorData = await response.json();
          console.error("Error en la respuesta del servidor:", errorData);
          throw new Error(errorData.message || "Error al crear el producto");
        }
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "No se pudo crear el producto. Por favor, inténtalo de nuevo.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-blue-700">
          Registrar
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Nombre del Producto:
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Ingrese el nombre del producto"
              required
            />
            {errors.name && <p className="text-red-600">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-gray-700"
            >
              Cantidad:
            </label>
            <input
              type="number"
              name="quantity"
              id="quantity"
              value={formData.quantity}
              onChange={handleChange}
              onBlur={handleBlur}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Ingrese la cantidad"
              min="0"
              required
            />
            {errors.quantity && (
              <p className="text-red-600">{errors.quantity}</p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Precio:
            </label>
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              $
            </span>
            <input
              type="number"
              name="price"
              id="price"
              value={formData.price}
              onChange={handleChange}
              onBlur={handleBlur}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Ingrese el precio"
              min="0"
              required
            />
            <span className="ml-2 text-gray-500">USD</span>
            {errors.price && <p className="text-red-600">{errors.price}</p>}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="minStock"
              className="block text-sm font-medium text-gray-700"
            >
              Cantidad Mínima:
            </label>
            <input
              type="number"
              name="minStock"
              id="minStock"
              value={formData.minStock}
              onChange={handleChange}
              onBlur={handleBlur}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Ingrese la cantidad mínima"
              min="0"
              required
            />
            {errors.minStock && (
              <p className="text-red-600">{errors.minStock}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={!areFieldsFilled()}
            className={`w-full py-2 px-4 text-white rounded-md ${
              areFieldsFilled()
                ? "bg-blue-500 hover:bg-blue-900"
                : "bg-gray-300 cursor-not-allowed"
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
          >
            Registrar Producto
          </button>
          <p>O</p>
          <input type="file" accept=".xlsx, .xls" onChange={handleFileChange}/>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;