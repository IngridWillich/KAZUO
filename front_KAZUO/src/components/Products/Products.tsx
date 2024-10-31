"use client";
import { IEditStoreProps, IProduct } from "@/interfaces/types";
import { useEffect, useState, useRef } from "react";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';


const Products: React.FC<IEditStoreProps> = ({ storeId }) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("stock");
  const [products, setProducts] = useState<IProduct[]>([]);
  const [lowStockProducts, setLowStockProducts] = useState<IProduct[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { userData } = useAppContext();
  const kazuo_back = process.env.NEXT_PUBLIC_API_URL;
  const [searchQuery, setSearchQuery] = useState("");

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
  return (
    <div className="w-full min-h-screen flex flex-col justify-center bg-gray-100">
      <main className="w-full flex-grow container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8 lg:w-5/6 mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold mb-4 sm:mb-0">
              Aquí va el nombre de la bodega
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