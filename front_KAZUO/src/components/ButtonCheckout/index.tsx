'use client'

import React, { useState } from 'react';
import { Button } from "../ui/button"

interface ButtonCheckoutProps {
  priceId: string;
}

const ButtonCheckout: React.FC<ButtonCheckoutProps> = ({ priceId }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      console.log('Iniciando checkout con priceId:', priceId);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/stripe/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error('Respuesta de error del servidor:', data);
        throw new Error(data.message || 'Error al procesar el pago');
      }

      console.log('Respuesta del servidor:', data);

      if (!data.url) {
        throw new Error('No se recibió la URL de checkout');
      }

      window.location.href = data.url;
    } catch (error) {
      console.error('Error durante el checkout:', error);
      alert('Hubo un problema al iniciar el proceso de checkout. Por favor, inténtalo de nuevo.');
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
      {isLoading ? 'Procesando...' : 'Adquirir Kazuo Pro'}
    </Button>
  );
};

export default ButtonCheckout;