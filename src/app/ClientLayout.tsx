"use client";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { AppProvider } from "@/context/AppContext";
import { Auth0Provider } from "@auth0/auth0-react";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import {Spanish} from "../translations/es/global";
import {English} from "../translations/en/global";




i18next.init({
  interpolation: { escapeValue: false },
  lng: "es",
  resources:{
    es:{
      global:Spanish
    },
    en:{
      global:English
    }
  }
})

interface ClientLayoutProps {
  children: ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const router = useRouter();

  const onRedirectCallback = (appState: any) => {
    router.push(appState?.returnTo || window.location.pathname);
  };

  return (
    <I18nextProvider i18n={i18next}>  
    <Auth0Provider
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN || ""}
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID || ""}
      authorizationParams={{
        redirectUri:
          typeof window !== "undefined" ? window.location.origin : "",
      }}
      onRedirectCallback={onRedirectCallback}
    >
      <AppProvider>{children}</AppProvider>
    </Auth0Provider>
    </I18nextProvider>
  );
}
