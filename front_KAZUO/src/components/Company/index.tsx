"use client"

import React, { useEffect, useState, useCallback } from 'react'
import { FaEdit, FaSave, FaTimes, FaPlus, FaTrash } from 'react-icons/fa'
import { CompanyData, TeamMember } from '@/interfaces/types'

export default function MiEmpresa() {
  const [companyData, setCompanyData] = useState<CompanyData>({
    nombreEmpresa: '',
    pais: '',
    direccion: '',
    telefonoContacto: '',
    correoElectronico: '',
    industria: '',
  })
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [newMember, setNewMember] = useState<TeamMember>({ id: '', name: '', email: '', position: '' })

  // Obtener el userId desde el almacenamiento local
  const userId = typeof window !== 'undefined' && localStorage.getItem('userData') 
    ? JSON.parse(localStorage.getItem('userData') || '{}').id 
    : '';

  const fetchCompanyData = useCallback(async () => {
    if (!userId) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/companies/users/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCompanyData(data);
        if (data.teamMembers) setTeamMembers(data.teamMembers);
      } else {
        alert("No se pudo cargar la información de la empresa");
      }
    } catch (error) {
      console.error('Error fetching company data:', error);
      alert("Ocurrió un error al cargar los datos");
    }
  }, [userId]);

  useEffect(() => {
    fetchCompanyData();
  }, [fetchCompanyData]);


  // useEffect(() => {
  //   if (isAuthenticated) {
  //     fetchCompanyData(); // Llama a la función para cargar los datos
  //   }
  // }, [isAuthenticated, fetchCompanyData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCompanyData(prevState => ({ ...prevState, [name]: value }))
    if (errors[name]) setErrors(prevErrors => ({ ...prevErrors, [name]: '' }))
  }

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}
    if (!companyData.nombreEmpresa.trim()) newErrors.nombreEmpresa = 'El nombre de la empresa es requerido'
    if (!companyData.pais.trim()) newErrors.pais = 'El país es requerido'
    if (!companyData.direccion.trim()) newErrors.direccion = 'La dirección es requerida'
    if (!companyData.telefonoContacto.trim()) newErrors.telefonoContacto = 'El teléfono de contacto es requerido'
    if (!/^\d{11}$/.test(companyData.telefonoContacto)) newErrors.telefonoContacto = 'El teléfono debe tener 11 dígitos'
    if (!companyData.correoElectronico.trim()) newErrors.correoElectronico = 'El correo electrónico es requerido'
    if (!/\S+@\S+\.\S+/.test(companyData.correoElectronico)) newErrors.correoElectronico = 'El correo electrónico no es válido'
   
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Aquí agregarías la lógica para enviar los datos actualizados
      alert("Datos de la empresa guardados exitosamente");
      setIsEditing(false); // Desactiva el modo edición después de guardar
    }
  }

  const handleAddTeamMember = () => {
    if (newMember.name && newMember.position) {
      setTeamMembers([...teamMembers, { ...newMember, id: Date.now().toString() }])
      setNewMember({ id: '', name: '', email: '', position: '' })
      alert("Miembro del equipo agregado correctamente")
    }
  }

  const handleRemoveTeamMember = (id: string) => {
    setTeamMembers(teamMembers.filter(member => member.id !== id))
    alert("Miembro del equipo eliminado correctamente")
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-10">Mi Empresa</h1>
  
      {/* Sección de información de la empresa */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
        <div className="px-6 py-4 bg-gray-50 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Información de la Empresa</h2>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`px-4 py-2 rounded-md text-white ${isEditing ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'} transition duration-300`}
          >
            {isEditing ? <><FaTimes className="inline mr-2" /> Cancelar</> : <><FaEdit className="inline mr-2" /> Editar</>}
          </button>
        </div>
  
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {Object.entries(companyData).map(([key, value]) => (
              <div key={key} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <label htmlFor={key} className="text-sm font-medium text-gray-700 md:text-right">
                  {key === 'nombreEmpresa' ? 'Nombre de la Empresa' :
                   key === 'pais' ? 'País' :
                   key === 'direccion' ? 'Dirección' :
                   key === 'telefonoContacto' ? 'Teléfono de Contacto' :
                   key === 'correoElectronico' ? 'Correo Electrónico' :
                   key === 'industria' ? 'Industria' : ''}
                </label>
                <div className="md:col-span-2">
                  {isEditing ? (
                    <input
                      id={key}
                      type={key === 'correoElectronico' ? 'email' : 'text'}
                      name={key}
                      value={value}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                  ) : (
                    <span className="text-gray-900">{value}</span>
                  )}
                  {errors[key] && <p className="mt-2 text-sm text-red-600">{errors[key]}</p>}
                </div>
              </div>
            ))}
            {isEditing && (
              <div className="flex justify-end mt-6">
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-300"
                >
                  <FaSave className="inline mr-2" /> Guardar Cambios
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
  
      {/* Sección de equipo */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Nuestro Equipo</h2>
        </div>
  
        <div className="p-6">
          {teamMembers.map((member) => (
            <div key={member.id} className="flex items-center justify-between p-4 border-b last:border-b-0">
              <div>
                <p className="font-semibold text-gray-900">{member.name}</p>
                <p className="text-sm text-gray-500">{member.position}</p>
              </div>
              <button
                onClick={() => handleRemoveTeamMember(member.id)}
                className="px-3 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-300"
              >
                <FaTrash className="inline mr-1" /> Eliminar
              </button>
            </div>
          ))}
          
          {/* Formulario para agregar miembro */}
          <div className="mt-6 p-4 border-t">
            <h3 className="font-semibold text-lg mb-4">Agregar Miembro</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Nombre"
                value={newMember.name}
                onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                placeholder="Posición"
                value={newMember.position}
                onChange={(e) => setNewMember({ ...newMember, position: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              <button
                onClick={handleAddTeamMember}
                className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
              >
                <FaPlus className="inline mr-2" /> Agregar Miembro
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
