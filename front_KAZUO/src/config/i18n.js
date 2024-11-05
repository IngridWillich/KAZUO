// config/i18n.js

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { Spanish } from "../translations/es/global";
import { English } from "../translations/en/global";

i18n
  .use(initReactI18next)
  .init({
    interpolation: { escapeValue: false },
    lng: "es", // idioma por defecto
    resources: {
      es: {
        global: Spanish,
      },
      en: {
        global: English,
      },
    },
  });

export default i18n;
