"use client";
import { useState, useRef } from "react";
import { IProduct } from "@/interfaces/types";
import { validateProductForm } from "@/helpers/validate";
import { IProductsErrors } from "@/interfaces/types";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const ProductForm: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<IProduct>({
    name: "",
    quantity: 0,
    price: 0,
    image: "",
    minStock: 0,
    storeId: "",
  });
  const [errors, setErrors] = useState<IProductsErrors>({});
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const kazuo_back = process.env.NEXT_PUBLIC_API_URL;

  const validateField = (name: string, value: string | number) => {
    const validationErrors = validateProductForm({ ...formData, [name]: value });
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validationErrors[name] || '',
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

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
      const productData = new FormData();
      for (const [key, value] of Object.entries(formData)) {
        productData.append(key, value.toString());
      }
      if (imageFile) {
        productData.append('image', imageFile);
      }

      try {
        const response = await fetch(`${kazuo_back}/product`, {
          method: "POST",
          body: productData,
        });

        if (response.ok) {
          Swal.fire({
            title: "¡Producto agregado!",
            text: "El producto se ha agregado correctamente.",
            icon: "success",
            confirmButtonText: "Aceptar",
          });
          router.push("/Product");
        } else {
          throw new Error("Error agregando el producto");
        }
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "No se pudo agregar el producto. Por favor, inténtalo de nuevo.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      } finally {
        console.log(formData);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 w-full max-w-md mx-auto bg-white text-black p-4"
    >
      <div>
        <h1>AGREGAR PRODUCTO</h1>
      </div>
      <div className="flex flex-col">
        <label htmlFor="name">Nombre</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
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
          value={formData.quantity}
          className="border border-gray-300 rounded-sm w-fit"
          min="0"
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
          value={formData.price}
          className="border border-gray-300 rounded-sm w-fit"
          min="0"
          required
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.price && <p className="text-red-600">{errors.price}</p>}
      </div>
      <div className="flex flex-col">
        <label htmlFor="image">Imagen</label>
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Product Image"
            className="object-cover w-full h-full"
          />
        )}
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageUpload}
          className="hidden"
        />
        <button
          type="button"
          onClick={handleAddImageClick}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Seleccionar Imagen
        </button>
        {errors.image && <p className="text-red-600">{errors.image}</p>}
      </div>
      <div className="flex flex-col">
        <label htmlFor="minStock">Cantidad Mínima</label>
        <input
          type="number"
          id="minStock"
          name="minStock"
          className="border border-gray-300 rounded-sm w-fit"
          min="0"
          required
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.minStock && <p className="text-red-600">{errors.minStock}</p>}
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