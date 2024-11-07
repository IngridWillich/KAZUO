"use client";
import { useState } from "react";
import { IUpdatePassProps, TUpdatePassError } from "@/interfaces/types";
import { validateUpdatePass } from "@/helpers/validate";
import Swal from "sweetalert2";
// import { register } from "@/helpers/auth.helper";
import { useRouter, useSearchParams } from "next/navigation";

const UpdatePassForm = () => {
  const kazuo_back = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const initialState: IUpdatePassProps = {
    newPassword: "",
    confirmNewPass: "",
    token: token || "",
  };

  const [dataUpdatedPass, setDataUpdatedPass] = useState<IUpdatePassProps>({
    newPassword: "",
    confirmNewPass: "",
    token: token || "",
  });
  const [errors, setErrors] = useState<TUpdatePassError>(initialState);
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({
    newPassword: false,
    confirmNewPass: false,
    token: token ? true : false,
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

    setDataUpdatedPass({
      ...dataUpdatedPass,
      [name]: value,
    });

    const updatedErrors = validateUpdatePass({
      ...dataUpdatedPass,
      [name]: value,
    });
    setErrors(updatedErrors);

    setTouched({
      ...touched,
      [name]: true,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateUpdatePass(dataUpdatedPass);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await fetch(`${kazuo_back}/auth/reset-password`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataUpdatedPass),
        });
        if (response.ok) {
          Swal.fire({
            title: "¡Contraseña actualizada correctamente!",
            text: "Ahora puedes iniciar sesión con tu nueva contraseña.",
            icon: "success",
            confirmButtonText: "Aceptar",
          });
          setDataUpdatedPass(initialState);
          setTouched({
            email: false,
            newPassword: false,
            confirmNewPass: false,
            name: false,
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
          Actualizar contraseña
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="newPassword"
              className="block text-sm font-bold text-gray-700"
            >
              Nueva contraseña:
            </label>
            <input
              type="password"
              name="newPassword"
              id="newPassword"
              value={dataUpdatedPass.newPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {touched.newPassword && errors.newPassword && (
              <p className="text-red-500 text-sm">{errors.newPassword}</p>
            )}
          </div>
          <div className="space-y-2">
            <label
              htmlFor="confirmNewPass"
              className="block text-sm font-bold text-gray-700"
            >
              Confirma la nueva contraseña:
            </label>
            <input
              type="password"
              name="confirmNewPass"
              id="confirmNewPass"
              value={dataUpdatedPass.confirmNewPass}
              onChange={handleChange}
              onBlur={handleBlur}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {/* Mostrar mensaje de error si las contraseñas no coinciden */}
            {touched.confirmNewPass && errors.confirmNewPass && (
              <p className="text-red-500 text-sm">{errors.confirmNewPass}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full py-2 px-4 text-white font-semibold rounded-md shadow-sm ${
              isFormValid
                ? "bg-gray-900 hover:bg-gray-800"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Actualizar contraseña
          </button>
        </form>
      </div>
    </div>
  );
};
export default UpdatePassForm;
