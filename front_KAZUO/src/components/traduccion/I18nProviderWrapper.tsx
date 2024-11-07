"use client";

import { ReactNode } from "react";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { English } from "../../translations/en/global";
import { Spanish } from "../../translations/es/global";

// Configuración de i18n solo en el cliente
i18next.use(initReactI18next).init({
  interpolation: { escapeValue: false },
  lng: "es", // Idioma por defecto
  resources: {
    en: { global: English },
    es: { global: Spanish },
  },
});

interface I18nProviderWrapperProps {
  children: ReactNode;
}

export default function I18nProviderWrapper({
  children,
}: I18nProviderWrapperProps) {
  return <I18nextProvider i18n={i18next}>{children}</I18nextProvider>;
}
