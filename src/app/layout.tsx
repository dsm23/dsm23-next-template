import type { FunctionComponent, PropsWithChildren } from "react";
import { Inter as FontSans } from "next/font/google";
import { headers } from "next/headers";
import { ThemeProvider } from "~/components/theme-provider";
import { ThemeSwitcher } from "~/components/theme-switcher";
import { cn } from "~/utils/classNames";

import "~/styles/tailwind.css";

import { PrivacyBanner } from "~/components/privacy-banner";
import { PrivacyProvider } from "~/components/privacy-provider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const RootLayout: FunctionComponent<PropsWithChildren> = async ({
  children,
}) => {
  const headersList = await headers();
  const nonce = headersList.get("x-nonce") ?? undefined;

  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body
        className={cn(
          "bg-background min-h-dvh font-sans antialiased",
          fontSans.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          nonce={nonce}
        >
          <PrivacyProvider>
            {children}
            <footer className="mx-auto flex w-full items-center justify-center border-t py-16 text-center text-xs">
              <ThemeSwitcher />
              <PrivacyBanner />
            </footer>
          </PrivacyProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
