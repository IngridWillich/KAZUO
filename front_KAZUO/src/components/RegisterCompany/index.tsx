


"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth0 } from '@auth0/auth0-react';

const CompanyRegistrationForm: React.FC = () => {
  const initialFormData = {
    CompanyName: '',
    country: '',
    address: '',
    contactPhone: '',
    email: '',
    industry: '',
    userId: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isFormValid, setIsFormValid] = useState(false);
  const router = useRouter();
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({
    CompanyName: false,
    country: false,
    address: false,
    contactPhone: false,
    email: false,
    industry: false,
    
  });

  const handleBlur = (event: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name } = event.target;
    setTouched((prevTouched) => ({ ...prevTouched, [name]: true }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
    setErrors(validateForm({ ...formData, [name]: value }));
    setTouched((prevTouched) => ({ ...prevTouched, [name]: true }));


    const validationErrors = validateForm({ ...formData, [name]: value });
    setErrors(validationErrors);
  };

  const validateForm = (data = formData) => {
    const newErrors: { [key: string]: string } = {};
    if (!data.CompanyName.trim()) newErrors.CompanyName = 'El nombre de la empresa es requerido';
    if (!data.country.trim()) newErrors.country = 'El país es requerido';
    if (!data.address.trim()) newErrors.address = 'La dirección es requerida';
    if (!data.contactPhone.trim()) newErrors.contactPhone = 'El teléfono de contacto es requerido';
    if (!/^\d{11}$/.test(data.contactPhone)) newErrors.contactPhone = 'El teléfono debe tener 11 dígitos';

   if(!data.email.trim()) {
    newErrors.email = 'El correo electrónico es requerido';
   }else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    newErrors.email = 'El correo electrónico no es válido';
}

    if (!/\S+@\S+\.\S+/.test(data.email)) newErrors.email = 'El correo electrónico no es válido';
    if (!data.industry.trim()) newErrors.industry = 'La industria es requerida';
    return newErrors;
  };

  useEffect(() => {
    const hasNoErrors = Object.keys(errors).length === 0;
    const isEveryFieldTouched = Object.values(touched).every((t) => t);
    setIsFormValid(isEveryFieldTouched && hasNoErrors);

    console.log("Errors:", errors);
    console.log("Touched:", touched);
    console.log("Is Form Valid:", isFormValid);

  }, [errors, touched]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isFormValid && user && isAuthenticated) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_UR}/companies`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            contactPhone: Number(formData.contactPhone), 
            userId: user?.sub, 
          }),
        });

        if (response.ok) {
          router.push('/Company');
        } else {
          const errorData = await response.json(); // Extraer el cuerpo de error
  console.error('Error de respuesta:', errorData);
  throw new Error(`Failed to register company: ${errorData.message}`);
        }
      } catch (error) {
        console.error('Error registering company:', error);
        setErrors({ submit: 'Hubo un error al registrar la empresa. Por favor, inténtelo de nuevo.' });
      }
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
                  id="CompanyName"
                  name="CompanyName"
                  type="text"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={formData.CompanyName}
                  onChange={handleChange}
                />
              </div>
              {errors.CompanyName && <p className="mt-2 text-sm text-red-500">{errors.companyName}</p>}
            </div>

            <div>
              <label htmlFor="country" className="block text-sm font-bold text-gray-700">
                Pais
              </label>
              <div className="mt-1">
                <input
                  id="country"
                  name="country"
                  type="text"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={formData.country}
                  onChange={handleChange}
                />
              </div>
              {errors.country && <p className="mt-2 text-sm text-red-500">{errors.country}</p>}
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
                  onBlur={handleBlur}
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

