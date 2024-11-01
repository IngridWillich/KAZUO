"use client";

import { IEditStoreProps, IProduct } from "@/interfaces/types";
import { socket } from "@/services/socket";
import { useEffect, useState, useRef } from "react";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import {
  faCircleInfo,
  faEdit,
  faInfo,
  faMinus,
  faPlus,
  faPlusCircle,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine } from "@fortawesome/free-solid-svg-icons/faChartLine";
import { FaPlusSquare } from "react-icons/fa";
import { FaCircleInfo, FaInfo, FaPlus } from "react-icons/fa6";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons/faInfoCircle";
import { Link } from "lucide-react";
import Loader from "../Loader/Loader";
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { ArrowLeft } from 'lucide-react';


const Products: React.FC<IEditStoreProps> = ({ storeId }) => {
  const router = useRouter();
  const { userData } = useAppContext();

  // State variables
  const [activeTab, setActiveTab] = useState("stock");
  const [products, setProducts] = useState<IProduct[]>([]);
  const [lowStockProducts, setLowStockProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [storeName, setStoreName] = useState("");

  //FUNCION PARA OBTENER PRODUCTOS POR CRUD

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const kazuo_back = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${kazuo_back}/product/store/${storeId}`, {
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
        setProducts(sortedProducts);
        setIsLoading(false); // Stop loading once products are fetched
      } catch (error) {
        console.error("Error:", error);
        setProducts([]);
        setIsLoading(false); // Stop loading even if there's an error
      }
    };

    if (userData?.token) {
      fetchProducts();
    }
  }, [userData]);

  // useEffect(()=>{
  //   socket.emit("getProducts", storeId);

  //   socket.on('productsUpdate', (updatedProducts: IProduct[])=>{
  //     setProducts(updatedProducts);
  //   });

  //   return () => {
  //     socket.off("productsUpdate");
  //   };
  // },[storeId])

  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        const response = await fetch(`${kazuo_back}/store/${storeId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${userData?.token}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Error al obtener los datos de la bodega");
        }
        const data = await response.json();
        setStoreName(data.storeFound.name);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (userData?.token) {
      fetchStoreData();
    }
  }, [storeId, userData]);

  const handleCreateNewProduct = () => {
    router.push(`/AddNewProduct/${storeId}`);
  };

  const handlePencilClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.unids.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.bange.toLowerCase().includes(searchQuery.toLowerCase())
  );

const handleBack = () => {
  router.back();
}
  return (
    <div className="w-full min-h-screen flex flex-col justify-center bg-gray-100">
      <main className="w-full flex-grow container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8 lg:w-5/6 mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold mb-4 sm:mb-0">
              {storeName}
            </h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition duration-300 ease-in-out"
                onClick={() => {}}
              >
                Generar Informe
              </button>
              <button
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition duration-300 ease-in-out"
                onClick={handleCreateNewProduct}
              >
                Agregar Producto
              </button>
            </div>
          </div>
          <div className="mb-6">
            <input
              type="text"
              placeholder="Buscar productos por nombre, unidad de medida o moneda"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-gray-300 rounded-md p-3 w-full"
            />
           <button onClick={handleBack} className="mb-4">
    <ArrowLeft className="mr-2 h-4 w-4 mt-3" />
</button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-3 text-left">Nombre</th>
                  <th className="p-3 text-left">Cantidad</th>
                  <th className="p-3 text-left">Unidad</th>
                  <th className="p-3 text-left">Capacidad</th>
                  <th className="p-3 text-left">Precio compra</th>
                  <th className="p-3 text-left">Moneda</th>
                  <th className="p-3 text-left">Precio venta</th>
                  <th className="p-3 text-left">Mínimo</th>
                  <th className="p-3 text-left">Acción</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <tr key={product.id} className="border-b hover:bg-gray-50">
                      <td className="p-3">{product.name}</td>
                      <td className="p-3">{product.quantity}</td>
                      <td className="p-3">{product.unids}</td>
                      <td className="p-3">{product.maxCapacity}</td>
                      <td className="p-3">{product.inPrice}</td>
                      <td className="p-3">{product.bange}</td>
                      <td className="p-3">{product.outPrice}</td>
                      <td className="p-3 text-red-600 font-bold">
                        {product.minStock}
                      </td>
                      <td className="p-3">
                        <button
                          onClick={() => {/* Handle edit */}}
                          className="text-blue-600 hover:text-blue-800 mr-2"
                          aria-label={`Editar ${product.name}`}
                        >
                          <FontAwesomeIcon icon={faPencilAlt} />
                        </button>
                        <button
                          onClick={() => {/* Handle delete */}}
                          className="text-red-600 hover:text-red-800"
                          aria-label={`Eliminar ${product.name}`}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9} className="text-center py-4">
                      No se encontraron productos que coincidan con su búsqueda.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Responsive card view for small screens */}
          <div className="md:hidden mt-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-md p-4 mb-4">
                  <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                  <p><span className="font-medium">Cantidad:</span> {product.quantity}</p>
                  <p><span className="font-medium">Unidad:</span> {product.unids}</p>
                  <p><span className="font-medium">Capacidad:</span> {product.maxCapacity}</p>
                  <p><span className="font-medium">Precio compra:</span> {product.inPrice}</p>
                  <p><span className="font-medium">Moneda:</span> {product.bange}</p>
                  <p><span className="font-medium">Precio venta:</span> {product.outPrice}</p>
                  <p><span className="font-medium">Mínimo:</span> <span className="text-red-600 font-bold">{product.minStock}</span></p>
                  <div className="mt-3 flex justify-end">
                    <button
                      onClick={() => {/* Handle edit */}}
                      className="text-blue-600 hover:text-blue-800 mr-4"
                      aria-label={`Editar ${product.name}`}
                    >
                      <FontAwesomeIcon icon={faPencilAlt} />
                    </button>
                    <button
                      onClick={() => {/* Handle delete */}}
                      className="text-red-600 hover:text-red-800"
                      aria-label={`Eliminar ${product.name}`}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center py-4">
                No se encontraron productos que coincidan con su búsqueda.
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
export default Products
