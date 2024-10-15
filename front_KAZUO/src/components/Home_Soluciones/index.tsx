"use client";
import { IProduct } from '@/interfaces';
import { useEffect, useState } from 'react';
import { FaUserGraduate } from 'react-icons/fa';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("stock");
  const [products, setProducts] = useState<IProduct[]>([]);
  const [lowStockProducts, setLowStockProducts] = useState<IProduct[]>([]);
  const [newProduct, setNewProduct] = useState({ name: '', quantity: 0 });

  
  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products'); // Cambiar por api del back 
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
          // Actualiza la lista de productos después de agregar uno nuevo
          const updatedProducts = await response.json();
          setProducts(updatedProducts);
          setNewProduct({ name: '', quantity: 0 }); // Limpia el formulario
        } else {
          console.error('Failed to add product');
        }
      } catch (error) {
        console.error('Error adding product:', error);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         
          <div className="bg-white shadow-md rounded-md p-4 md:col-span-1">
            <h2 className="text-xl font-semibold mb-4">Información de Usuario</h2>
            <p><strong>Nombre:</strong> Juan Pérez</p>
            <p><strong>Email:</strong> juan@example.com</p>
            <p><strong>Plan:</strong> Kazuo Pro</p>
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
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              />
              <input
                type="number"
                className="border p-2 rounded w-1/4 mr-2"
                placeholder="Cantidad"
                value={newProduct.quantity}
                onChange={(e) => setNewProduct({ ...newProduct, quantity: parseInt(e.target.value) })}
              />
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                onClick={handleAddProduct}
              >
                Agregar Producto
              </button>
            </div>

            {/* Tabs */}
            <div>
              <div className="flex space-x-4 border-b">
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

              {/* Tab Content */}
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
          </div>
        </div>
      </main>
    </div>
  );
}
