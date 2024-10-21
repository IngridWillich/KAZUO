
// "use client";
// import { useState } from "react";
// import { TRegisterError, IRegisterProps } from "@/interfaces/types";
// import { validateRegisterForm } from "@/helpers/validate";
// import Swal from "sweetalert2";
// // import { register } from "@/helpers/auth.helper";
// import { useRouter } from "next/navigation";

// const Register = () => {
//   const kazuo_back = process.env.NEXT_PUBLIC_API_URL
//   const router = useRouter();
//   const initialState: IRegisterProps = {
//     email: "",
//     password: "",
//     confirmPass: "",
//     name: "",
//     company: "",
//   };

//   const [dataUser, setDataUser] = useState<IRegisterProps>(initialState);
//   const [errors, setErrors] = useState<TRegisterError>(initialState);
//   const [touched, setTouched] = useState<{ [key: string]: boolean }>({
//     email: false,
//     password: false,
//     confirmPass: false,
//     name: false,
//     company: false,
//   });

//   const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
//     const { name } = event.target;
//     setTouched({
//       ...touched,
//       [name]: true,
//     });
//   };

//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = event.target;

//     setDataUser({
//       ...dataUser,
//       [name]: value,
//     });

//     const updatedErrors = validateRegisterForm({
//       ...dataUser,
//       [name]: value,
//     });
//     setErrors(updatedErrors);

//     setTouched({
//       ...touched,
//       [name]: true,
//     });
//   };

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     const validationErrors = validateRegisterForm(dataUser);
//     setErrors(validationErrors);

//     if (Object.keys(validationErrors).length === 0) {
//       try {
//         const response = await fetch(`${kazuo_back}/auth/signup`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(dataUser),
//         });
//         if (response.ok) {
//           Swal.fire({
//             title: "¡Te has registrado exitosamente!",
//             text: "Ahora puedes iniciar sesión.",
//             icon: "success",
//             confirmButtonText: "Aceptar",
//           });
//           setDataUser(initialState);
//           setTouched({
//             email: false,
//             password: false,
//             confirmPass: false,
//             name: false,
//             company: false,
//           });
//           router.push("/Login");
//         } else {
//           throw new Error("Respuesta no exitosa del servidor");
//         }
//       } catch (error) {
//         Swal.fire({
//           title: "Error al hacer tu registro",
//           text: "Inténtalo nuevamente",
//           icon: "error",
//           confirmButtonText: "Aceptar",
//         });
//       }
//       console.log(dataUser);
//     }

    
//   };

//   const isFormValid =
//     Object.keys(errors).length === 0 && Object.values(touched).every((t) => t);

// return (
//   <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
//     <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg mt-6 mb-6 rounded-lg">
//       <h2 className="text-2xl font-bold text-center text-gray-700 uppercase">
//         Registrarse
//       </h2>
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div className="space-y-2">
//           <label htmlFor="email" className="block text-sm font-bold text-gray-700">
//             Email:
//           </label>
//           <input
//             type="email"
//             name="email"
//             id="email"
//             onBlur={handleBlur}
//             value={dataUser.email}
//             onChange={handleChange}
//             className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//           />
//           {touched.email && errors.email && (
//             <p className="text-red-500 text-sm">{errors.email}</p>
//           )}
//         </div>
//         <div className="space-y-2">
//           <label htmlFor="password" className="block text-sm font-bold text-gray-700">
//             Contraseña:
//           </label>
//           <input
//             type="password"
//             name="password"
//             id="password"
//             value={dataUser.password}
//             onChange={handleChange}
//             onBlur={handleBlur}
//             className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//           />
//           {touched.password && errors.password && (
//             <p className="text-red-500 text-sm">{errors.password}</p>
//           )}
//         </div>
//         <div className="space-y-2">
//           <label htmlFor="confirmPass" className="block text-sm font-bold text-gray-700">
//             Confirma la contraseña:
//           </label>
//           <input
//             type="password"
//             name="confirmPass"
//             id="confirmPass"
//             value={dataUser.confirmPass}
//             onChange={handleChange}
//             onBlur={handleBlur}
//             className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//           />
//           {/* Mostrar mensaje de error si las contraseñas no coinciden */}
//           {touched.confirmPass && errors.confirmPass && (
//             <p className="text-red-500 text-sm">{errors.confirmPass}</p>
//           )}
//         </div>
//         <div className="space-y-2">
//           <label htmlFor="name" className="block text-sm font-bold text-gray-700">
//             Nombre:
//           </label>
//           <input
//             type="text"
//             name="name"
//             id="name"
//             value={dataUser.name}
//             onChange={handleChange}
//             onBlur={handleBlur}
//             className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//           />
//           {touched.name && errors.name && (
//             <p className="text-red-500 text-sm">{errors.name}</p>
//           )}
//         </div>
//         <div className="space-y-2">
//           <label htmlFor="company" className="block text-sm font-bold text-gray-700">
//             Nombre de la Empresa:
//           </label>
//           <input
//             type="text"
//             name="company"
//             id="company"
//             value={dataUser.company}
//             onChange={handleChange}
//             onBlur={handleBlur}
//             className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//           />
//           {touched.company && errors.company && (
//             <p className="text-red-500 text-sm">{errors.company}</p>
//           )}
//         </div>
//         <button
// type="submit"
// disabled={!isFormValid}
// className={`w-full py-2 px-4 text-white font-semibold rounded-md shadow-sm ${
// isFormValid ? "bg-gray-900 hover:bg-gray-800" : "bg-gray-400 cursor-not-allowed"
// }`}
// >
// Registrarse
// </button>

//       </form>
//     </div>
//   </div>
// );
// }
// export default Register; 


"use client";
import { useState } from "react";
import { TRegisterError, IRegisterProps } from "@/interfaces/types";
import { validateRegisterForm } from "@/helpers/validate";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const Register = () => {
  const kazuo_back = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
  const initialState: IRegisterProps = {
    email: "",
    password: "",
    confirmPass: "",
    name: "",
    company: "",
  };

  const [dataUser, setDataUser] = useState<IRegisterProps>(initialState);
  const [errors, setErrors] = useState<TRegisterError>(initialState);
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({
    email: false,
    password: false,
    confirmPass: false,
    name: false,
    company: false,
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

    const updatedErrors = validateRegisterForm({
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
    const validationErrors = validateRegisterForm(dataUser);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        // Generar la clave para encriptar las contraseñas
        const key = await generateKey();

        // Encriptar la contraseña principal
        const encryptedPassword = await encryptPassword(dataUser.password, key);
        const encryptedPasswordBase64 = btoa(String.fromCharCode(...new Uint8Array(encryptedPassword)));

        // Encriptar la confirmación de la contraseña
        const encryptedConfirmPass = await encryptPassword(dataUser.confirmPass, key);
        const encryptedConfirmPassBase64 = btoa(String.fromCharCode(...new Uint8Array(encryptedConfirmPass)));

        // Enviar los datos al servidor con ambas contraseñas encriptadas
        const response = await fetch(`${kazuo_back}/auth/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...dataUser,
            password: encryptedPasswordBase64,  // Enviamos la contraseña encriptada
            confirmPass: encryptedConfirmPassBase64,  // Enviamos la confirmación de la contraseña encriptada
          }),
        });

        if (response.ok) {
          Swal.fire({
            title: "¡Te has registrado exitosamente!",
            text: "Ahora puedes iniciar sesión.",
            icon: "success",
            confirmButtonText: "Aceptar",
          });
          setDataUser(initialState);
          setTouched({
            email: false,
            password: false,
            confirmPass: false,
            name: false,
            company: false,
          });
          router.push("/Login");
        } else {
          throw new Error("Respuesta no exitosa del servidor");
        }
      } catch (error) {
        Swal.fire({
          title: "Error al hacer tu registro",
          text: "Inténtalo nuevamente",
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
            Registrarse
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
            <div className="space-y-2">
              <label htmlFor="confirmPass" className="block text-sm font-bold text-gray-700">
                Confirma la contraseña:
              </label>
              <input
                type="password"
                name="confirmPass"
                id="confirmPass"
                value={dataUser.confirmPass}
                onChange={handleChange}
                onBlur={handleBlur}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {/* Mostrar mensaje de error si las contraseñas no coinciden */}
              {touched.confirmPass && errors.confirmPass && (
                <p className="text-red-500 text-sm">{errors.confirmPass}</p>
              )}
            </div>
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-bold text-gray-700">
                Nombre:
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={dataUser.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {touched.name && errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>
            <div className="space-y-2">
              <label htmlFor="company" className="block text-sm font-bold text-gray-700">
                Nombre de la Empresa:
              </label>
              <input
                type="text"
                name="company"
                id="company"
                value={dataUser.company}
                onChange={handleChange}
                onBlur={handleBlur}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {touched.company && errors.company && (
                <p className="text-red-500 text-sm">{errors.company}</p>
              )}
            </div>
            <button
    type="submit"
    disabled={!isFormValid}
    className={`w-full py-2 px-4 text-white font-semibold rounded-md shadow-sm ${
    isFormValid ? "bg-gray-900 hover:bg-gray-800" : "bg-gray-400 cursor-not-allowed"
    }`}
    >
    Registrarse
    </button>
    
          </form>
        </div>
      </div>
    );
    }
    export default Register; 
    

