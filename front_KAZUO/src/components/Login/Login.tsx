"use client";

import { useState, useEffect } from "react";
import { ILoginError, ILoginProps } from "@/interfaces/types";
import { validateLoginForm } from "@/helpers/validate";
// import { login } from "@/helpers/auth.helper";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";

const Login: React.FC = () => {
  const kazuo_back = process.env.NEXT_PUBLIC_API_URL
  const router = useRouter();
  const initialState = {
    email: "",
    password: "",
  };

  const [dataUser, setDataUser] = useState<ILoginProps>(initialState);
  const [errors, setErrors] = useState<ILoginError>(initialState);
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({
    email: false,
    password: false,
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const { login } = useAppContext();

  useEffect(() => {
    const hasErrors = Object.keys(errors).length > 0;
    const isEmptyField = !dataUser.email || !dataUser.password;
    setIsButtonDisabled(hasErrors || isEmptyField);
  }, [errors, dataUser]);

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name } = event.target;
    setTouched({
      ...touched,
      [name]: true,
    });

    const updatedErrors = validateLoginForm({
      ...dataUser,
      [name]: event.target.value,
    });
    setErrors(updatedErrors);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setDataUser({
      ...dataUser,
      [name]: value,
    });

    const updatedErrors = validateLoginForm({
      ...dataUser,
      [name]: value,
    });
    setErrors(updatedErrors);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const currentErrors = validateLoginForm(dataUser);
    setErrors(currentErrors);

    if (Object.keys(currentErrors).length === 0) {
      console.log("Datos del formulario:", dataUser);
      try {
        const response = await fetch(`${kazuo_back}/auth/signin`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataUser),
        });

        if (response.ok) {
            const loginData = await response.json();
            await login(loginData);
          Swal.fire({
            title: "¡Inicio de sesión exitoso!",
            text: "Te has iniciado sesión correctamente.",
            icon: "success",
            confirmButtonText: "Aceptar",
          });
          router.push("/gestioninventario");
          console.log(response)
        }
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "Credenciales incorrectas. Por favor, inténtalo de nuevo.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700">
          INICIAR SESIÓN
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={dataUser.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {touched.email && errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Contraseña:
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={dataUser.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            {touched.password && errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={isButtonDisabled}
            className={`w-full py-2 px-4 text-white ${
              isButtonDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : " bg-gray-900 hover:bg-gray-800"
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-md`}
          >
            Iniciar Sesión
          </button>
        </form>
        <p className="text-center text-sm text-gray-600">
          ¿No tienes una cuenta?{" "}
          <Link
            href="/register"
            className="text-indigo-400 hover:text-indigo-500"
          >
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
