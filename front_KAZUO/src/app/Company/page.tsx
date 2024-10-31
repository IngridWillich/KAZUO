import Company from "@/components/Company";
import ProtectedRoutes from "@/context/ProtectedRoutes";




function company() {
    
    return (
        <div>
          <ProtectedRoutes>
            
          <Company />
          </ProtectedRoutes>

        </div>
    );
}

export default company;