"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth0 } from '@auth0/auth0-react';
import { FaEdit, FaSave, FaTimes, FaPlus, FaTrash } from 'react-icons/fa';
import Image from 'next/image';

interface TeamMember {
  id: string;
  name: string;
  position: string;
  image: string;
  description: string;
}

export default function MiEmpresa() {
  const [companyData, setCompanyData] = useState({
    companyName: '',
    location: '',
    address: '',
    contactPhone: '',
    email: '',
    industry: '',
    aboutUs: '',
    logo: '',
  });
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [newMember, setNewMember] = useState<TeamMember>({ id: '', name: '', position: '', image: '', description: '' });
  const router = useRouter();
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();

  useEffect(() => {
    if (!isAuthenticated) {
      loginWithRedirect();
    } else {
      fetchCompanyData();
    }
  }, [isAuthenticated, loginWithRedirect]);

  const fetchCompanyData = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/company/${user?.sub}`);
      if (response.ok) {
        const data = await response.json();
        setCompanyData(data);
        if (data.teamMembers) {
          setTeamMembers(data.teamMembers);
        }
      } else {
        throw new Error('Failed to fetch company data');
      }
    } catch (error) {
      console.error('Error fetching company data:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCompanyData(prevState => ({
      ...prevState,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'logo' | 'memberImage') => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload-image`, {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          if (field === 'logo') {
            setCompanyData(prevState => ({ ...prevState, logo: data.imageUrl }));
          } else {
            setNewMember(prevState => ({ ...prevState, image: data.imageUrl }));
          }
        } else {
          throw new Error('Failed to upload image');
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!companyData.companyName.trim()) newErrors.companyName = 'El nombre de la empresa es requerido';
    if (!companyData.location.trim()) newErrors.location = 'La localidad es requerida';
    if (!companyData.address.trim()) newErrors.address = 'La dirección es requerida';
    if (!companyData.contactPhone.trim()) newErrors.contactPhone = 'El teléfono de contacto es requerido';
    if (!/^\d{11}$/.test(companyData.contactPhone)) newErrors.contactPhone = 'El teléfono debe tener 11 dígitos';
    if (!companyData.email.trim()) newErrors.email = 'El correo electrónico es requerido';
    if (!/\S+@\S+\.\S+/.test(companyData.email)) newErrors.email = 'El correo electrónico no es válido';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm() && user && isAuthenticated) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/company/update`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...companyData,
            teamMembers,
            userId: user?.sub,
          }),
        });

        if (response.ok) {
          setIsEditing(false);
        } else {
          throw new Error('Failed to update company');
        }
      } catch (error) {
        console.error('Error updating company:', error);
        setErrors({ submit: 'Hubo un error al actualizar la empresa. Por favor, inténtelo de nuevo.' });
      }
    }
  };

  const handleAddTeamMember = () => {
    if (newMember.name && newMember.position) {
      setTeamMembers([...teamMembers, { ...newMember, id: Date.now().toString() }]);
      setNewMember({ id: '', name: '', position: '', image: '', description: '' });
    }
  };

  const handleRemoveTeamMember = (id: string) => {
    setTeamMembers(teamMembers.filter(member => member.id !== id));
  };

  if (!isAuthenticated || !user) {
    return <p className="text-center text-red-500">Por favor, inicie sesión para ver los datos de su empresa.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-center text-gray-700">Mi Empresa</h1>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Información de la Empresa</h3>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <FaEdit className="mr-2" /> Editar
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(false)}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <FaTimes className="mr-2" /> Cancelar
              </button>
            )}
          </div>
          <div className="border-t border-gray-200">
            <form onSubmit={handleSubmit}>
              <dl>
                {Object.entries(companyData).map(([key, value]) => (
                  <div key={key} className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {isEditing ? (
                        key === 'industry' ? (
                          <select
                            name={key}
                            value={value}
                            onChange={handleChange}
                            className="max-w-lg block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                          >
                            <option value="">Selecciona una industria</option>
                            <option value="tecnologia">Tecnología</option>
                            <option value="salud">Salud</option>
                            <option value="educacion">Educación</option>
                            <option value="comercio">Comercio</option>
                            <option value="manufactura">Manufactura</option>
                            <option value="comestibles">Comestibles</option>
                            <option value="otro">Otro</option>
                          </select>
                        ) : key === 'aboutUs' ? (
                          <textarea
                            name={key}
                            value={value}
                            onChange={handleChange}
                            rows={4}
                            className="max-w-lg shadow-sm block w-full focus:ring-blue-500 focus:border-blue-500 sm:text-sm border border-gray-300 rounded-md"
                          />
                        ) : key === 'logo' ? (
                          <div>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageUpload(e, 'logo')}
                              className="max-w-lg block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                            />
                            {value && (
                              <Image src={value} alt="Logo" width={100} height={100} className="mt-2 rounded-md" />
                            )}
                          </div>
                        ) : (
                          <input
                            type={key === 'email' ? 'email' : 'text'}
                            name={key}
                            value={value}
                            onChange={handleChange}
                            className="max-w-lg block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                          />
                        )
                      ) : key === 'logo' ? (
                        value ? <Image src={value} alt="Logo" width={100} height={100} className="rounded-md" /> : 'No logo uploaded'
                      ) : (
                        value
                      )}
                      {errors[key] && <p className="mt-2 text-sm text-red-500">{errors[key]}</p>}
                    </dd>
                  </div>
                ))}
              </dl>
              {isEditing && (
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <FaSave className="mr-2" /> Guardar Cambios
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Nuestro Equipo Section */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Nuestro Equipo</h3>
          </div>
          <div className="border-t border-gray-200">
            {teamMembers.map((member) => (
              <div key={member.id} className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">{member.name}</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <p><strong>Cargo:</strong> {member.position}</p>
                  <p><strong>Descripción:</strong> {member.description}</p>
                  {member.image && <Image src={member.image} alt={member.name} width={100} height={100} className="mt-2 rounded-md" />}
                  {isEditing && (
                    <button
                      onClick={() => handleRemoveTeamMember(member.id)}
                      className="mt-2 inline-flex items-center px-2 py-1 border border-transparent text-xs leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      <FaTrash className="mr-1" /> Eliminar
                    </button>
                  )}
                </dd>
              </div>
            ))}
            {isEditing && (
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Agregar Miembro</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <input
                    type="text"
                    placeholder="Nombre"
                    value={newMember.name}
                    onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                    className="max-w-lg block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md mb-2"
                  />
                  <input
                    type="text"
                    placeholder="Cargo"
                    value={newMember.position}
                    onChange={(e) => setNewMember({ ...newMember, position: e.target.value })}
                    className="max-w-lg block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md mb-2"
                  />
                  <textarea
                    placeholder="Descripción"
                    value={newMember.description}
                    onChange={(e) => setNewMember({ ...newMember, description: e.target.value })}
                    className="max-w-lg shadow-sm block w-full focus:ring-blue-500 focus:border-blue-500 sm:text-sm border border-gray-300 rounded-md mb-2"
                    rows={3}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'memberImage')}
                    className="max-w-lg block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md mb-2"
                  />
                  <button
                    type="button"
                    onClick={handleAddTeamMember}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    <FaPlus className="mr-2" /> Agregar Miembro
                  </button>
                </dd>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}