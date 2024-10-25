'use client'

import React from 'react'

interface ButtonCheckoutProps {
    priceId: string; // Declaramos explícitamente el tipo de priceId
}

const ButtonCheckout: React.FC<ButtonCheckoutProps> = ({ priceId: prod_R5KtXUYt04c4IL }) => {
    const handleCheckout = async () => {
        try {
            const res = await fetch('/api/checkout', {
                method: 'POST',
                body: JSON.stringify({ priceId: prod_R5KtXUYt04c4IL }),
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            // Verificar si la respuesta es válida antes de intentar parsearla
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await res.json();
            window.location.href = data.url;
        } catch (error) {
            console.error('Error during checkout:', error);
        }
    }

    return (
        <div>
            <button
                className="bg-blue-700 px-4 py-2 rounded-xl text-zinc-50"
                onClick={handleCheckout}
            >
                Buy
            </button>
        </div>
    );
}

export default ButtonCheckout;
