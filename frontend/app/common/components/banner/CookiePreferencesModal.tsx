"use client";

import "./CookiePreferencesModal.css";
import React, { useEffect, useId, useState } from "react";
import { Plus } from "lucide-react";
import { ALL_ACCEPTED, ALL_REJECTED, Consent } from "@/app/common/lib/cookies/cookieConsent";

type ToggleCategory = "performance" | "functional" | "targeting";

type CategoryDef = {
  key: ToggleCategory;
  title: string;
  description: string;
};

const CATEGORIES: CategoryDef[] = [
  {
    key: "performance",
    title: "Cookies de rendimiento",
    description:
      "Nos ayudan a entender cómo se usa el sitio para mejorarlo (Google Tag Manager / analítica).",
  },
  {
    key: "functional",
    title: "Cookies funcionales",
    description: "Permiten recordar tus preferencias para mejorar tu experiencia.",
  },
  {
    key: "targeting",
    title: "Cookies de segmentación",
    description: "Usadas para mostrarte publicidad relevante (Meta Pixel).",
  },
];

type Props = {
  isOpen: boolean;
  initialConsent: Consent;
  onClose: () => void;
  onSave: (consent: Consent) => void;
};

export const CookiePreferencesModal = ({ isOpen, initialConsent, onClose, onSave }: Props) => {
  const [staged, setStaged] = useState<Consent>(initialConsent);
  const [openCategory, setOpenCategory] = useState<ToggleCategory | "necessary" | null>(null);
  const [wasOpen, setWasOpen] = useState(isOpen);

  if (isOpen !== wasOpen) {
    setWasOpen(isOpen);
    if (isOpen) setStaged(initialConsent);
  }

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const toggle = (key: ToggleCategory) => {
    setStaged((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="cookie-modal-overlay" onClick={onClose}>
      <div
        className="cookie-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Centro de preferencias de privacidad"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="cookie-modal__header">
          <h2>Centro de preferencias de privacidad</h2>
          <button
            type="button"
            className="cookie-modal__close"
            aria-label="Cerrar"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <p className="cookie-modal__intro">
          Cuando visitas cualquier sitio web, este puede guardar o recuperar información en tu
          navegador, principalmente en forma de cookies. Puedes elegir qué tipos de cookies
          permitir. Bloquear algunas puede afectar tu experiencia en el sitio.
        </p>

        <div className="cookie-modal__list">
          <CategoryRow
            title="Cookies estrictamente necesarias"
            description="Necesarias para que el sitio funcione correctamente y no pueden desactivarse."
            isOpen={openCategory === "necessary"}
            onToggleOpen={() =>
              setOpenCategory((prev) => (prev === "necessary" ? null : "necessary"))
            }
            control={<span className="cookie-modal__always-active">Siempre activas</span>}
          />

          {CATEGORIES.map((category) => (
            <CategoryRow
              key={category.key}
              title={category.title}
              description={category.description}
              isOpen={openCategory === category.key}
              onToggleOpen={() =>
                setOpenCategory((prev) => (prev === category.key ? null : category.key))
              }
              control={
                <Toggle
                  checked={staged[category.key]}
                  onChange={() => toggle(category.key)}
                  label={category.title}
                />
              }
            />
          ))}
        </div>

        <div className="cookie-modal__footer btn__wrapper">
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => onSave(ALL_REJECTED)}
          >
            Rechazar todo
          </button>
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => onSave(ALL_ACCEPTED)}
          >
            Aceptar todo
          </button>
          <button type="button" className="btn" onClick={() => onSave(staged)}>
            Confirmar mis elecciones
          </button>
        </div>
      </div>
    </div>
  );
};

function CategoryRow({
  title,
  description,
  isOpen,
  onToggleOpen,
  control,
}: {
  title: string;
  description: string;
  isOpen: boolean;
  onToggleOpen: () => void;
  control: React.ReactNode;
}) {
  const uid = useId();

  return (
    <div className={`cookie-modal__row ${isOpen ? "is-open" : ""}`.trim()}>
      <div className="cookie-modal__row-header">
        <button
          type="button"
          className="cookie-modal__row-trigger"
          aria-expanded={isOpen}
          aria-controls={`cookie-panel-${uid}`}
          onClick={onToggleOpen}
        >
          <span className="cookie-modal__row-icon" aria-hidden="true">
            <Plus size={14} />
          </span>
          <h3>{title}</h3>
        </button>
        {control}
      </div>
      <div id={`cookie-panel-${uid}`} className="cookie-modal__row-panel">
        <p>{description}</p>
      </div>
    </div>
  );
}

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <label className="cookie-toggle">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        aria-label={label}
      />
      <span className="cookie-toggle__track">
        <span className="cookie-toggle__thumb" />
      </span>
    </label>
  );
}
