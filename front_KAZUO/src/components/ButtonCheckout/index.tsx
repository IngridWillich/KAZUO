'use client'
import React from 'react';

interface ButtonCheckoutProps {
  priceId: string;
}

const ButtonCheckout: React.FC<ButtonCheckoutProps> = ({ priceId }) => {
  const handleCheckout = async () => {
    try {
      // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
      const res = await fetch(`api/checkout`, {
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
    window.location.href = data.url; // Redirige al usuario a la URL de checkout
  } catch (error) {
    console.error('Error during checkout:', error);
    alert('Hubo un problema al iniciar el proceso de checkout. Inténtalo de nuevo.');
  }
};

return (
  <button className="bg-blue-700 px-4 py-2 rounded-xl text-zinc-50" onClick={handleCheckout}>
    Buy
  </button>
);
};

export default ButtonCheckout;
