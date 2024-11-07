"use client";
import React, { useEffect, useState } from "react";
import { FaTrash, FaPlus } from "react-icons/fa";
import { CompanyData, TeamMember } from "@/interfaces/types";
import Loader from "@/components/Loader/Loader";
import Swal from "sweetalert2";

export default function MiEmpresa() {
  const [companyData, setCompanyData] = useState<CompanyData | null>(null);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const kazuo_back = process.env.NEXT_PUBLIC_API_URL;
  const [isLoading, setIsLoading] = useState(false);
  const [newMember, setNewMember] = useState<TeamMember>({
    id: "",
    name: "",
    email: "",
    position: "",
  });

  const userId =
    typeof window !== "undefined" && localStorage.getItem("userData")
      ? JSON.parse(localStorage.getItem("userData") || "{}").id
      : "";

  const userToken =
    typeof window !== "undefined" && localStorage.getItem("userData")
      ? JSON.parse(localStorage.getItem("userData") || "{}").token
      : "";

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${kazuo_back}/companies/user/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        });
        const data = await response.json();
        if (data && data.length > 0) {
          setCompanyData(data[0]); // Usamos el primer elemento del arreglo
        }
      } catch (error) {
        console.error("Error al obtener los datos de la empresa:", error);
        Swal.fire({
          title: "Error",
          text: "No se pudo cargar la información de la empresa.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompanyData();
  }, [userId, userToken]);

  const handleAddTeamMember = async () => {
    try {
      const response = await fetch(
        `${kazuo_back}/companies/${companyData?.id}/users`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
          body: JSON.stringify(newMember),
        }
      );
      console.log(userToken);
      console.log(response);

      if (response.ok) {
        setTeamMembers([
          ...teamMembers,
          { ...newMember, id: Date.now().toString() },
        ]);
        setNewMember({ id: "", name: "", email: "", position: "" });
        Swal.fire({
          title: "¡Miembro agregado!",
          text: "El miembro del equipo ha sido agregado con éxito.",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
      } else {
        Swal.fire({
          title: "¡Error!",
          text: "Ocurrió un error al agregar el miembro del equipo.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    } catch (error) {
      console.error("Error al agregar miembro del equipo:", error);
    }
  };

  const handleRemoveTeamMember = (id: string) => {
    setTeamMembers(teamMembers.filter((member) => member.id !== id));
    Swal.fire({
      title: "¡Eliminado!",
      text: "Miembro del equipo eliminado correctamente.",
      icon: "success",
      confirmButtonText: "Aceptar",
    });
  };

  if (isLoading) {
    return <Loader />;
  } else {
    return (
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold text-center mb-10">Mi Empresa</h1>
        {/* Sección de información de la empresa */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
          <div className="px-6 py-4 bg-gray-50 border-b flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">
              Información de la Empresa
            </h2>
          </div>

          <div className="p-6">
            <p>Nombre: {companyData?.CompanyName}</p>
            <p>País: {companyData?.country}</p>
            <p>Dirección: {companyData?.address}</p>
            <p>Teléfono: {companyData?.contactPhone}</p>
            <p>Email: {companyData?.email}</p>
            <p>Industria: {companyData?.industry}</p>
          </div>
        </div>
        {/* Sección de equipo */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b">
            <h2 className="text-xl font-semibold text-gray-800">
              Nuestro Equipo
            </h2>
          </div>
          <div className="p-6">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between p-4 border-b last:border-b-0"
              >
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
                  onChange={(e) =>
                    setNewMember({ ...newMember, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  placeholder="Posición"
                  value={newMember.position}
                  onChange={(e) =>
                    setNewMember({ ...newMember, position: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                <input
                  type="email"
                  placeholder="Correo Electrónico"
                  value={newMember.email}
                  onChange={(e) =>
                    setNewMember({ ...newMember, email: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
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
    );
  }
}
