/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import "./banner.css";
import React, { useState, useEffect } from "react";

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

export const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const hasConsent = getCookie("user_consent") === "true";
    setShowBanner(!hasConsent);
  }, []);

  const acceptCookies = () => {
    setCookie("user_consent", "true", 7);
    setShowBanner(false);
  };

  const declineCookies = () => {
    setCookie("user_consent", "false", 7);
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div
      className="banner-container"
      role="dialog"
      aria-live="polite"
      aria-label="Aviso de cookies"
    >
      <p className="banner-text">
        Utilizamos cookies para mejorar tu experiencia y mostrarte publicidad
        personalizada según tus hábitos de navegación.
      </p>
      <div className="banner-buttons">
        <button className="btn-decline" onClick={declineCookies}>
          Rechazar
        </button>
        <button className="btn-accept" onClick={acceptCookies}>
          Aceptar
        </button>
      </div>
    </div>
  );
};
