"use client";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn } = useAppContext();
  const {isAuthenticated} = useAuth0();
  const router = useRouter();

  const userData = localStorage.getItem("userData");

  useEffect(() => {
    if ( !isLoggedIn && !isAuthenticated && !userData) {
      router.push("/Login");
<<<<<<< HEAD
    } else if (isLoggedIn) {
      router.push("/GestionInventario")
    } 
  }, [isLoggedIn, router]);
=======
    }
  }, [isLoggedIn, isAuthenticated,router]);
>>>>>>> 4fa252904c1dec3d388a4c46540b30a73ba7daad

  return (isLoggedIn || isAuthenticated) ? <>{children}</> : null;
};

export default ProtectedRoutes;
