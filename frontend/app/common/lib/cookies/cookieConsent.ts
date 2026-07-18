export type Consent = {
  necessary: true;
  performance: boolean;
  functional: boolean;
  targeting: boolean;
};

export const CONSENT_COOKIE_NAME = "cookie_consent";
export const CONSENT_CHANGED_EVENT = "cookie-consent-changed";

export const ALL_ACCEPTED: Consent = {
  necessary: true,
  performance: true,
  functional: true,
  targeting: true,
};

export const ALL_REJECTED: Consent = {
  necessary: true,
  performance: false,
  functional: false,
  targeting: false,
};

export const getCookie = (name: string) => {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
  return null;
};

export const setCookie = (name: string, value: string, days: number) => {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/; SameSite=Lax`;
};

export const getConsentCookie = (): Consent | null => {
  const raw = getCookie(CONSENT_COOKIE_NAME);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(decodeURIComponent(raw));
    return {
      necessary: true,
      performance: parsed?.performance === true,
      functional: parsed?.functional === true,
      targeting: parsed?.targeting === true,
    };
  } catch {
    return null;
  }
};

export const setConsentCookie = (consent: Consent) => {
  setCookie(CONSENT_COOKIE_NAME, encodeURIComponent(JSON.stringify(consent)), 180);
};
