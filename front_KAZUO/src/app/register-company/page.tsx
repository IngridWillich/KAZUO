import CompanyRegistrationForm from "@/components/RegisterCompany";
import ProtectedRoutes from "@/context/ProtectedRoutes";



function companyregister() {
    
    return (
        <div>
          <ProtectedRoutes>

          <CompanyRegistrationForm />
          </ProtectedRoutes>
        </div>
    );
}

export default companyregister;