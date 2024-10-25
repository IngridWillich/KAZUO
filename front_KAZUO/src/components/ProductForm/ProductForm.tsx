"use client";
import { useState } from "react";
import { IProduct } from "@/interfaces/types";
import { validateProductForm } from "@/helpers/validate";
import { IProductsErrors } from "@/interfaces/types";

const ProductForm: React.FC = () => {
  const [formData, setFormData] = useState<IProduct>({
    name: "",
    quantity: "",
    price: "",
    image: "",
    minStock: "",
    storeId: "",
  });
  const [errors, setErrors] = useState<IProductsErrors>({});

  const validateField = (name: string, value: string) => {
    const validationErrors = validateProductForm({ ...formData, [name]: value });
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validationErrors[name] || '', 
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Validar el campo actual
    validateField(name, value);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Validar el campo que ha perdido el foco
    validateField(name, value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateProductForm(formData);
    setErrors(validationErrors);

    // Solo proceder si no hay errores
    if (Object.keys(validationErrors).length === 0) {
      console.log(JSON.stringify(formData));
      // Aquí enviarías normalmente los datos a tu backend
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 w-full max-w-md mx-auto bg-white text-black p-4"
    >
      <div>
        <h1>REGISTAR PRODUCTO</h1>
      </div>
      <div className="flex flex-col">
        <label htmlFor="name">Nombre</label>
        <input
          type="text"
          id="name"
          name="name"
          className="border border-gray-300 rounded-sm w-fit"
          required
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.name && <p className="text-red-600">{errors.name}</p>}
      </div>
  
      <div className="flex flex-col">
        <label htmlFor="quantity">Cantidad</label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          className="border border-gray-300 rounded-sm w-fit"
          min="0" // Asegura que no se pueden ingresar números negativos
          required
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.quantity && <p className="text-red-600">{errors.quantity}</p>}
      </div>
  
      <div className="flex flex-col">
        <label htmlFor="price">Precio</label>
        <input
          type="number"
          id="price"
          name="price"
          className="border border-gray-300 rounded-sm w-fit"
          min="0" // Asegura que no se pueden ingresar números negativos
          required
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.price && <p className="text-red-600">{errors.price}</p>}
      </div>
  
      <div className="flex flex-col">
        <label htmlFor="image">Imagen</label>
        <input
          type="text"
          id="image"
          name="image"
          className="border border-gray-300 rounded-sm w-fit"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.image && <p className="text-red-600">{errors.image}</p>}
      </div>
  
      <div className="flex flex-col">
        <label htmlFor="minStock">Cantidad Mínima</label>
        <input
          type="number"
          id="minStock"
          name="minStock"
          className="border border-gray-300 rounded-sm w-fit"
          min="0" // Asegura que no se pueden ingresar números negativos
          required
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.minStock && <p className="text-red-600">{errors.minStock}</p>}
      </div>
  
      <div className="flex flex-col">
        <label htmlFor="storeId">Bodega</label>
        <input
          type="number"
          id="storeId"
          name="storeId"
          className="border border-gray-300 rounded-sm w-fit"
          min="0" // Asegura que no se pueden ingresar números negativos
          required
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.storeId && <p className="text-red-600">{errors.storeId}</p>}
      </div>
  
      <div className="flex flex-row justify-center gap-8">
        <button
          type="submit"
          className="bg-blue-600 text-white hover:bg-blue-700 w-fit h-auto p-2 rounded-md"
        >
          Registrar
        </button>
        <button
          type="button"
          className="border border-blue-600 text-blue-600 hover:bg-blue-50 w-fit h-auto p-2 rounded-md"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}

export default ProductForm;
