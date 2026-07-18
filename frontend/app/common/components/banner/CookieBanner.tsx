"use client";
import "./banner.css";
import React, { useState } from "react";
import { useCookieConsent } from "@/app/common/hooks/useCookieConsent";
import { ALL_ACCEPTED, ALL_REJECTED } from "@/app/common/lib/cookies/cookieConsent";
import { CookiePreferencesModal } from "./CookiePreferencesModal";

export const CookieBanner = () => {
  const { consent, hasDecided, saveConsent } = useCookieConsent();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const activeConsent = consent ?? ALL_REJECTED;

  return (
    <>
      {!hasDecided && (
        <div
          className="banner-container"
          role="dialog"
          aria-live="polite"
          aria-label="Aviso de cookies"
        >
          <h2>Valoramos tu privacidad</h2>
          <p>
            Usamos cookies para mejorar tu experiencia. Puedes configurar, rechazar o aceptar
            las cookies no esenciales.
          </p>
          <div className="btn__wrapper">
            <button className="btn btn-outline" onClick={() => setIsSettingsOpen(true)}>
              Configurar cookies
            </button>
            <button className="btn btn-decline" onClick={() => saveConsent(ALL_REJECTED)}>
              Rechazar todo
            </button>
            <button className="btn btn-accept" onClick={() => saveConsent(ALL_ACCEPTED)}>
              Aceptar todo
            </button>
          </div>
        </div>
      )}

      <CookiePreferencesModal
        isOpen={isSettingsOpen}
        initialConsent={activeConsent}
        onClose={() => setIsSettingsOpen(false)}
        onSave={(next) => {
          saveConsent(next);
          setIsSettingsOpen(false);
        }}
      />
    </>
  );
};
