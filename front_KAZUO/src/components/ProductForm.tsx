"use client";

import { useState } from "react";

const ProductForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    price: "",
    image: "",
    minStock: "",
    storeId: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(JSON.stringify(formData));
    // Here you would typically send the data to your backend
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
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="quantity">Cantidad</label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          className="border border-gray-300 rounded-sm w-fit"
          required
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="price">Precio</label>
        <input
          type="number"
          id="price"
          name="price"
          className="border border-gray-300 rounded-sm w-fit"
          required
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="image">Imagen</label>
        <input
          type="text"
          id="image"
          name="image"
          className="border border-gray-300 rounded-sm w-fit"
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="minStock">Cantidad Mínima</label>
        <input
          type="number"
          id="minStock"
          name="minStock"
          className="border border-gray-300 rounded-sm w-fit"
          required
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="storeId">Bodega</label>
        <input
          type="number"
          id="storeId"
          name="storeId"
          className="border border-gray-300 rounded-sm w-fit"
          required
          onChange={handleChange}
        />
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
};

export default ProductForm;
