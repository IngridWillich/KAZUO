"use client";

import { IEditStoreProps, IProduct } from "@/interfaces/types";
import { useAuth0 } from "@auth0/auth0-react";
import { socket } from "@/services/socket";
import { useEffect, useState, useRef } from "react";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import {
  faCircleInfo,
  faEdit,
  faMinus,
  faPlus,
  faTrash,
  faChartLine
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaPlusSquare } from "react-icons/fa";
import { FaCircleInfo, FaInfo, FaPlus } from "react-icons/fa6";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons/faInfoCircle";
import { Link } from "lucide-react";
import Loader from "../Loader/Loader";
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import Swal from "sweetalert2";


const Products: React.FC<IEditStoreProps> = ({ storeId }) => {
  const router = useRouter();
  const { userData } = useAppContext();
  const { user, isAuthenticated } = useAuth0();


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
    window.history.back();
  };

 

const handleGenerateReport = async () => {
  try {
    const response = await fetch(`${kazuo_back}/informes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        storeId: storeId,
        products: products,
        tipo: "inventario",
      }),
    });

    if (!response.ok) {
      throw new Error("Error al generar el informe");
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'informe_inventario.pdf';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);

    Swal.fire({
      title: "Informe generado",
      text: "El informe se ha generado y descargado correctamente.",
      icon: "success",
      confirmButtonText: "Aceptar",
    });
  } catch (error) {
    console.error("Error:", error);
    Swal.fire({
      title: "Error",
      text: "No se pudo generar el informe. Por favor, inténtalo de nuevo.",
      icon: "error",
      confirmButtonText: "Aceptar",
    });
  }
}

const handleNavigateToProductPage = (productId: string) => {
  if (userData || isAuthenticated) {
    router.push(`/Products/${storeId}/${productId}`);
  } else {
    router.push("/login");
  }
};

const handleAddProduct = (productId: string) => {
  Swal.fire({
    title: '¿Cuántos Productos se añadirán?',
    input: 'number',
    inputLabel: 'Añadir productos',
    inputPlaceholder: 'Ingrese la cantidad',
    showCancelButton: true,
    inputValidator: (value) => {
      const numValue = Number(value);
      if (isNaN(numValue) || numValue <= 0) {
        return 'Por favor, ingrese una cantidad válida';
      }
    }
  }).then((result) => {
    if (result.isConfirmed) {
      const quantityChange = Number(result.value);
      updateProductQuantity(productId, quantityChange);
      console.log(quantityChange);
    }
  });
};


const handleNewOrderProduct = (productId: string) => {
  Swal.fire({
    title: '¿Cuántos productos se despacharán?',
    input: 'number',
    inputLabel: 'Generar despacho',
    inputPlaceholder: 'Ingrese la cantidad',
    showCancelButton: true,
    inputValidator: (value) => {
      if (!value || Number(value) <= 0) {
        return 'Por favor, ingrese una cantidad válida';
      }
    }
  }).then((result) => {
    if (result.isConfirmed) {
      const quantityChange = Number(result.value);      
        updateProductQuantity(productId, -quantityChange); 
       
    }
  });
};
const updateProductQuantity = async (productId: string, quantityChange: number) => {
  console.log(quantityChange)
  const product = products.find(p => p.id === productId);
  if (!product) return;
  

  const newQuantity = Number(product.quantity) + (Number(quantityChange));
  console.log(product.quantity)


  try {
    const response = await fetch(`${kazuo_back}/product/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userData?.token}`,
      },
      body: JSON.stringify({ quantity: Number(newQuantity) }),
    });

    if (response.ok) {
      setProducts(products.map(p => 
        p.id === productId ? { ...p, quantity: newQuantity } : p
      ));
      Swal.fire('Éxito', 'Cantidad actualizada correctamente', 'success');
    } else {
      throw new Error('Error al actualizar la cantidad');
    }
  } catch (error) {
    console.error('Error:', error);
    Swal.fire('Error', 'No se pudo actualizar la cantidad', 'error');
  }
};

  return (
    <div className="w-full min-h-screen flex flex-col justify-center bg-gray-100">
      <main className="w-full flex-grow container mx-auto px-4 py-8">
        <div className="rounded-md p-8 md:w-2/3 mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              {storeName || "Cargando el nombre de la bodega"}
            </h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition duration-300 ease-in-out"
                onClick={handleGenerateReport}
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
            <a href="#" onClick={handleBack}>
              Volver
            </a>
          </div>
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
                          <td className="grid grid-cols-2 grid-rows-2 gap-6 py-2 text-center">
                          <FontAwesomeIcon
                            icon={faEdit}
                            className="text-blue-500 hover:text-blue-600 cursor-pointer mx-1"
                            onClick={() => handleNavigateToProductPage(product.id!)}
                          />
                          <FontAwesomeIcon
                            icon={faChartLine}
                            className="cursor-pointer mx-1"
                          />                          
                          <FontAwesomeIcon icon={faPlus} className="cursor-pointer mx-1" onClick={()=>handleAddProduct(product.id!)} />
                          <FontAwesomeIcon icon={faMinus} className="cursor-pointer mx-1"  onClick={() => handleNewOrderProduct(product.id!)}  />
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
