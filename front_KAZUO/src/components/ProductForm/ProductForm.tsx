"use client";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import {
  IEditStoreProps,
  IProduct,
  IProductsErrors,
  userData,
} from "@/interfaces/types";
import { validateProductForm } from "@/helpers/validate";
import * as XLSX from "xlsx";
import { useAppContext } from "@/context/AppContext";
import Loader from "../Loader/Loader";
import { ArrowLeft, Loader2 } from "lucide-react";
import { FaDownload } from "react-icons/fa";
import Loader1 from "../Loader/Loader1";

const ProductForm: React.FC<IEditStoreProps> = ({ storeId }) => {
  const { userData } = useAppContext();
  const kazuo_back = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loadingTemplate, setLoadingTemplate] = useState(false);

  const [formData, setFormData] = useState<IProduct>({
    name: "",
    quantity: 0,
    unids: "",
    maxCapacity: 0,
    inPrice: 0,
    bange: "",
    outPrice: 0,
    minStock: 0,
    userId: "",
    storeId: "",
  });
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [exchangeRates, setExchangeRates] = useState<{ [key: string]: number }>(
    {}
  );

  const [errors, setErrors] = useState<IProductsErrors>({});

  const areFieldsFilled = () => {
    return (
      formData.name &&
      formData.quantity &&
      formData.inPrice &&
      formData.minStock &&
      formData.outPrice &&
      formData.unids &&
      formData.maxCapacity &&
      formData.bange
    );
  };

  const convertPrice = (
    price: number,
    fromCurrency: string,
    toCurrency: string
  ) => {
    if (!exchangeRates[fromCurrency] || !exchangeRates[toCurrency])
      return price;
    const priceInUSD = price / exchangeRates[fromCurrency];
    return priceInUSD * exchangeRates[toCurrency];
  };
  // Verificar si el formulario es válido
  const isFormValid = () => {
    return areFieldsFilled() && Object.keys(errors).length === 0;
  };
  const validateField = (name: string, value: string) => {
    const validationErrors = validateProductForm({
      ...formData,
      [name]: value,
    });
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validationErrors[name] || "",
    }));
  };

  const downloadTemplate = () => {
    const fileId = "1e1xuwETRuSMJK1-p6hJa8fWTb8Xj3y6j";
    const exportUrl = `https://docs.google.com/spreadsheets/d/${fileId}/export?format=xlsx`;

    fetch(exportUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "plantilla.xlsx";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      })
      .catch((error) => {
        console.error("Error al descargar la plantilla:", error);
        alert(
          "Error al descargar la plantilla. Por favor, intente nuevamente."
        );
      });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = new Uint8Array(event.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        const range = XLSX.utils.decode_range("B4:I1000");
        const productsData: IProduct[] = [];
        for (let R = range.s.r + 1; R <= range.e.r; ++R) {
          const row = {
            name: worksheet[XLSX.utils.encode_cell({ r: R, c: 1 })]?.v,
            quantity: worksheet[XLSX.utils.encode_cell({ r: R, c: 2 })]?.v,
            unids: worksheet[XLSX.utils.encode_cell({ r: R, c: 3 })]?.v,
            maxCapacity: worksheet[XLSX.utils.encode_cell({ r: R, c: 4 })]?.v,
            inPrice: worksheet[XLSX.utils.encode_cell({ r: R, c: 5 })]?.v,
            bange: worksheet[XLSX.utils.encode_cell({ r: R, c: 6 })]?.v,
            outPrice: worksheet[XLSX.utils.encode_cell({ r: R, c: 7 })]?.v,
            minStock: worksheet[XLSX.utils.encode_cell({ r: R, c: 8 })]?.v,
          };
          if (row.name) productsData.push(row as IProduct);
        }
        const userId = localStorage.getItem("userData")
          ? JSON.parse(localStorage.getItem("userData")!).id
          : "";
        const productsToSend = productsData.map((product) => ({
          ...product,
          storeId: storeId,
          userId: userId,
        }));

        handleBulkUpload(productsToSend);
      };

      reader.readAsArrayBuffer(file);
    }
  };

  const handleBulkUpload = async (products: IProduct[]) => {
    setLoadingTemplate(true);
    const userData = localStorage.getItem("userData");
    const parsedUserDataToken = JSON.parse(userData!);
    const userToken = parsedUserDataToken.token;
    try {
      const response = await fetch(`${kazuo_back}/product/bulk`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify(products),
      });
      console.log(userToken);
      if (response.ok) {
        Swal.fire({
          title: "Productos Añadidos con éxito",
          text: "Los productos han sido almacenados",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
        router.push(`/Products/${storeId}`);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "No se pudo cargar los productos");
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "No se pudo cargar los productos. Por favor, inténtalo de nuevo.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    } finally {
      setLoadingTemplate(false);
    }
  };

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await fetch(
          "https://api.exchangerate-api.com/v4/latest/USD"
        );
        const data = await response.json();
        setExchangeRates(data.rates);
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      }
    };

    fetchExchangeRates();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "bange") {
      setSelectedCurrency(value);
      const newPrice = convertPrice(formData.outPrice, formData.bange, value);
      const newInPrice = convertPrice(formData.inPrice, formData.bange, value);
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
        outPrice: newPrice,
        inPrice: newInPrice,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
    validateField(name, value);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateProductForm(formData);
    setErrors(validationErrors);
    console.log(formData);
    console.log(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      let userId = "";
      const userData = localStorage.getItem("userData");
      if (userData) {
        const parsedUserData = JSON.parse(userData);
        userId = parsedUserData.id;
      }

      const dataToSend = {
        ...formData,
        quantity: Number(formData.quantity),
        inPrice: Number(formData.inPrice),
        maxCapacity: Number(formData.maxCapacity),
        outPrice: Number(formData.outPrice),
        minStock: Number(formData.minStock),
        userId: userId,
        storeId: storeId,
      };

      try {
        if (userData) {
          const parsedUserDataToken = JSON.parse(userData);
          const userToken = parsedUserDataToken.token;
          setLoading(true);
          const response = await fetch(`${kazuo_back}/product`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userToken}`,
            },
            body: JSON.stringify(dataToSend),
          });
          console.log(`Datos de usuario: ${userToken}`);

          if (response.ok) {
            Swal.fire({
              title: "¡Producto creado!",
              text: "El producto se ha creado correctamente.",
              icon: "success",
              confirmButtonText: "Aceptar",
            });
            router.push(`/Products/${storeId}`);
          } else {
            const errorData = await response.json();
            console.error("Error en la respuesta del servidor:", errorData);
            throw new Error(errorData.message || "Error al crear el producto");
          }
        }
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "Credenciales incorrectas. Por favor, inténtalo de nuevo.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleGenerateReport = async () => {
    try {
      const response = await fetch(`${kazuo_back}/product/report/${storeId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${userData?.id}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Error al generar el informe");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "informe_bodega.pdf";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error:", error);
      // Mostrar un mensaje de error al usuario
    }
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 mt-5">
      <div className="w-full max-w-md mt-5 mb-5 p-8 space-y-6 bg-white shadow-lg rounded-lg">
        <button onClick={handleBack} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
        </button>
        <h2 className="text-2xl font-bold text-center text-blue-700">
          Registrar
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Nombre del Producto:
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Ingrese el nombre del producto"
              required
            />
            {errors.name && <p className="text-red-600">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-gray-700"
            >
              Cantidad:
            </label>
            <input
              type="number"
              name="quantity"
              id="quantity"
              value={formData.quantity}
              onChange={handleChange}
              onBlur={handleBlur}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Ingrese la cantidad"
              min="0"
              required
            />
            {errors.quantity && (
              <p className="text-red-600">{errors.quantity}</p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="unids"
              className="block text-sm font-medium text-gray-700"
            >
              Unidad de medida:
            </label>
            <input
              type="text"
              name="unids"
              id="unids"
              value={formData.unids}
              onChange={handleChange}
              onBlur={handleBlur}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Ingresa el valor como lo cuentas"
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="maxCapacity"
              className="block text-sm font-medium text-gray-700"
            >
              Capacidad máxima:
            </label>
            <input
              type="number"
              name="maxCapacity"
              id="maxCapacity"
              value={formData.maxCapacity}
              onChange={handleChange}
              onBlur={handleBlur}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Ingresa la capacidad máxima de almacenamiento"
              required
            />
          </div>
          {errors.maxCapacity && (
            <p className="text-red-600">{errors.maxCapacity}</p>
          )}
          <div className="space-y-2">
            <label
              htmlFor="bange"
              className="block text-sm font-medium text-gray-700"
            >
              Moneda de uso:
            </label>
            <select
              name="bange"
              id="bange"
              value={formData.bange}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            >
              <option value="">Seleccione una moneda</option>
              <option value="USD">USD</option>
              <option value="MXN">MXN</option>
              <option value="BOB">BOB</option>
              <option value="ARS">ARS</option>
              <option value="COP">COP</option>
              <option value="EUR">EUR</option>
            </select>
            {errors.bange && <p className="text-red-600">{errors.bange}</p>}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="inPrice"
              className="block text-sm font-medium text-gray-700"
            >
              Precio de compra: ({formData.bange})
            </label>
            <input
              type="number"
              name="inPrice"
              id="inPrice"
              value={Number(formData.inPrice).toFixed(2)}
              onChange={handleChange}
              onBlur={handleBlur}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Ingresa el valor por el que lo compraste"
              required
            />
            {errors.inPrice && <p className="text-red-600">{errors.inPrice}</p>}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="outPrice"
              className="block text-sm font-medium text-gray-700"
            >
              Valor de venta ({formData.bange}):
            </label>
            <input
              type="number"
              name="outPrice"
              id="outPrice"
              value={Number(formData.outPrice).toFixed(2)}
              onChange={handleChange}
              onBlur={handleBlur}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Ingresa el valor de venta"
              required
            />
          </div>
          {errors.inPrice && <p className="text-red-600">{errors.inPrice}</p>}
          <div className="space-y-2">
            <label
              htmlFor="minStock"
              className="block text-sm font-medium text-gray-700"
            >
              Cantidad Mínima:
            </label>
            <input
              type="number"
              name="minStock"
              id="minStock"
              value={formData.minStock}
              onChange={handleChange}
              onBlur={handleBlur}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Ingrese la cantidad mínima"
              min="0"
              required
            />
            {errors.minStock && (
              <p className="text-red-600">{errors.minStock}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={!areFieldsFilled()}
            className={`flex items-center justify-center w-full py-2 px-4 text-white rounded-md ${
              areFieldsFilled()
                ? "bg-blue-500 hover:bg-blue-900"
                : "bg-gray-300 cursor-not-allowed"
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
          >
            {loading ? <Loader /> : "Registrar Producto"}
          </button>

          <p className="text-center"></p>

          <button
            onClick={downloadTemplate}
            className="bg-blue-500 text-white rounded w-full flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors duration-200"
            style={{ height: "40px" }}
          >
            <FaDownload className="h-5 w-5" />
            {loadingTemplate ? (
              <div className="flex items-center justify-center">
                <Loader1 />
              </div>
            ) : (
              "Descargar Plantilla"
            )}
          </button>

          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileChange}
            className="mt-4"
          />
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
