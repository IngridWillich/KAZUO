"use client";
import { IEditStoreProps, IProduct } from "@/interfaces/types";
import { useEffect, useState, useRef } from "react";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
    <div className="w-full min-h-screen flex flex-col justify-center">
      <main className="w-full flex-grow container mx-auto px-4 py-8">
        <div className=" rounded-md p-8 md:w-2/3 mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              Aqui va el nombre de la bodega
            </h2>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              onClick={() => {}}
            >
              Generar Informe
            </button>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              onClick={handleCreateNewProduct}
            >
              Agregar Producto
            </button>
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Buscar productos por nombre, unidad de medida o moneda"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          
          
            <div className="w-full mt-4">
              <div className="w-full bg-gray-100 rounded-md p-4">
                <table className="w-full">
                  <thead>
                    <tr className="font-medium border-b">
                      <th className="pb-2 text-center">Nombre</th>
                      <th className="pb-2 text-center">Cantidad</th>
                      <th className="pb-2 text-center">Unidad de medida</th>
                      <th className="pb-2 text-center">Capacidad de almacenamiento</th>
                      <th className="pb-2 text-center">Precio de compra</th>
                      <th className="pb-2 text-center">Moneda de uso</th>
                      <th className="pb-2 text-center">Precio de venta</th>
                      <th className="pb-2 text-center">Cantidad mínima</th>
                      <th className="pb-2 text-center">Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.length > 0 ? (
                      filteredProducts.map((product) => (
                        <tr key={product.id} className="border-t">
                          <td className="py-2 text-center">{product.name}</td>
                          <td className="py-2 text-center">{product.quantity}</td>
                          <td className="py-2 text-center">{product.unids}</td>
                          <td className="py-2 text-center">{product.maxCapacity}</td>
                          <td className="py-2 text-center">{product.inPrice}</td>
                          <td className="py-2 text-center">{product.bange}</td>
                          <td className="py-2 text-center">{product.outPrice}</td>
                          <td className="py-2 text-center text-red-600 font-bold">
                            {product.minStock}
                          </td>
                          <td className="py-2 text-center">
                            <FontAwesomeIcon
                              icon={faTrash}
                              className="text-red-500 hover:text-red-600 cursor-pointer"
                            />
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
            </div>
        </div>
      </main>
    </div>
  );
};

export default Products;
