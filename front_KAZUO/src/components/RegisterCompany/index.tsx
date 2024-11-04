"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth0 } from '@auth0/auth0-react';
import {useAppContext} from '@/context/AppContext';
import Swal from 'sweetalert2';
import { validateDataForm } from '@/helpers/validate';
import { IFormErrors } from '@/interfaces/types';

  const CompanyRegistrationForm: React.FC = () => {
  // const { user, isAuthenticated } = useAuth0();
 
  const kazuo_back = process.env.NEXT_PUBLIC_API_URL;
  const initialFormData = {
    CompanyName: '',
    country: '',
    address: '',
    contactPhone: '',
    email: '',
    industry: '',
    userId:''
    //  userId:  user?.sub || user || null,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState<IFormErrors>(initialFormData);
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


// if (!isAuthenticated || !user) {
//   console.log("no estas autenticado");
// }
  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name } = event.target;
    setTouched({
      ...touched,
      [name]: true,
    });
  };

 
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    const updatedErrors = validateDataForm({
      ...formData,
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
    const validationErrors = validateDataForm(formData);
    setErrors(validationErrors);
    console.log(formData);
    
    if (Object.keys(validationErrors).length === 0) {
      let userId = "";
      const userData = localStorage.getItem("userData");
      if (userData) {
        const parsedUserData = JSON.parse(userData);
        userId = parsedUserData.id;
      }
  
      const dataFormm = {
        ...formData,
        CompanyName: Number(formData.CompanyName),
        country: Number(formData.country),
        address: Number (formData.address),
        contactPhone: Number (formData.contactPhone),
        email: Number (formData.email),
        industry: Number (formData.industry),
        userId: userId,
      
      };
  
      try {
        setLoading(true); 
      const response = await fetch(`${kazuo_back}/companies`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
    
          },
          body: JSON.stringify(dataFormm),
        });
      
        if (response.ok) {
          Swal.fire({
            title: "¡Te has registrado exitosamente!",
            text: "Ahora puedes iniciar sesión.",
            icon: "success",
            confirmButtonText: "Aceptar",
          });
          setFormData(initialFormData);
          setTouched({
            email: false,
            password: false,
            confirmPass: false,
            name: false,
            company: false,
          });
          router.push("/Company");
        } else {
          throw new Error("Respuesta no exitosa del servidor");
        }
      } catch (response) {
        Swal.fire({
          title: "Error al hacer tu registro",
          text: "Intentalo de nuevo",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
      finally {
      
        setLoading(false); 
    }
}
    
  };

  const isFormValid =
    Object.keys(errors).length === 0 && Object.values(touched).every((t) => t);

    return (
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="text-2xl font-bold text-center text-gray-700 uppercase">Registra tu Empresa</h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="CompanyName" className="block text-sm font-bold text-gray-700">
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
                  <p className="mt-2 text-sm text-red-500">{errors.CompanyName}</p>
                )}
              </div>
  
              <div>
                <label htmlFor="country" className="block text-sm font-bold text-gray-700">
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
                <label htmlFor="address" className="block text-sm font-bold text-gray-700">
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
                <label htmlFor="contactPhone" className="block text-sm font-bold text-gray-700">
                  Teléfono de Contacto
                </label>
                <input
                  id="contactPhone"
                  name="contactPhone"
                  type="tel"
                  value={formData.contactPhone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {touched.contactPhone && errors.contactPhone && (
                  <p className="mt-2 text-sm text-red-500">{errors.contactPhone}</p>
                )}
              </div>
  
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-gray-700">
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
                <label htmlFor="industry" className="block text-sm font-bold text-gray-700">
                  Industria
                </label>
              
                <select
                  id="industry"
                  name="industry"
                  value={formData.industry}
                  // onChange={handleChange}
                  // onBlur={handleBlur}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="">Selecciona una industria</option>
                  <option value="tecnologia">Tecnología</option>
                  <option value="salud">Salud</option>
                  <option value="educacion">Educación</option>
                  <option value="comercio">Comercio</option>
                  <option value="manufactura">Manufactura</option>
                  <option value="otro">Otro</option>
                </select>
                {touched.industry && errors.industry && (
                  <p className="mt-2 text-sm text-red-500">{errors.industry}</p>
                )}
              </div>
  
              <button
              type="submit"
              disabled={!isFormValid}
              className={`w-full py-2 px-4 text-white font-semibold rounded-md shadow-sm ${
                isFormValid ? "bg-gray-900 hover:bg-gray-800" : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Registra tu empresa
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompanyRegistrationForm;