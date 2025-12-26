/*
"use client";

import React, { createContext, useContext, useEffect } from "react";
import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";

declare global {
  interface Window {
    fbq: any;
  }
}

const MetaContext = createContext<{
  track: (eventName: string) => Promise<void>;
} | null>(null);

export const MetaProvider = ({
  children,
  config,
}: {
  children: React.ReactNode;
  config: {
    pixelId?: string;
    testEventCode?: string;
    enableCapi?: boolean;
  };
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const track = async (eventName: string) => {
    if (!config?.pixelId) {
      console.error("❌ ERROR: No hay Pixel ID en el Provider");
      return;
    }

    const eventId = crypto.randomUUID();

    console.log(`📡 PROVIDER: Tracking ${eventName}`, {
      eventId,
      pixelId: config.pixelId,
    });

    if (window.fbq) {
      window.fbq("track", eventName, {}, { eventID: eventId });
    }

    if (config?.enableCapi) {
      try {
        await fetch("/api/meta", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            eventName,
            eventId,
            pixelId: config.pixelId,
            testCode: config.testEventCode,
            url: window.location.href,
          }),
        });
        console.log(`🚀 PROVIDER: ${eventName} enviado exitosamente a CAPI`);
      } catch (error) {
        console.error("Error enviando a Meta CAPI:", error);
      }
    }
  };

  useEffect(() => {
    if (config?.pixelId) {
      track("PageView");
    }
  }, [pathname, searchParams, config?.pixelId]);

  return (
    <MetaContext.Provider value={{ track }}>
      {config?.pixelId && (
        <>
          <Script
            id="fb-pixel"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                
                fbq('init', '${config.pixelId}');
                // Se eliminó fbq('track', 'PageView') de aquí porque ahora 
                // lo maneja el useEffect de arriba de forma dual (Browser+CAPI)
              `,
            }}
          />
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src={`https://www.facebook.com/tr?id=${config.pixelId}&ev=PageView&noscript=1`}
            />
          </noscript>
        </>
      )}
      {children}
    </MetaContext.Provider>
  );
};

export const useMeta = () => {
  const context = useContext(MetaContext);
  if (!context) {
    throw new Error("useMeta debe usarse dentro de un MetaProvider");
  }
  return context;
};

*/
