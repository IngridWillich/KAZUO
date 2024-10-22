"use client";
import { IProduct } from "@/interfaces/types";
import { useEffect, useState, useRef } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";

export default function Inventario() {
  const [activeTab, setActiveTab] = useState("stock");
  const [products, setProducts] = useState<IProduct[]>([]);
  const [lowStockProducts, setLowStockProducts] = useState<IProduct[]>([]);
  const [newProduct, setNewProduct] = useState({ name: "", quantity: 0 });
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { userData } = useAppContext();
  const router = useRouter();
  const kazuo_back = process.env.NEXT_PUBLIC_API_URL;

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products"); // Cambiar por api del back
      const data = await response.json();
      setProducts(data.products);
      setLowStockProducts(data.lowStockProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = async () => {
    if (newProduct.name && newProduct.quantity > 0) {
      try {
        const response = await fetch("/api/products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newProduct),
        });

        if (response.ok) {
          const updatedProducts = await response.json();
          setProducts(updatedProducts);
          setNewProduct({ name: "", quantity: 0 });
        } else {
          console.error("Failed to add product");
        }
      } catch (error) {
        console.error("Error adding product:", error);
      }
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      console.log(handleImageUpload);
    }
  };
  // const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     const formData = new FormData();
  //     formData.append('image', file);
  
  //     try {
  //       const response = await fetch(`${kazuo_back}/userImage`, {
  //         method: 'POST',
  //         body: formData,
  //       });
  
  //       if (response.ok) {
  //         const data = await response.json();
  //         setProfileImage(data.imageUrl);
  //       } else {
  //         console.error('Error al subir la imagen');
  //       }
  //     } catch (error) {
  //       console.error('Error al subir la imagen:', error);
  //     }
  //   }
  // };

  const handlePencilClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleUpdatePass = () => {
    router.push("/UpdatePass");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card de Información de Usuario */}
          <div className="bg-white shadow-md rounded-md p-4 md:col-span-1 relative">
            <h2 className="text-xl font-semibold mb-4">
              Información de Usuario
            </h2>

            {/* Contenedor del avatar */}
            <div className="relative flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden">
                {/* Imagen de perfil */}
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <span className="text-gray-500 ">No image</span>
                )}
              </div>

              <div
                className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-2 cursor-pointer hover:bg-blue-600"
                onClick={handlePencilClick}
              >
                <FaPencilAlt className="text-white" />
              </div>

              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>

            <p className="mt-4">
              <strong>Nombre: </strong>
              {userData?.name}
            </p>
            <p>
              <strong>Email: </strong>
              {userData?.email}
            </p>
            <p>
              <strong>Plan:</strong> Kazuo Pro
            </p>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mt-4"
              onClick={handleUpdatePass}
            >
              {" "}
              Cambiar Contraseña
            </button>
          </div>

          <div className="bg-white shadow-md rounded-md p-4 md:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Gestión de Inventario</h2>
            </div>

            <div className="mb-4">
              <input
                type="text"
                className="border p-2 rounded w-1/2 mr-2"
                placeholder="Nombre del Producto"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
              />
              <input
                type="number"
                className="border p-2 rounded w-1/4 mr-2"
                placeholder="Cantidad"
                value={newProduct.quantity}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    quantity: parseInt(e.target.value),
                  })
                }
              />
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                onClick={handleAddProduct}
              >
                Agregar Producto
              </button>
            </div>

            <div>
              <div className="flex space-x-4 border-b">
                <button
                  className={`py-2 px-4 ${
                    activeTab === "stock" ? "border-b-2 border-blue-600" : ""
                  }`}
                  onClick={() => setActiveTab("stock")}
                >
                  Stock
                </button>
                <button
                  className={`py-2 px-4 ${
                    activeTab === "low" ? "border-b-2 border-blue-600" : ""
                  }`}
                  onClick={() => setActiveTab("low")}
                >
                  Bajo Stock
                </button>
              </div>

              {activeTab === "stock" && (
                <div className="mt-4">
                  <div className="bg-gray-100 rounded-md p-4">
                    <div className="flex justify-between font-medium">
                      <span>Producto</span>
                      <span>Cantidad</span>
                    </div>
                    {products.map((product, index) => (
                      <div
                        key={index}
                        className="flex justify-between py-2 border-t"
                      >
                        <span>{product.name}</span>
                        <span>{product.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "low" && (
                <div className="mt-4">
                  <div className="bg-gray-100 rounded-md p-4">
                    <div className="flex justify-between font-medium">
                      <span>Producto</span>
                      <span>Cantidad</span>
                    </div>
                    {lowStockProducts.map((product, index) => (
                      <div
                        key={index}
                        className="flex justify-between py-2 border-t"
                      >
                        <span>{product.name}</span>
                        <span className="text-red-500">{product.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
