"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { validateDataForm } from "@/helpers/validate";
import { IFormData, IFormErrors } from "@/interfaces/types";
import Loader from "../Loader/Loader";

import { useAppContext } from "@/context/AppContext";

const CompanyRegistrationForm: React.FC = () => {
  const kazuo_back = process.env.NEXT_PUBLIC_API_URL;
  const { userData } = useAppContext();

  const token = userData?.token;

  const initialFormData: IFormData = {
    CompanyName: "",
    country: "",
    address: "",
    contactPhone: 0,
    email: "",
    industry: "",
    userId: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState<IFormErrors>({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({
    CompanyName: false,
    country: false,
    address: false,
    contactPhone: false,
    email: false,
    industry: false,
  });

  const handleBlur = (
    event: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name } = event.target;
    setTouched((prevTouched) => ({
      ...prevTouched,
      [name]: true,
    }));
  };

  const isFormValid = () => {
    // Verifica si todos los campos están llenos
    return (
      formData.CompanyName &&
      formData.country &&
      formData.address &&
      formData.contactPhone &&
      formData.email &&
      formData.industry
    );
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    let newValue: number | string = value;
    if (name === "contactPhone") {
      newValue = value !== "" ? parseInt(value, 10) : 0;
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: newValue,
    }));

    const updatedErrors = validateDataForm({
      ...formData,
      [name]: newValue,
    });

    setErrors(updatedErrors);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateDataForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      let userId = "";
      const userData = localStorage.getItem("userData");
      if (userData) {
        const parsedUserData = JSON.parse(userData);
        userId = parsedUserData.id;
      }

      const dataFormm = {
        ...formData,
        userId: userId,
        contactPhone: Number(formData.contactPhone),
      };
      console.log(`token: ${token}`);
      try {
        console.log(`Datos de usuario ${token}`);

        setLoading(true);
        const response = await fetch(`${kazuo_back}/companies`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",

            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(dataFormm),
        });
        // console.log(dataFormm);
        console.log(token);

        if (response.ok) {
          Swal.fire({
            title: "¡Te has registrado exitosamente!",
            text: "Ya estas registrado.",
            icon: "success",
            confirmButtonText: "Aceptar",
          });
          router.push("/Company");
        } else {
          throw new Error("Respuesta no exitosa del servidor");
        }
      } catch {
        Swal.fire({
          title: "Error al hacer tu registro",
          text: "Inténtalo de nuevo",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  // Lógica para habilitar o deshabilitar el botón
  const isButtonDisabled = !isFormValid() || Object.keys(errors).length > 0;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-700 uppercase">
          Registra tu Empresa
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="CompanyName"
                className="block text-sm font-bold text-gray-700"
              >
                Nombre de la Empresa
              </label>
              <input
                id="CompanyName"
                name="CompanyName"
                type="text"
                value={formData.CompanyName}
                onChange={handleChange}
                onBlur={handleBlur}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              {touched.CompanyName && errors.CompanyName && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.CompanyName}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="country"
                className="block text-sm font-bold text-gray-700"
              >
                País
              </label>
              <input
                id="country"
                name="country"
                type="text"
                value={formData.country}
                onChange={handleChange}
                onBlur={handleBlur}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              {touched.country && errors.country && (
                <p className="mt-2 text-sm text-red-500">{errors.country}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="address"
                className="block text-sm font-bold text-gray-700"
              >
                Dirección
              </label>
              <input
                id="address"
                name="address"
                type="text"
                value={formData.address}
                onChange={handleChange}
                onBlur={handleBlur}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              {touched.address && errors.address && (
                <p className="mt-2 text-sm text-red-500">{errors.address}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="contactPhone"
                className="block text-sm font-bold text-gray-700"
              >
                Teléfono de Contacto
              </label>
              <input
                id="contactPhone"
                name="contactPhone"
                type="number"
                value={formData.contactPhone || ""}
                onChange={handleChange}
                onBlur={handleBlur}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              {touched.contactPhone && errors.contactPhone && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.contactPhone}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-bold text-gray-700"
              >
                Correo Electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              {touched.email && errors.email && (
                <p className="mt-2 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="industry"
                className="block text-sm font-bold text-gray-700"
              >
                Industria
              </label>
              <select
                id="industry"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                onBlur={handleBlur}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="">Selecciona una industria</option>
                <option value="tecnologia">Tecnología</option>
                <option value="comercio">Comercio</option>
                <option value="salud">Salud</option>
                <option value="educacion">Educación</option>
                {/* Agrega más opciones según sea necesario */}
              </select>
              {touched.industry && errors.industry && (
                <p className="mt-2 text-sm text-red-500">{errors.industry}</p>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={isButtonDisabled}
                className={`w-full py-2 px-4 text-white font-semibold rounded-md shadow-sm flex items-center justify-center ${
                  isButtonDisabled
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gray-900 hover:bg-gray-800"
                }`}
              >
                {loading ? <Loader /> : "Registrar empresa"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompanyRegistrationForm;
