"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { FunctionComponent, ReactNode } from "react";
import canUseDom from "~/utils/canUseDom";

type Privacy = {
  cookieConsent?: boolean;
  showConsent?: boolean;
  updateCookieConsent: (accepted: boolean) => void;
};

const Context = createContext<Privacy>({
  cookieConsent: undefined,
  showConsent: undefined,
  updateCookieConsent: () => false,
});

type CookieConsent = {
  accepted: boolean;
  at: string;
};

const getLocaleStorage = (): CookieConsent | null =>
  canUseDom
    ? (JSON.parse(
        window.localStorage.getItem("cookieConsent") ?? "null",
      ) as CookieConsent)
    : null;

const setLocaleStorage = (accepted: boolean) => {
  const cookieConsent: CookieConsent = {
    accepted,
    at: new Date().toISOString(),
  };
  window.localStorage.setItem("cookieConsent", JSON.stringify(cookieConsent));
};

const PrivacyProvider: FunctionComponent<{ children: ReactNode }> = ({
  children,
}) => {
  const [showConsent, setShowConsent] = useState<boolean | undefined>();
  const [cookieConsent, setCookieConsent] = useState<boolean | undefined>();

  const updateCookieConsent = useCallback((accepted: boolean) => {
    setCookieConsent(accepted);
    setLocaleStorage(accepted);
  }, []);

  useEffect(() => {
    try {
      const consent = getLocaleStorage();

      if (consent) {
        setCookieConsent(consent.accepted || false);
        return;
      }

      setCookieConsent(false);
      setShowConsent(true);
    } catch (err) {
      console.error(err);
    }
  }, [updateCookieConsent]);

  return (
    <Context.Provider
      value={{ cookieConsent, showConsent, updateCookieConsent }}
    >
      {children}
    </Context.Provider>
  );
};

const usePrivacy = (): Privacy => useContext(Context);

export { PrivacyProvider, usePrivacy };
