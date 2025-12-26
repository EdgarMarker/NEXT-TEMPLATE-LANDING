"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useCallback,
} from "react";
import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";

// --- Funciones de utilidad para Cookies (Nativas) ---
const getCookie = (name: string) => {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
  return null;
};

const setCookie = (name: string, value: string, days: number) => {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/; SameSite=Lax`;
};

declare global {
  interface Window {
    fbq: any;
    dataLayer: any[];
  }
}

const AnalyticsContext = createContext<{
  track: (eventName: string) => Promise<void>;
} | null>(null);

export const AnalyticsProvider = ({
  children,
  config,
}: {
  children: React.ReactNode;
  config: {
    pixelId?: string;
    gtmId?: string;
    testEventCode?: string;
    enableCapi?: boolean;
  };
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const track = useCallback(
    async (eventName: string) => {
      const eventId = crypto.randomUUID();

      const externalId = getCookie("user_external_id") || "";
      const fbc = getCookie("_fbc") || "";
      const fbp = getCookie("_fbp") || "";

      // --- META ---
      if (config?.pixelId) {
        if (window.fbq) {
          window.fbq(
            "track",
            eventName,
            {},
            { eventID: eventId, external_id: externalId }
          );
        }

        if (config?.enableCapi) {
          fetch("/api/meta", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              eventName,
              eventId,
              pixelId: config.pixelId,
              testCode: config.testEventCode,
              url: window.location.href,
              externalId,
              fbc,
              fbp,
            }),
          }).catch(() => null);
        }
      }

      // --- GOOGLE ---
      if (config?.gtmId && window.dataLayer) {
        window.dataLayer.push({
          event: eventName,
          metaEventId: eventId,
        });
      }
    },
    [config]
  );

  useEffect(() => {
    const fbclid = searchParams.get("fbclid");
    if (fbclid) {
      setCookie("_fbc", `fb.1.${Date.now()}.${fbclid}`, 7);
    }

    if (!getCookie("user_external_id")) {
      setCookie("user_external_id", crypto.randomUUID(), 7);
    }

    track("PageView");
  }, [pathname, searchParams, track]);

  return (
    <AnalyticsContext.Provider value={{ track }}>
      {/* Script Meta Pixel */}
      {config?.pixelId && (
        <Script
          id="fb-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init', '${config.pixelId}');`,
          }}
        />
      )}

      {/* Script Google Tag Manager */}
      {config?.gtmId && (
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${config.gtmId}');`,
          }}
        />
      )}
      {children}
    </AnalyticsContext.Provider>
  );
};

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (!context)
    throw new Error("useAnalytics debe usarse dentro de AnalyticsProvider");
  return context;
};
