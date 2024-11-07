"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IProduct, IStore, IUpdateProduct } from "@/interfaces/types";
import { useAppContext } from "@/context/AppContext";
import Swal from "sweetalert2";

const EditProductForm: React.FC<{ productId: string }> = ({ productId }) => {
  const [product, setProduct] = useState<IProduct | null>(null);
  const [formValues, setFormValues] = useState<Partial<IUpdateProduct>>({});
  const [stores, setStores] = useState<IStore[]>([]);
  const [selectedStore, setSelectedStore] = useState("");
  const router = useRouter();
  const kazuo_back = process.env.NEXT_PUBLIC_API_URL;
  const { userData } = useAppContext();

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`${kazuo_back}/product/${productId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userData?.token}`,
        },
      });
      console.log(userData?.token);
      const data = await response.json();
      setProduct(data);
      setFormValues({
        name: data.name,
        unids: data.unids,
        maxCapacity: data.maxCapacity,
        inPrice: data.inPrice,
        outPrice: data.outPrice,
      });
      setSelectedStore(data.storeId);
    };

    const fetchStores = async () => {
      const userData = JSON.parse(localStorage.getItem("userData") || "{}");
      const response = await fetch(`${kazuo_back}/store/user/${userData.id}`);
      const data = await response.json();
      setStores(data);
    };

    fetchProduct();
    fetchStores();
  }, [productId, kazuo_back]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "store") {
      setSelectedStore(value);
      return;
    }

    setFormValues((prev) => {
      let newValue: string | number = value;

      // Convertir a número los campos numéricos
      if (name === "maxCapacity" || name === "inPrice" || name === "outPrice") {
        newValue = value === "" ? 0 : parseFloat(value);
      }

      // Solo actualizar si el valor ha cambiado
      if (newValue === product?.[name as keyof IProduct]) {
        const { [name]: _, ...rest } = prev;
        return rest;
      }

      return {
        ...prev,
        [name]: newValue,
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!product) return;

    const changedValues: IUpdateProduct = {
      id: productId,
    };

    (Object.keys(formValues) as Array<keyof IUpdateProduct>).forEach((key) => {
      if (formValues[key] !== product[key]) {
        changedValues[key] = formValues[key];
      }
    });

    // Incluir storeId solo si ha cambiado
    if (selectedStore !== product.storeId) {
      changedValues.storeId = selectedStore;
    }

    if (Object.keys(changedValues).length === 1) {
      // Solo contiene el id
      alert("No hay cambios para guardar");
      return;
    }

    try {
      const response = await fetch(`${kazuo_back}/product/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userData?.token}`,
        },
        body: JSON.stringify(changedValues),
      });

      if (response.ok) {
        Swal.fire({
          title: "Producto actualizado",
          icon: "success",
          confirmButtonText: "Ok",
        });
        router.push(`/Products/${selectedStore}`);
      } else {
        Swal.fire({
          title: "Error al actualizar el producto",
          icon: "error",
          confirmButtonText: "Ok",
        });
        alert("Error al actualizar el producto");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al conectar con el servidor");
    }
  };

  if (!product) return <div>Cargando...</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 bg-gray-100 rounded-md">
        <h2 className="text-xl font-bold col-span-full mb-2">
          Información Actual del Producto
        </h2>
        <p>
          <strong>Nombre:</strong> {product.name}
        </p>
        <p>
          <strong>Cantidad:</strong> {product.quantity}
        </p>
        <p>
          <strong>Unidad de medida:</strong> {product.unids}
        </p>
        <p>
          <strong>Capacidad máxima:</strong> {product.maxCapacity}
        </p>
        <p>
          <strong>Precio de compra:</strong> {product.inPrice}
        </p>
        <p>
          <strong>Precio de venta:</strong> {product.outPrice}
        </p>
        <p>
          <strong>Ubicación:</strong> {product.store?.name || "No disponible"}
        </p>
      </div>

      <div className="bg-white p-4 rounded-md shadow">
        <h2 className="text-xl font-bold mb-4">
          Modificar Información del Producto
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block mb-1">
                Nombre:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                defaultValue={product.name}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                disabled={!userData?.isAdmin}
              />
            </div>

            <div>
              <label htmlFor="unids" className="block mb-1">
                Unidad de medida:
              </label>
              <input
                type="text"
                id="unids"
                name="unids"
                defaultValue={product.unids}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label htmlFor="maxCapacity" className="block mb-1">
                Capacidad máxima:
              </label>
              <input
                type="number"
                id="maxCapacity"
                name="maxCapacity"
                defaultValue={product.maxCapacity}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                disabled={!userData?.isAdmin}
              />
            </div>

            <div>
              <label htmlFor="inPrice" className="block mb-1">
                Precio de compra:
              </label>
              <input
                type="number"
                id="inPrice"
                name="inPrice"
                defaultValue={product.inPrice}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                disabled={!userData?.isAdmin}
              />
            </div>

            <div>
              <label htmlFor="outPrice" className="block mb-1">
                Precio de venta:
              </label>
              <input
                type="number"
                id="outPrice"
                name="outPrice"
                defaultValue={product.outPrice}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                disabled={!userData?.isAdmin}
              />
            </div>

            <div>
              <label htmlFor="store" className="block mb-1">
                Bodega:
              </label>
              <select
                id="store"
                name="store"
                value={selectedStore}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value={product.storeId}>
                  {product.store?.name || "Bodega actual"}
                </option>
                {stores
                  .filter((store) => store.id !== product.storeId)
                  .map((store) => (
                    <option key={store.id} value={store.id}>
                      {store.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Actualizar Producto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductForm;
