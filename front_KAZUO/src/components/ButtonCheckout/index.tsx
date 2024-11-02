'use client'
import React from 'react';

interface ButtonCheckoutProps {
  priceId: string;
}

const ButtonCheckout: React.FC<ButtonCheckoutProps> = ({ priceId }) => {
  const handleCheckout = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/stripe/checkout`, {
        method: 'POST',
        body: JSON.stringify({ priceId }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(`Error: ${errorData.message || 'Unknown error'}`);
      }

      const data = await res.json();
      window.location.href = data.url;
    } catch (error) {
      console.error('Error during checkout:', error);
      alert('Hubo un problema al iniciar el proceso de checkout. Inténtalo de nuevo.');
    }
  };

  return (
    <button
      className="w-full bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 transition-transform duration-300 ease-in-out text-white py-2 rounded-xl text-center font-semibold shadow-md hover:scale-105"
      onClick={handleCheckout}
    >
      Adquirir Kazuo Pro
    </button>
  );
};

export default ButtonCheckout;
