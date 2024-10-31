// "use client";
// import { useAppContext } from "@/context/AppContext";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";
// import { useAuth0 } from "@auth0/auth0-react";

// const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
//   const { isLoggedIn } = useAppContext();
//   const {isAuthenticated} = useAuth0();
//   const router = useRouter();

//   const userData = localStorage.getItem("userData");

//   useEffect(() => {
//     if ( !isLoggedIn && !isAuthenticated && !userData) {
//       router.push("/Login");
//     }
//   }, [isLoggedIn, isAuthenticated,router]);

//   return (isLoggedIn || isAuthenticated) ? <>{children}</> : null;
// };

// export default ProtectedRoutes;
"use client";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth0();
  const { isLoggedIn } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/Login"); 
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !isLoggedIn) {
    return <p>Cargando...</p>; 
  }

  return <>{children}</>;
};

export default ProtectedRoutes;
