"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IProduct, IStore } from "@/interfaces/types";

const EditProductForm: React.FC<{ productId: string }> = ({ productId }) => {
  const [product, setProduct] = useState<IProduct | null>(null);
  const [stores, setStores] = useState<IStore[]>([]);
  const [selectedStore, setSelectedStore] = useState("");
  const router = useRouter();
  const kazuo_back = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`${kazuo_back}/product/${productId}`);
      const data = await response.json();
      setProduct(data);
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
  }, [productId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!product) return;

    const newProductInfo = {
      ...product,
      storeId: selectedStore || product.storeId,
    };

    try {
      const response = await fetch(`${kazuo_back}/product/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProductInfo),
      });

      if (response.ok) {
        router.push(`/Products/${newProductInfo.storeId}`);
      } else {
        console.error("Failed to update product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <div className="mb-4 p-4 bg-gray-100 rounded-md">
        <h2 className="text-xl font-bold mb-2">Información del Producto</h2>
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
          <strong>Capacidad de la bodega:</strong> {product.maxCapacity}
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
      <div>
        <h1>
          MODIFICAR INFORMACION DEL PRODUCTO
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="unids">Units:</label>
            <input
              type="text"
              id="unids"
              value={product.unids}
              onChange={(e) =>
                setProduct({ ...product, unids: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="maxCapacity">Max Capacity:</label>
            <input
              type="number"
              id="maxCapacity"
              value={product.maxCapacity}
              onChange={(e) =>
                setProduct({ ...product, maxCapacity: Number(e.target.value) })
              }
            />
          </div>
          <div>
            <label htmlFor="inPrice">In Price:</label>
            <input
              type="number"
              id="inPrice"
              value={product.inPrice}
              onChange={(e) =>
                setProduct({ ...product, inPrice: Number(e.target.value) })
              }
            />
          </div>
          <div>
            <label htmlFor="outPrice">Out Price:</label>
            <input
              type="number"
              id="outPrice"
              value={product.outPrice}
              onChange={(e) =>
                setProduct({ ...product, outPrice: Number(e.target.value) })
              }
            />
          </div>
          <div>
            <label htmlFor="store">Store:</label>
            <select
              id="store"
              value={selectedStore}
              onChange={(e) => setSelectedStore(e.target.value)}
            >
              <option value={product.storeId}>Current Store</option>
              {stores.map((store) => (
                <option key={store.id} value={store.id}>
                  {store.name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit">ACTUALIZAR PRODUCTO</button>
        </form>
      </div>
    </div>
  );
};

export default EditProductForm;
