"use client";
import { IProduct } from '@/interfaces/types';
import { useEffect, useState, useRef } from 'react';
import { useAppContext } from '@/context/AppContext';

export default function Products() {

  const [activeTab, setActiveTab] = useState("stock");
  const [products, setProducts] = useState<IProduct[]>([]);
  const [lowStockProducts, setLowStockProducts] = useState<IProduct[]>([]);
  const [newProduct, setNewProduct] = useState({ name: '', quantity: 0 });
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { userData } = useAppContext();

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data.products);
      setLowStockProducts(data.lowStockProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = async () => {
    if (newProduct.name && newProduct.quantity > 0) {
      try {
        const response = await fetch('/api/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newProduct),
        });

        if (response.ok) {
          const updatedProducts = await response.json();
          setProducts(updatedProducts);
          setNewProduct({ name: '', quantity: 0 });
        } else {
          console.error('Failed to add product');
        }
      } catch (error) {
        console.error('Error adding product:', error);
      }
    } else {
      console.error('La cantidad debe ser mayor que 0');
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
    }
  };

  const handlePencilClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center ">
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className=" rounded-md p-8 md:w-2/3 mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Gestión de Productos</h2>
          </div>

          <div className="mb-6">
            <input
              type="text"
              className="border p-2 rounded w-1/2 mr-2"
              placeholder="Nombre del Producto"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />
            <input
              type="number"
              className="border p-2 rounded w-1/4 mr-2"
              placeholder="Cantidad"
              value={newProduct.quantity}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (value >= 0) {
                  setNewProduct({ ...newProduct, quantity: value });
                }
              }}
            />
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              onClick={handleAddProduct}
            >
              Agregar Producto
            </button>
          </div>

          <div className="mb-4">
            <div className="flex space-x-4 border-b pb-2">
              <button
                className={`py-2 px-4 ${activeTab === 'stock' ? 'border-b-2 border-blue-600' : ''}`}
                onClick={() => setActiveTab('stock')}
              >
                Stock
              </button>
              <button
                className={`py-2 px-4 ${activeTab === 'low' ? 'border-b-2 border-blue-600' : ''}`}
                onClick={() => setActiveTab('low')}
              >
                Bajo Stock
              </button>
            </div>
          </div>

          {activeTab === "stock" && (
            <div className="mt-4">
              <div className="bg-gray-100 rounded-md p-4">
                <div className="flex justify-between font-medium">
                  <span>Producto</span>
                  <span>Cantidad</span>
                </div>
                {products.map((product, index) => (
                  <div key={index} className="flex justify-between py-2 border-t">
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
                  <div key={index} className="flex justify-between py-2 border-t">
                    <span>{product.name}</span>
                    <span className="text-red-500">{product.quantity}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}