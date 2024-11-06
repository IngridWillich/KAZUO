
import Inventario from "@/components/Inventario";
import ProtectedRoutes from "@/context/ProtectedRoutes";

function inventario() {
  return (
    <div>
      {/* <ProtectedRoutes> */}
        <Inventario/>
         
      {/* </ProtectedRoutes> */}
    </div>
  );
}

export default inventario;