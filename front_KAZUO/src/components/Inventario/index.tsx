"use client";
import { ICategory, IStore } from "@/interfaces/types";
import { useEffect, useState, useRef } from "react";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useAuth0 } from "@auth0/auth0-react";
import { Menu, Transition } from "@headlessui/react";
import { BiDotsHorizontal } from "react-icons/bi";

import Loader from "../Loader/Loader";
import Link from "next/link";
import { Underline } from "lucide-react";

const Inventario: React.FC = () => {
  const [store, setStore] = useState<IStore[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { userData, setUserData } = useAppContext();
  const { user, isAuthenticated } = useAuth0();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const kazuo_back = process.env.NEXT_PUBLIC_API_URL;
  const [previewImage, setPreviewImage] = useState(userData?.igmUrl);
  const cloud_name = process.env.CLOUDINARY_CLOUD_NAME;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(
        `${kazuo_back}/files/uploadProfileImage/${userData?.id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${userData?.token}`, // Si es necesario, incluye el token de autorización
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Error al subir la imagen");
      }

      const data = await response.json();
      // Actualizar la URL de la imagen en el contexto
      setUserData((prevUserData) => ({
        ...prevUserData!,
        imgUrl: data.imgUrl, // Aquí recibes la nueva URL de la imagen del backend
      }));
      if (userData?.igmUrl) {
        delete userData.igmUrl;
      }
      if (userData) {
        userData.igmUrl = data.imgUrl;
        localStorage.setItem("userData", JSON.stringify(userData));
      }
      window.location.reload();
    } catch (error: any) {
      setError(error.message || "Hubo un error al cargar la imagen");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePencilClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleDeleteStore = async (
    event: React.MouseEvent<HTMLButtonElement>,
    storeId: string
  ) => {
    const confirmed = await Swal.fire({
      title: "¿Estás seguro que desea eliminar la bodega?",
      text: "No podrás deshacer esta acción.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (confirmed.isConfirmed) {
      setLoading(true); // Inicia el loader
      try {
        const response = await fetch(`${kazuo_back}/store/${storeId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",

            Authorization: `Bearer ${userData?.token}`,
          },
        });
        console.log(userData?.token);

        if (response.ok) {
          setStore((prevStore) =>
            prevStore.filter((bodega) => bodega.id !== storeId)
          );
          Swal.fire("Eliminado", "La bodega ha sido eliminada.", "success");
        } else {
          Swal.fire(
            "Error",
            "No puedes eliminar esta bodega, por que tiene productos. Vacia la bodega",
            "error"
          );
        }
      } catch (error) {
        Swal.fire("Error", "Ocurrió un error al eliminar la bodega.");
      } finally {
        setLoading(false);
      }
    }
  };

  const getCategoryName = (categoryId: string) => {
    const categoriesFromStorage: ICategory[] = JSON.parse(
      localStorage.getItem("Categorias") || "[]"
    );
    const category = categoriesFromStorage.find((cat) => cat.id === categoryId);
    return category ? category.name : "Categoría no encontrada";
  };

  // FUNCION POR PETICION0ES CRUD
  useEffect(() => {
    const fetchStores = async () => {
      if (userData || isAuthenticated) {
        const userId = userData ? userData.id : user?.sub;

        try {
          const response = await fetch(
            `${kazuo_back}/companies/AllStoresCompany/${userData?.company}`
          );
          const dataStore = await response.json();

          const storeInfo =
            dataStore[0]?.stores.map((store: any) => ({
              id: store?.id || "",
              name: store?.name || "",
              categoryName: store?.category?.name || "",
              categoryId: store?.category?.id || "",
            })) || [];

          setStore(storeInfo);
        } catch (error) {
          console.error("No se pudo cargar las bodegas ", error);
          setStore([]);
        }
      }
    };

    fetchStores();
  }, []);

  const filteredStores = Array.isArray(store)
    ? store.filter(
        (bodega) =>
          bodega.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          getCategoryName(bodega.categoryId)
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
      )
    : [];

  useEffect(() => {
    console.log(`Token: ${userData?.token}`);

    const handlefetchCategories = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${kazuo_back}/category`);
        const dataCategory = await response.json();
        localStorage.setItem("Categorias", JSON.stringify(dataCategory));
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    handlefetchCategories();
  }, []);

  const handleNavigateToCreateStore = () => {
    if (userData || isAuthenticated) {
      router.push("/storeform");
    } else {
      router.push("/login");
    }
  };

  const handleNavigateToEditStore = (
    event: React.MouseEvent<HTMLButtonElement>,
    storeId: string
  ) => {
    if (userData || isAuthenticated) {
      router.push(`/storeform/${storeId}`);
    } else {
      router.push("/login");
    }
  };

  const handleNavigateToStorePage = (
    event: React.MouseEvent<HTMLButtonElement>,
    storeId: string
  ) => {
    if (userData || isAuthenticated) {
      router.push(`/Products/${storeId}`);
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Información de Usuario */}
      <div className="bg-white shadow-md rounded-md p-4 mb-8">
        <h2 className="text-xl font-semibold mb-4">Información de Usuario</h2>
        <div className="relative flex items-center justify-center mb-4">
          <div>
            <h2>Subir Imagen de Perfil</h2>
            {userData?.igmUrl && (
              <img src={userData.igmUrl} alt="Imagen de perfil" width={100} />
            )}
            <div>
              <input type="file" accept="image/*" onChange={handleFileChange} />
              <button onClick={handleUpload} disabled={isLoading}>
                {isLoading ? "Subiendo..." : "Subir Imagen"}
              </button>
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>}
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
            onChange={handleUpload}
          />
        </div>

        <p>
          <strong>Nombre: </strong>
          {isAuthenticated ? user?.name : userData?.name}
        </p>
        <p>
          <strong>Email: </strong>
          {isAuthenticated ? user?.email : userData?.email}
        </p>
        <p>
          <strong>Plan: </strong>
          {userData?.isAdmin ? "Kazuo Pro" : "Free"}
        </p>
        <p>
          <Link href={"/Company"}>
            <strong className="text-green-800">Ir a Mi Empresa</strong>
          </Link>
        </p>

        <button
          className={`mt-4 px-4 py-2 rounded text-white ${
            userData?.isAdmin
              ? "bg-green-600 hover:bg-green-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          onClick={() => router.push("/register-company")}
          disabled={!userData?.isAdmin}
        >
          Registrar Empresa
        </button>
      </div>

      {/* Encabezado de Inventario */}

      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">
          Gestión de Inventario
        </h2>
        <div className="space-x-4">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            onClick={handleNavigateToCreateStore}
          >
            Crear Bodega
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar bodegas por nombre o categoría"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-[50vh]"
        />
      </div>

      {/* Show message or stores */}
      {loading ? (
        <Loader message="Cargando bodegas..." />
      ) : searchQuery === "" ? (
        store && store.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1 mt-8">
            {store.map((bodega) => (
              <div
                key={bodega.id}
                className="grid grid-cols-5 grid-rows-5 gap-1 bg-white shadow-lg rounded-lg p-6 w-content"
              >
                <div className="col-span-4 row-span-3">
                  <h3 className="text-lg font-semibold mb-2">{bodega.name}</h3>
                </div>
                <div className="col-span-4 row-span-2 col-start-1 row-start-4">
                  <p className="text-gray-500 mb-4">
                    Categoría: {getCategoryName(bodega.categoryId)}
                  </p>
                </div>
                <div className="col-start-5 row-start-1">
                  <Menu as="div" className="relative ">
                    <Menu.Button className="flex items-center text-gray-400 hover:text-gray-600">
                      <BiDotsHorizontal
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                    <Transition
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="px-1 py-1">
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={`mt-4 px-4 py-2 rounded text-white ${
                                  userData?.isAdmin
                                    ? "bg-blue-500 hover:bg-blue-700"
                                    : "bg-gray-400 cursor-not-allowed"
                                }`}
                                onClick={(e) =>
                                  handleNavigateToEditStore(e, bodega.id)}
                                disabled={!userData?.isAdmin}
                              >
                                Modificar
                              </button>
                            )}
                          </Menu.Item>
                          <br />
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={`mt-4 px-4 py-2 rounded text-white ${
                                  userData?.isAdmin
                                    ? "bg-red-600 hover:bg-red-700"
                                    : "bg-gray-400 cursor-not-allowed"
                                }`}
                                onClick={()=>handleDeleteStore}
                                disabled={!userData?.isAdmin}
                              >
                                Eliminar
                              </button>
                            )}
                          </Menu.Item>
                          <br />
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={`${
                                  active
                                    ? "bg-green-500 text-white"
                                    : "text-gray-900"
                                } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                onClick={(e) =>
                                  handleNavigateToStorePage(e, bodega.id)
                                }
                              >
                                Entrar
                              </button>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-600 text-lg mt-4">
            Aún no tienes bodegas creadas.
          </div>
        )
      ) : filteredStores.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
          {filteredStores.map((bodega) => (
            <div
              key={bodega.id}
              className="grid grid-cols-5 grid-rows-5 gap-1 bg-white shadow-lg rounded-lg p-6 w-content"
            >
              <div className="col-span-4 row-span-3">
                <h3 className="text-lg font-semibold mb-2">{bodega.name}</h3>
              </div>
              <div className="col-span-4 row-span-2 col-start-1 row-start-4">
                <p className="text-gray-500 mb-4">
                  Categoría: {getCategoryName(bodega.categoryId)}
                </p>
              </div>
              <div className="col-start-5 row-start-1">
                <Menu as="div" className="relative ">
                  <Menu.Button className="flex items-center text-gray-400 hover:text-gray-600">
                    <BiDotsHorizontal className="h-5 w-5" aria-hidden="true" />
                  </Menu.Button>
                  <Transition
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="px-1 py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`${
                                active
                                  ? "bg-blue-500 text-white"
                                  : "text-gray-900"
                              } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                              onClick={(e) =>
                                handleNavigateToEditStore(e, bodega.id)
                              }
                            >
                              Modificar
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`${
                                active
                                  ? "bg-red-500 text-white"
                                  : "text-gray-900"
                              } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                              onClick={(e) => handleDeleteStore(e, bodega.id)}
                            >
                              Eliminar
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`${
                                active
                                  ? "bg-green-500 text-white"
                                  : "text-gray-900"
                              } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                              onClick={(e) =>
                                handleNavigateToStorePage(e, bodega.id)
                              }
                            >
                              Entrar
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-600 text-lg mt-4">
          No se encontraron bodegas que coincidan con su búsqueda.
        </div>
      )}
    </div>
  );
};
export default Inventario;
