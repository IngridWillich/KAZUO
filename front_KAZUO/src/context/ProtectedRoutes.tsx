"use client"
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/Login");
    }
  }, [isLoggedIn, router]);

  return isLoggedIn ? <>{children}</> : null;
};

export default ProtectedRoutes;