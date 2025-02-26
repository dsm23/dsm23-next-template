"use client";

import { useEffect, useState } from "react";
import type { FunctionComponent } from "react";
import Link from "next/link";
import { Button, buttonVariants } from "~/components/button";
import { usePrivacy } from "~/components/privacy-provider";
import { cn } from "~/utils/classNames";

export const PrivacyBanner: FunctionComponent = () => {
  const [closeBanner, setCloseBanner] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);

  const { showConsent, updateCookieConsent } = usePrivacy();

  const handleCloseBanner = () => {
    setAnimateOut(true);
  };

  useEffect(() => {
    if (animateOut) {
      setTimeout(() => {
        setCloseBanner(true);
      }, 300);
    }
  }, [animateOut]);

  console.info(showConsent);
  if (!showConsent || closeBanner) {
    return null;
  }

  return (
    <div
      className={cn(
        "fixed right-4 bottom-4 z-50 w-max max-w-[500px] rounded border-2 text-left text-base",
        {
          ["animate-out slide-out-to-bottom duration-300"]: animateOut,
        },
      )}
    >
      <div className="bg-background relative flex flex-col items-center justify-between p-6">
        <p>
          We use cookies, subject to your consent, to analyze the use of our
          website and to ensure you get the best experience. Third parties with
          whom we collaborate can also install cookies in order to show you
          personalized advertisements on other websites. Read our{" "}
          <Link
            className={cn(
              buttonVariants({ variant: "link" }),
              "px-0 text-base underline",
            )}
            href="/cookie"
            prefetch={false}
          >
            cookie policy
          </Link>{" "}
          for more information.
        </p>

        <div className="mt-6 flex w-full gap-4">
          <Button
            variant="secondary"
            className="ml-auto"
            onClick={() => {
              updateCookieConsent(false);
              handleCloseBanner();
            }}
          >
            Dismiss
          </Button>
          <Button
            variant="default"
            onClick={() => {
              updateCookieConsent(true);
              handleCloseBanner();
            }}
          >
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
};
