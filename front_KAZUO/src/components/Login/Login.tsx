"use client";

import { useState, useEffect } from "react";
import { ILoginError, ILoginProps } from "@/interfaces/types";
import { validateLoginForm } from "@/helpers/validate";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import Loader from "../Loader/Loader";

const Login: React.FC = () => {
  const kazuo_back = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
  const { loginWithRedirect, user, isAuthenticated, getAccessTokenSilently } =
    useAuth0();
  const initialState = {
    email: "",
    password: "",
  };

  const [dataUser, setDataUser] = useState<ILoginProps>(initialState);
  const [loading, setLoading] = useState(false);
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

  useEffect(() => {
    const handleAuthenticationComplete = async () => {
      if (isAuthenticated && user) {
        console.log("User authenticated:", user);

        try {
          const accessToken = await getAccessTokenSilently();
          const response = await fetch(`${kazuo_back}/auth/auth0/callback`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ email: user.email }),
          });

          if (response.ok) {
            const data = await response.json();
            localStorage.setItem("token", data.token);

            Swal.fire({
              title: `¡Bienvenido, ${user.name}!`,
              text: "Has iniciado sesión con Google exitosamente.",
              icon: "success",
              confirmButtonText: "Aceptar",
            }).then(() => {
              router.push("/Soluciones");
            });
          } else {
            throw new Error("Error al procesar el inicio de sesión con Google");
          }
        } catch (error) {
          console.error("Error durante el inicio de sesión con Google:", error);
          Swal.fire({
            title: "Error en el inicio de sesión con Google",
            text: "Ha ocurrido un error. Por favor, inténtalo nuevamente.",
            icon: "error",
            confirmButtonText: "Aceptar",
          });
        }
        setLoading(false);
      } else {
        console.log("Usuario no autenticado");
      }
    };
    handleAuthenticationComplete();
  }, [isAuthenticated, user, getAccessTokenSilently, router, kazuo_back]);

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

  const encryptPassword = async (
    password: string,
    key: CryptoKey
  ): Promise<ArrayBuffer> => {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const iv = window.crypto.getRandomValues(new Uint8Array(12)); // Vector de inicialización de 12 bytes
    return await window.crypto.subtle.encrypt(
      {
        name: "AES-GCM",
        iv,
      },
      key,
      data
    );
  };

  // Función para generar una clave criptográfica
  const generateKey = async (): Promise<CryptoKey> => {
    return await window.crypto.subtle.generateKey(
      {
        name: "AES-GCM",
        length: 256,
      },
      true,
      ["encrypt", "decrypt"]
    );
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const currentErrors = validateLoginForm(dataUser);
    setErrors(currentErrors);

    if (Object.keys(currentErrors).length === 0) {
      setLoading(true); // Activa el loader
      try {
        const key = await generateKey();
        const encryptedPassword = await encryptPassword(dataUser.password, key);
        const encryptedPasswordBase64 = btoa(
          String.fromCharCode(...new Uint8Array(encryptedPassword))
        );
        const response = await fetch(`${kazuo_back}/auth/signin`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataUser),
          // body: JSON.stringify({...dataUser, password: encryptedPasswordBase64}),
        });

        if (response.ok) {
          const loginData = await response.json();
          await login(loginData);
          Swal.fire({
            title: `¡Bienvenido, ${loginData.name}!`,
            text: "Has iniciado sesión correctamente.",
            icon: "success",
            confirmButtonText: "Aceptar",
          });
          router.push(`/GestionInventario`);
        } else {
          Swal.fire({
            title: "Error",
            text: "Credenciales incorrectas. Por favor, inténtalo de nuevo.",
            icon: "error",
            confirmButtonText: "Aceptar",
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "Credenciales incorrectas. Por favor, inténtalo de nuevo.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      } finally {
        setLoading(false); // Desactiva el loader
        console.log("Datos del formulario:", dataUser);
      }
    }
  };

  // const handleGoogleLogin = () => {
  //   loginWithRedirect({
  //     authorizationParams: {
  //       connection: "google-oauth2",
  //     },
  //   });
  // };
  const handleGoogleLogin = () => loginWithRedirect();

  const isFormValid =
    Object.keys(errors).length === 0 && Object.values(touched).every((t) => t);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700">
          INICIAR SESIÓN
        </h2>
        <div>
          <button
            onClick={handleGoogleLogin}
            className="w-full py-2 px-4 bg-white text-gray-700 font-semibold rounded-md shadow-sm hover:bg-gray-50 border border-gray-300 flex items-center justify-center"
          >
            <svg
              className="w-5 h-5 mr-2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Iniciar Sesión con Google
          </button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">O</span>
          </div>
        </div>
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
            className={`w-full py-2 px-4 text-white font-semibold rounded-md shadow-sm flex justify-center items-center ${
              isButtonDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gray-900 hover:bg-gray-800"
            }`}
          >
            {loading ? <Loader /> : "Iniciar sesión"}
          </button>
        </form>
        <p className="text-center text-sm text-gray-600">
          ¿No tienes una cuenta?{" "}
          <Link
            href="/Register"
            className="text-indigo-400 hover:text-indigo-500"
          >
            Regístrate aquí
          </Link>
        </p>
        <p className="text-center text-sm text-gray-600">
          ¿Olvidaste la contraseña?{" "}
          <Link
            href="/RecoverPass"
            className="text-indigo-400 hover:text-indigo-500"
          >
            Recuperala aquí
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
