"use client"
import React, { createContext, useState, useContext } from 'react';
import { AppContextType } from '@/interfaces/types';



const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Funciones de contexto a definir, Login, Logout, Inventario, Bodegas, etc.
    const contextValue: AppContextType = {
      
    }
    return <AppContext.Provider>{children}</AppContext.Provider>;
  };



export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('Error de contexto');
  }
  return context;
};