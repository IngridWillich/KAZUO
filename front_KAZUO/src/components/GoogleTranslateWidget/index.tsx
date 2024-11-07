"use client";
import React, { useEffect } from "react";

const GoogleTranslateWidget: React.FC = () => {
  useEffect(() => {
    const googleTranslateScript = document.createElement("script");
    googleTranslateScript.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    googleTranslateScript.async = true;
    document.body.appendChild(googleTranslateScript);

    (window as any).googleTranslateElementInit = () => {
      new (window as any).google.translate.TranslateElement(
        {
          pageLanguage: "es", // Cambia esto si tu idioma base no es español
          layout: (window as any).google.translate.TranslateElement.InlineLayout
            .SIMPLE,
        },
        "google_translate_element"
      );
    };
  }, []);

  return (
    <div className="google-translate-widget bg-white shadow-md rounded-lg p-4 m-4 max-w-xs">
      <div id="google_translate_element" />
    </div>
  );
};

export default GoogleTranslateWidget;
