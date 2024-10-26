"use client";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn } = useAppContext();
  const router = useRouter();

  const userData = localStorage.getItem("userData");

  useEffect(() => {
    if (!userData) {
      router.push("/Login");
    } else if (isLoggedIn) {
      router.push("/GestionInventario")
    } 
  }, [isLoggedIn, router]);

  return isLoggedIn ? <>{children}</> : null;
};

export default ProtectedRoutes;
