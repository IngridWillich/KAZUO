"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import { userData } from "@/interfaces/types";
import { AppContextType } from "@/interfaces/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const {
    logout: logoutAuth0,
    user,
    isAuthenticated,
    getAccessTokenSilently,
  } = useAuth0();

  const [isLoggedIn, setIsLoggedIn] = useLocalStorage<boolean>(
    "isLoggedIn",
    false
  );
  const [userData, setUserData] = useState<userData | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLoginStatus = localStorage.getItem("isLoggedIn");
      const storedUserData = localStorage.getItem("userData");
      if (storedLoginStatus === "true" && storedUserData) {
        setIsLoggedIn(true);
        setUserData(JSON.parse(storedUserData));
      }
    }
  }, []);

  useEffect(() => {
    console.log(
      `Estado de la sesión: ${isLoggedIn ? "Iniciada" : "No iniciada"}`
    );
    if (isAuthenticated && user) {
      const auth0Id = user.sub || "";
      const newUserData: userData = {
        id: "",
        password: "", // Manejar según tus necesidades
        company: user.email || "", // Usar el email o algún otro campo como compañía
        token: "", // Establecer el token si lo tienes
        email: user.email || "", // Asegúrate de incluir el email
        name: user.name || "",
        userId: "",
        igmUrl: "",
        auth0Id: auth0Id,
      };

      setIsLoggedIn(true);
      setUserData(newUserData);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userData", JSON.stringify(newUserData));
      localStorage.setItem("token", userData?.token!);
      localStorage.setItem("igmUrl", userData?.igmUrl!);
    }
  }, [isAuthenticated, user]); // Incluido isAuthenticated y user

  const login = async (loginData: any) => {
    try {
      setIsLoggedIn(true);
      setUserData(loginData);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userData", JSON.stringify(loginData));
      // if (userData?.token) {
      if (loginData.token) {
        localStorage.setItem("token", loginData.token);
      }
      if (userData?.igmUrl) {
        localStorage.setItem("igmUrl", userData.igmUrl);
      }
    } catch (error) {
      console.error("Error de login", error);
      throw error;
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserData(null);
    localStorage.setItem("isLoggedIn", "false");
    localStorage.removeItem("userData");
    localStorage.removeItem("token");
    localStorage.removeItem("igmUrl");

    // Cerrar sesión con Auth0
    logoutAuth0();
    window.location.href = window.location.origin;
  };

  const value: AppContextType = {
    isLoggedIn,
    userData,
    login,
    logout,
    setUserData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("Error de contexto");
  }

  return context;
};
