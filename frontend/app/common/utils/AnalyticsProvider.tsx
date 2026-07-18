"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useCallback,
} from "react";
import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { getCookie, setCookie } from "@/app/common/lib/cookies/cookieConsent";
import { useCookieConsent } from "@/app/common/hooks/useCookieConsent";

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
  const { consent } = useCookieConsent();

  // Cookies de segmentación (Meta Pixel) y rendimiento (GTM) requieren consentimiento explícito.
  const canTargeting = consent?.targeting === true;
  const canPerformance = consent?.performance === true;

  const track = useCallback(
    async (eventName: string) => {
      const eventId = crypto.randomUUID();

      const externalId = getCookie("user_external_id") || "";
      const fbc = getCookie("_fbc") || "";
      const fbp = getCookie("_fbp") || "";

      // --- META ---
      if (config?.pixelId && canTargeting) {
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
      if (config?.gtmId && canPerformance && window.dataLayer) {
        window.dataLayer.push({
          event: eventName,
          metaEventId: eventId,
        });
      }
    },
    [config, canTargeting, canPerformance]
  );

  useEffect(() => {
    if (!canTargeting) return;

    const fbclid = searchParams.get("fbclid");
    if (fbclid) {
      setCookie("_fbc", `fb.1.${Date.now()}.${fbclid}`, 7);
    }

    if (!getCookie("user_external_id")) {
      setCookie("user_external_id", crypto.randomUUID(), 7);
    }
  }, [canTargeting, searchParams]);

  useEffect(() => {
    track("PageView");
  }, [pathname, searchParams, track]);

  return (
    <AnalyticsContext.Provider value={{ track }}>
      {/* Script Meta Pixel — solo si el usuario aceptó cookies de segmentación */}
      {config?.pixelId && canTargeting && (
        <Script
          id="fb-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init', '${config.pixelId}');`,
          }}
        />
      )}

      {/* Script Google Tag Manager — solo si el usuario aceptó cookies de rendimiento */}
      {config?.gtmId && canPerformance && (
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
