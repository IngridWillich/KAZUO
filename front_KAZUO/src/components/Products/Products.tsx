"use client";
import { IProduct } from "@/interfaces/types";
import { useEffect, useState, useRef } from "react";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Products() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("stock");
  const [products, setProducts] = useState<IProduct[]>([]);
  const [lowStockProducts, setLowStockProducts] = useState<IProduct[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { userData } = useAppContext();
  const kazuo_back = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${kazuo_back}/product`, {
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
    router.push("/AddNewProduct");
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
                      <div key={product.id} className="grid grid-cols-5 py-2 border-t items-center">
                        <span className="text-center">{product.name}</span>
                        <span className="text-center">{product.quantity}</span>
                        <span className="text-center">{product.price} USD</span>
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
