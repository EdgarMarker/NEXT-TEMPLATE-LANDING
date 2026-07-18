"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Consent,
  CONSENT_CHANGED_EVENT,
  getConsentCookie,
  setConsentCookie,
} from "@/app/common/lib/cookies/cookieConsent";

export const useCookieConsent = () => {
  const [consent, setConsent] = useState<Consent | null>(null);
  const [hasDecided, setHasDecided] = useState(false);

  useEffect(() => {
    const read = () => {
      const stored = getConsentCookie();
      setConsent(stored);
      setHasDecided(!!stored);
    };

    read();

    window.addEventListener(CONSENT_CHANGED_EVENT, read);
    return () => window.removeEventListener(CONSENT_CHANGED_EVENT, read);
  }, []);

  const saveConsent = useCallback((next: Consent) => {
    setConsentCookie(next);
    window.dispatchEvent(new Event(CONSENT_CHANGED_EVENT));
  }, []);

  return { consent, hasDecided, saveConsent };
};
