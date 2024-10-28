
import Inventario from "@/components/Inventario";
import ProtectedRoutes from "@/context/ProtectedRoutes";

function inventario() {
  return (
    <div>
<<<<<<< HEAD
      {/* <ProtectedRoutes> */}
        <Inventario />
      {/* </ProtectedRoutes> */}
=======
      <ProtectedRoutes>
        <Inventario/>
      </ProtectedRoutes>
>>>>>>> 4fa252904c1dec3d388a4c46540b30a73ba7daad
    </div>
  );
}

export default inventario;