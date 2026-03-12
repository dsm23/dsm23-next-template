"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { FunctionComponent, ReactNode } from "react";
import canUseDom from "~/utils/can-use-dom";

type Privacy = {
  cookieConsent?: boolean;
  showConsent?: boolean;
  updateCookieConsent: (accepted: boolean) => void;
};

const noop = () => {};

const Context = createContext<Privacy>({
  cookieConsent: undefined,
  showConsent: undefined,
  updateCookieConsent: noop,
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

  const value = useMemo(
    () => ({ cookieConsent, showConsent, updateCookieConsent }),
    [cookieConsent, showConsent, updateCookieConsent],
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

const usePrivacy = (): Privacy => useContext(Context);

export { PrivacyProvider, usePrivacy };
