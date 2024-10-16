'use client'

import React, { createContext, useState, useContext, useEffect } from 'react';
import { userData } from '@/interfaces/types';
import { AppContextType } from '@/interfaces/types';



const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<userData | null>(null);

  useEffect(() => {
    const storedLoginStatus = localStorage.getItem("isLoggedIn");
    const storedUserData = localStorage.getItem("userData");
    if (storedLoginStatus === "true" && storedUserData){
      setIsLoggedIn(true);
      setUserData(JSON.parse(storedUserData));
    } 
  },[])

  useEffect(() => {
    console.log(`Estado de la sesión: ${isLoggedIn ? 'Iniciada' : 'No iniciada'}`);
  }, [isLoggedIn]);//VERIFICANDO SI LA SESION SE INICIO
  const login = async (email: string, password: string) =>{
    //FUNCION DE PRUEBA, ESTO DEBE CONECTAR CON EL BACK
    const mockUserData: userData = {
      id: 1,
      email: email,
      password: password,
      name: "Prueba Uno",
      company: "Empresa de prueba",
    };
    setIsLoggedIn(true);
    setUserData(mockUserData);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userData", JSON.stringify(mockUserData));
  };
  const logout = () => {
    setIsLoggedIn(false);
    setUserData(null);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userData");
  };
  const value = {
    isLoggedIn,
    userData,
    login,
    logout,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;

  };

  export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
      throw new Error('Error de contexto');
    }
    return context;

};