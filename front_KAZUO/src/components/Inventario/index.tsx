"use client";
import { ICategory, IEditStoreProps, InventarioProps, IProduct, IStore } from "@/interfaces/types";
import { useEffect, useState, useRef } from "react";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Link from "next/link";
import { useAuth0 } from "@auth0/auth0-react";

const Inventario: React.FC = () => {
  const [store, setStore] = useState<IStore[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { userData, setUserData } = useAppContext();
  const [profileImage, setProfileImage] = useState(userData?.igmUrl);


  const {user, isAuthenticated}=useAuth0()
  const router = useRouter();
  const kazuo_back = process.env.NEXT_PUBLIC_API_URL;

  const fetchUserImage = async (userId: string) => {
    try {
      const response = await fetch(`${kazuo_back}/users/${userId}`);
      if (!response.ok) {
        throw new Error('Error al obtener la imagen del usuario');
      }
      const userData = await response.json();
      return userData.igmUrl; // Suponiendo que la URL de la imagen está en la propiedad imgUrl
    } catch (error) {
      console.error('Error fetching user image:', error);
      return null;
    }
  };
  useEffect(() => {
    // Cargar imagen desde userData o localStorage
    const storedUserData = JSON.parse(localStorage.getItem("userData") || "{}");
    if (userData?.igmUrl || storedUserData?.igmUrl) {
      setProfileImage(userData?.igmUrl || storedUserData.igmUrl);
    }
  }, [userData]);
  
  

 
 const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  const userId = localStorage.getItem("userData") 
    ? JSON.parse(localStorage.getItem("userData")!).id 
    : null;

  if (file && userId) {
    // Convertir a URL para vista previa
    const reader = new FileReader();
    reader.onload = () => setProfileImage(reader.result as string);
    reader.readAsDataURL(file);

    // Crear FormData para la subida
    const formData = new FormData();
    formData.append("file", file);
    formData.append("id", userId.toString());

    try {
      const response = await fetch(`${kazuo_back}/files/uploadProfileImage`, {
        method: "POST",
        headers: { Authorization: `Bearer ${userData?.token}` },
        body: formData,
      });

      if (response.ok) {
        try {
          const data = await response.json();
      
          // Actualiza la URL de la imagen en el estado local para renderizar la vista previa de inmediato
          setProfileImage(data.imageUrl);

          // Actualiza userData en el contexto y en el localStorage
          if (userData && setUserData) {
            const updatedUserData = { ...userData, igmUrl: data.imageUrl };
            setUserData(updatedUserData); // Actualiza userData en el contexto
            localStorage.setItem("userData", JSON.stringify(updatedUserData)); // Guarda la actualización en localStorage
          }
        } catch (error) {
          console.error("Error al actualizar userData o profileImage:", error);
          Swal.fire("Error", "Ocurrió un error al procesar la respuesta del servidor.", "error");
        }
      } else {
        const errorData = await response.json();
        Swal.fire("Error", `Error al subir la imagen: ${errorData.message}`, "error");
      }
      
    } catch (error) {
      Swal.fire("Error", "Ocurrió un error al subir la imagen.", "error");
    }
  }
};

  
  
  const handlePencilClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleDeleteStore = async (event: React.MouseEvent<HTMLButtonElement>, storeId: string) => {
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
      try {
        const response = await fetch(`${kazuo_back}/store/${storeId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          setStore((prevStore) =>
            prevStore.filter((bodega) => bodega.id !== storeId)
          );
          Swal.fire("Eliminado", "La bodega ha sido eliminada.", "success");
        } else {
          Swal.fire(
            "Error",
            "No se pudo eliminar la bodega. Verifica el servidor.",
            "error"
          );
        }
      } catch (error) {
        Swal.fire("Error", "Ocurrió un error al eliminar la bodega.", "error");
      }
    }
  };

  useEffect(() => {
    const fetchStores = async () => {
      if(userData){
        const userId = userData.id;
      
      try {
        const response = await fetch(`${kazuo_back}/store/user/${userId}`);
        const dataStore = await response.json();
        setStore(dataStore);
        console.log(dataStore)
      } catch (error) {
        console.error("No se pudo cargar las bodegas ", error);
      }
    }
    };
    fetchStores();
  }, []);
  useEffect(() => {
    const handlefetchCategories = async () => {
      try {
        const response = await fetch(`${kazuo_back}/category`);
        const dataCategory = await response.json();
        localStorage.setItem("Categorias", JSON.stringify(dataCategory));
      } catch (error) {
        console.log(error);
      }
    };
    handlefetchCategories();
  }, []);

  const handleNavigateToCreateStore = () => {
    if (userData) {
      router.push("/storeform");
    } else {
      router.push("/login");
    }
  };

const handleNavigateToEditStore = (event: React.MouseEvent<HTMLButtonElement>, storeId: string) => {
  if (userData) {
    router.push(`/storeform/${storeId}`);
  } else {
    router.push("/login");
  }
};

const handleNavigateToStorePage = (event: React.MouseEvent<HTMLButtonElement>, storeId: string) => {
  if (userData) {
    router.push(`/Products/${storeId}`);
  } else {
    router.push("/login");
  }
};

const getCategoryName = (categoryId: string) => {
  const categoriesFromStorage: ICategory[] = JSON.parse(
    localStorage.getItem("Categorias") || "[]"
  );
  const category = categoriesFromStorage.find(cat => cat.id === categoryId);
  return category ? category.name : "Categoría no encontrada";
};

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Información de Usuario */}
      <div className="bg-white shadow-md rounded-md p-4 mb-8">
        <h2 className="text-xl font-semibold mb-4">Información de Usuario</h2>
        <div className="relative flex items-center justify-center mb-4">
          <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden">
            {profileImage ? (
             <img
             src={profileImage}
             alt="Profile"
             className="object-cover w-full h-full"
           />
         ) : user?.picture ? (
           <img
             src={user.picture}
             alt="Profile"
             className="object-cover w-full h-full"
           />
         ) : (
           <span className="text-gray-500">No image</span>
         )}
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
            onChange={handleImageUpload}
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
          <strong>Plan:</strong> Kazuo Pro
        </p>
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

      {/* Mostrar mensaje o bodegas */}
      {store && store.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
          {store.map((bodega) => (
            <div key={bodega.id} className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">{bodega.name}</h3>
              <p className="text-gray-500 mb-4">
                Categoría: {getCategoryName(bodega.categoryId)}
              </p>
              <div className="flex justify-between">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded" onClick={(e)=>handleNavigateToEditStore(e, bodega.id)}>
                  Modificar
                </button>
                <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded" onClick={(e) => handleDeleteStore(e, bodega.id)}>
                  Eliminar
                </button>
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"onClick={(e) => handleNavigateToStorePage(e, bodega.id)}> 
                  Entrar
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-600 text-lg mt-4">
          Aún no tienes bodegas creadas.
        </div>
      )}
    </div>
  );
};

export default Inventario;
