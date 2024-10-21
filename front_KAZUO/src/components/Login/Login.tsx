// "use client";

// import { useState, useEffect } from "react";
// import { ILoginError, ILoginProps } from "@/interfaces/types";
// import { validateLoginForm } from "@/helpers/validate";
// // import { login } from "@/helpers/auth.helper";
// import { useRouter } from "next/navigation";
// import Swal from "sweetalert2";
// import Link from "next/link";
// import { useAppContext } from "@/context/AppContext";

// const Login: React.FC = () => {
//   const kazuo_back = process.env.NEXT_PUBLIC_API_URL
//   const router = useRouter();
//   const initialState = {
//     email: "",
//     password: "",
//   };

//   const [dataUser, setDataUser] = useState<ILoginProps>(initialState);
//   const [errors, setErrors] = useState<ILoginError>(initialState);
//   const [touched, setTouched] = useState<{ [key: string]: boolean }>({
//     email: false,
//     password: false,
//   });
//   const [isButtonDisabled, setIsButtonDisabled] = useState(true);
//   const { login } = useAppContext();

//   useEffect(() => {
//     const hasErrors = Object.keys(errors).length > 0;
//     const isEmptyField = !dataUser.email || !dataUser.password;
//     setIsButtonDisabled(hasErrors || isEmptyField);
//   }, [errors, dataUser]);

//   const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
//     const { name } = event.target;
//     setTouched({
//       ...touched,
//       [name]: true,
//     });

//     const updatedErrors = validateLoginForm({
//       ...dataUser,
//       [name]: event.target.value,
//     });
//     setErrors(updatedErrors);
//   };

//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = event.target;
//     setDataUser({
//       ...dataUser,
//       [name]: value,
//     });

//     const updatedErrors = validateLoginForm({
//       ...dataUser,
//       [name]: value,
//     });
//     setErrors(updatedErrors);
//   };

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     const currentErrors = validateLoginForm(dataUser);
//     setErrors(currentErrors);

//     if (Object.keys(currentErrors).length === 0) {
//       console.log("Datos del formulario:", dataUser);
//       try {
//         const response = await fetch(`${kazuo_back}/auth/signin`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(dataUser),
//         });

//         if (response.ok) {
//             const loginData = await response.json();
//             await login(loginData);
//           Swal.fire({
//             title: "¡Inicio de sesión exitoso!",
//             text: "Te has iniciado sesión correctamente.",
//             icon: "success",
//             confirmButtonText: "Aceptar",
//           });
//           router.push("/GestionInventario");
//           console.log(response)
//         }
//       } catch (error) {
//         Swal.fire({
//           title: "Error",
//           text: "Credenciales incorrectas. Por favor, inténtalo de nuevo.",
//           icon: "error",
//           confirmButtonText: "Aceptar",
//         });
//       }
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
//       <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
//         <h2 className="text-2xl font-bold text-center text-gray-700">
//           INICIAR SESIÓN
//         </h2>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="space-y-2">
//             <label
//               htmlFor="email"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Email:
//             </label>
//             <input
//               type="email"
//               name="email"
//               id="email"
//               value={dataUser.email}
//               onChange={handleChange}
//               onBlur={handleBlur}
//               className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//             />
//             {touched.email && errors.email && (
//               <p className="text-red-500 text-sm">{errors.email}</p>
//             )}
//           </div>
//           <div className="space-y-2">
//             <label
//               htmlFor="password"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Contraseña:
//             </label>
//             <input
//               type="password"
//               name="password"
//               id="password"
//               value={dataUser.password}
//               onChange={handleChange}
//               onBlur={handleBlur}
//               className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//             />
//             {touched.password && errors.password && (
//               <p className="text-red-500 text-sm">{errors.password}</p>
//             )}
//           </div>
//           <button
//             type="submit"
//             disabled={isButtonDisabled}
//             className={`w-full py-2 px-4 text-white ${
//               isButtonDisabled
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : " bg-gray-900 hover:bg-gray-800"
//             } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-md`}
//           >
//             Iniciar Sesión
//           </button>
//         </form>
//         <p className="text-center text-sm text-gray-600">
//           ¿No tienes una cuenta?{" "}
//           <Link
//             href="/Register"
//             className="text-indigo-400 hover:text-indigo-500"
//           >
//             Regístrate aquí
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;


"use client";
import { useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { ILoginProps, ILoginError } from "@/interfaces/types";
import { validateLoginForm } from "@/helpers/validate";

const Login = () => {
  const kazuo_back = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();

  const initialState: ILoginProps = {
    email: "",
    password: "",
  };

  const [dataUser, setDataUser] = useState<ILoginProps>(initialState);
  const [errors, setErrors] = useState<ILoginError>(initialState);
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({
    email: false,
    password: false,
  });

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name } = event.target;
    setTouched({
      ...touched,
      [name]: true,
    });
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

    setTouched({
      ...touched,
      [name]: true,
    });
  };

  // Función para encriptar contraseñas utilizando AES-GCM
  const encryptPassword = async (password: string, key: CryptoKey): Promise<ArrayBuffer> => {
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
    const validationErrors = validateLoginForm(dataUser);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        // Generar la clave para encriptar la contraseña
        const key = await generateKey();

        // Encriptar la contraseña
        const encryptedPassword = await encryptPassword(dataUser.password, key);
        const encryptedPasswordBase64 = btoa(String.fromCharCode(...new Uint8Array(encryptedPassword)));

        // Enviar los datos al servidor con la contraseña encriptada
        const response = await fetch(`${kazuo_back}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...dataUser,
            password: encryptedPasswordBase64,  // Enviamos la contraseña encriptada
          }),
        });

        if (response.ok) {
          const { token } = await response.json();
          localStorage.setItem("token", token); // Guardar el token JWT

          Swal.fire({
            title: "¡Inicio de sesión exitoso!",
            text: "Bienvenido de nuevo.",
            icon: "success",
            confirmButtonText: "Aceptar",
          });

          router.push("/dashboard"); // Redirigir a la página de Dashboard o similar
        } else {
          throw new Error("Respuesta no exitosa del servidor");
        }
      } catch (error) {
        Swal.fire({
          title: "Error en el inicio de sesión",
          text: "Verifica tus credenciales e inténtalo nuevamente.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    }
  };

  const isFormValid =
    Object.keys(errors).length === 0 && Object.values(touched).every((t) => t);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg mt-6 mb-6 rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700 uppercase">
          Iniciar Sesión
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-bold text-gray-700">
              Email:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              onBlur={handleBlur}
              value={dataUser.email}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {touched.email && errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-bold text-gray-700">
              Contraseña:
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={dataUser.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {touched.password && errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full py-2 px-4 text-white font-semibold rounded-md shadow-sm ${
              isFormValid ? "bg-gray-900 hover:bg-gray-800" : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

