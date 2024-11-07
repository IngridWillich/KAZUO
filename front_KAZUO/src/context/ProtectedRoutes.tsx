"use client";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn } = useAppContext();
  const { isAuthenticated } = useAuth0();
  const router = useRouter();

  const userData = useLocalStorage<string | null>("userData", null);

  useEffect(() => {
    if (!isLoggedIn && !isAuthenticated && !userData) {
      router.push("/Login");
    }
  }, [isLoggedIn, isAuthenticated, router]);

  return isLoggedIn || isAuthenticated ? <>{children}</> : null;
};

export default ProtectedRoutes;
