"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";

interface ButtonCheckoutProps {
  priceId: string;
  userEmail: string;
}

const ButtonCheckout: React.FC<ButtonCheckoutProps> = ({
  priceId,
  userEmail,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { userData } = useAppContext();
  const router = useRouter();

  const handleCheckout = async () => {
    setIsLoading(true);
    if (!userData?.token) {
      router.push("/Register");
    }
    try {
      console.log("Iniciando checkout con priceId:", priceId);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/stripe/create-checkout-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ priceId, userEmail }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        console.error("Respuesta de error del servidor:", data);
        throw new Error(data.message || "Error al procesar el pago");
      }

      console.log("Respuesta del servidor:", data);

      if (!data.url) {
        throw new Error("No se recibió la URL de checkout");
      }

      window.location.href = data.url;
    } catch (error) {
      console.error("Error durante el checkout:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      className="w-full bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 transition-transform duration-300 ease-in-out text-white py-2 rounded-xl text-center font-semibold shadow-md hover:scale-105"
      onClick={handleCheckout}
      disabled={isLoading}
    >
      {isLoading ? "Procesando..." : "Adquirir Kazuo Pro"}
    </Button>
  );
};

export default ButtonCheckout;
