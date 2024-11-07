"use client";
import { useState } from "react";
import { validateEmail } from "@/helpers/validate";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const RecoverPassForm = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const kazuo_back = process.env.NEXT_PUBLIC_API_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("El email no es valido, por favor ingresa un email valido");
      return;
    }
    try {
      const response = await fetch(
        `${kazuo_back}/auth/request-password-reset`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );
      if (response.ok) {
        Swal.fire({
          title:
            "¡Correo enviado, revisa tu bandeja de entrada y sigue las instrucciones!",
          text: "Revisa tu bandeja de entrada y sigue las instrucciones",
          icon: "warning",
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
        router.push("/Login");
      } else {
        throw new Error("Error al enviar el correo");
      }
    } catch (error) {
      Swal.fire({
        title: "Error al procesar tu solicitud",
        text: "Inténtalo nuevamente",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    } finally {
      console.log({ email });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg mt-6 mb-6 rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700 uppercase">
          Recupera tu contraseña
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-bold text-gray-700"
            >
              Email:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>

          <button
            type="submit"
            //   disabled={!isFormValid}
            className="w-full py-2 px-4 text-white font-semibold rounded-md shadow-sm bg-gray-900 hover:bg-gray-800 cursor-pointer"
          >
            Enviar correo de recuperación
          </button>
        </form>
      </div>
    </div>
  );
};
export default RecoverPassForm;
