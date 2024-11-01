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
<<<<<<< HEAD
import { faChartLine } from "@fortawesome/free-solid-svg-icons/faChartLine";
import { FaPlusSquare } from "react-icons/fa";
import { FaCircleInfo, FaInfo, FaPlus } from "react-icons/fa6";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons/faInfoCircle";
import { Link } from "lucide-react";
import Loader from "../Loader/Loader";
=======
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

>>>>>>> 3fa6469b2ab52ed8678b5bfe1a4ae2c188786089

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
<<<<<<< HEAD

  const handleBack = () => {
    window.history.back();
  };

  // const handleAddProduct = (newProduct: IProduct) => {
  //   socket.emit('addProduct', { ...newProduct, storeId });
  // };

  // const handleDeleteProduct = (productId: string) => {
  //   socket.emit('deleteProduct', productId);
  // };

=======
>>>>>>> 3fa6469b2ab52ed8678b5bfe1a4ae2c188786089
  return (
    <div className="w-full min-h-screen flex flex-col justify-center bg-gray-100">
      <main className="w-full flex-grow container mx-auto px-4 py-8">
<<<<<<< HEAD
        <div className="rounded-md p-8 md:w-2/3 mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              {storeName || "Cargando el nombre de la bodega"}
=======
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8 lg:w-5/6 mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold mb-4 sm:mb-0">
              Aquí va el nombre de la bodega
>>>>>>> 3fa6469b2ab52ed8678b5bfe1a4ae2c188786089
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
<<<<<<< HEAD
          <div className="mb-4 flex flex-row gap-6 align-middle">
=======
          <div className="mb-6">
>>>>>>> 3fa6469b2ab52ed8678b5bfe1a4ae2c188786089
            <input
              type="text"
              placeholder="Buscar productos por nombre, unidad de medida o moneda"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-gray-300 rounded-md p-3 w-full"
            />
            <a href="#" onClick={handleBack}>
              Volver
            </a>
          </div>
<<<<<<< HEAD
          {isLoading ? (
            <div className="flex justify-center items-center h-32">
              <Loader />
            </div>
          ) : (
            <div className="w-full mt-4">
              <div className="w-full bg-gray-100 rounded-md p-4">
                <table className="w-full">
                  <thead>
                    <tr className="font-medium border-b">
                      <th className="pb-2 text-center">Nombre</th>
                      <th className="pb-2 text-center">Cantidad</th>
                      <th className="pb-2 text-center">Unidad de medida</th>
                      <th className="pb-2 text-center">
                        Capacidad de almacenamiento
                      </th>
                      <th className="pb-2 text-center">Precio de compra</th>
                      <th className="pb-2 text-center">Moneda de uso</th>
                      <th className="pb-2 text-center">Precio de venta</th>
                      <th className="pb-2 text-center">Cantidad mínima</th>
                      <th className="pb-2 text-center">Control de Inventario</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.length > 0 ? (
                      filteredProducts.map((product) => (
                        <tr key={product.id} className="border-t">
                          <td className="py-2 text-center">{product.name}</td>
                          <td className="py-2 text-center">
                            {product.quantity}
                          </td>
                          <td className="py-2 text-center">{product.unids}</td>
                          <td className="py-2 text-center">
                            {product.maxCapacity}
                          </td>
                          <td className="py-2 text-center">
                            {product.inPrice}
                          </td>
                          <td className="py-2 text-center">{product.bange}</td>
                          <td className="py-2 text-center">
                            {product.outPrice}
                          </td>
                          <td className="py-2 text-center text-red-600 font-bold">
                            {product.minStock}
                          </td>
                          <td className="py-2 text-center">
                          <FontAwesomeIcon
                            icon={faEdit}
                            className="text-blue-500 hover:text-blue-600 cursor-pointer mx-1"
                            onClick={() => {}}
                          />
                          <FontAwesomeIcon
                            icon={faTrash}
                            className="text-red-500 hover:text-red-600 cursor-pointer mx-1"
                          />
                          <FontAwesomeIcon
                            icon={faChartLine}
                            className="mx-1"
                          />
                          <FontAwesomeIcon icon={faPlus} className="mx-1" />
                          <FontAwesomeIcon icon={faCircleInfo} />
                          <FontAwesomeIcon icon={faMinus} className="mx-1" />
                        </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={9} className="text-center py-4">
                          No se encontraron productos que coincidan con su
                          búsqueda.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Products;
=======
          
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
>>>>>>> 3fa6469b2ab52ed8678b5bfe1a4ae2c188786089
