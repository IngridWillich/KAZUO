import React, { createContext, useState, useContext } from 'react';

interface AppContextType {
  // Interfaces a usar para el contexto.
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Funciones de contexto a definir, Login, Logout, Inventario, Bodegas, etc.
  
  const value = {
    
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