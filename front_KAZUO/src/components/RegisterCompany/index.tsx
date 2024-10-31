"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth0 } from '@auth0/auth0-react';

const CompanyRegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    location: '',
    address: '',
    contactPhone: '',
    email: '',
    industry: '',
    
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();
  const { user, isAuthenticated,loginWithRedirect } = useAuth0();

useEffect(() => {
  if (!isAuthenticated) {
    loginWithRedirect();
  }
}, [isAuthenticated, loginWithRedirect]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.companyName.trim() ) newErrors.companyName = 'El nombre de la empresa es requerido';
    if (!formData.location.trim()) newErrors.location = 'La localidad es requerida';
    if (!formData.address.trim()) newErrors.address = 'La dirección es requerida';
    if (!formData.contactPhone.trim()) newErrors.contactPhone = 'El teléfono de contacto es requerido';
    if (!/^\d{11}$/.test(formData.contactPhone)) newErrors.contactPhone = 'El teléfono debe tener 10 dígitos';
    if (!formData.email.trim()) newErrors.email = 'El correo electrónico es requerido';
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'El correo electrónico no es válido';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm() && user && isAuthenticated) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/company/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            userId: user?.sub, 
          }),
        });

        if (response.ok) {
          router.push('/Company'); 
        } else {
          throw new Error('Failed to register company');
        }
      } catch (error) {
        console.error('Error registering company:', error);
        setErrors({ submit: 'Hubo un error al registrar la empresa. Por favor, inténtelo de nuevo.' });
      }
    }
    if (!isAuthenticated) {
        return <p className="text-center text-red-500">Por favor, inicie sesión para registrar su empresa.</p>;
      }
  };

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
              <label htmlFor="companyName" className="block text-sm font-bold text-gray-700">
                Nombre de la Empresa
              </label>
              <div className="mt-1">
                <input
                  id="companyName"
                  name="companyName"
                  type="text"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={formData.companyName}
                  onChange={handleChange}
                />
              </div>
              {errors.companyName && <p className="mt-2 text-sm text-red-500">{errors.companyName}</p>}
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-bold text-gray-700">
                Localidad
              </label>
              <div className="mt-1">
                <input
                  id="location"
                  name="location"
                  type="text"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>
              {errors.location && <p className="mt-2 text-sm text-red-500">{errors.location}</p>}
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-bold text-gray-700">
                Dirección
              </label>
              <div className="mt-1">
                <input
                  id="address"
                  name="address"
                  type="text"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
              {errors.address && <p className="mt-2 text-sm text-red-500">{errors.address}</p>}
            </div>

            <div>
              <label htmlFor="contactPhone" className="block text-sm font-bold text-gray-700">
                Teléfono de Contacto
              </label>
              <div className="mt-1">
                <input
                  id="contactPhone"
                  name="contactPhone"
                  type="tel"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={formData.contactPhone}
                  onChange={handleChange}
                />
              </div>
              {errors.contactPhone && <p className="mt-2 text-sm text-red-500">{errors.contactPhone}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-bold text-gray-700">
                Correo Electrónico
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              {errors.email && <p className="mt-2 text-sm text-red-500">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="industry" className="block text-sm font-bold text-gray-700">
                Industria
              </label>
              <div className="mt-1">
                <select
                  id="industry"
                  name="industry"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={formData.industry}
                  onChange={handleChange}
                >
                  <option value="">Selecciona una industria</option>
                  <option value="tecnologia">Tecnología</option>
                  <option value="salud">Salud</option>
                  <option value="educacion">Educación</option>
                  <option value="comercio">Comercio</option>
                  <option value="manufactura">Manufactura</option>
                  <option value="otro">Otro</option>
                </select>
              </div>
            </div>

    

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Registrar Empresa
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompanyRegistrationForm;