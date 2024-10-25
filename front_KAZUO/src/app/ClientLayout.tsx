"use client";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { AppProvider } from "@/context/AppContext";
import { Auth0Provider } from "@auth0/auth0-react";

interface ClientLayoutProps {
  children: ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const router = useRouter();

  const onRedirectCallback = (appState: any) => {
    router.push(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
    domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN || ""}
    clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID || ""}
    redirectUri={typeof window !== 'undefined' ? window.location.origin : ''}

    onRedirectCallback={onRedirectCallback}
    >
      <AppProvider>{children}</AppProvider>
    </Auth0Provider>
  );
}
