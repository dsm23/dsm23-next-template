import type { FunctionComponent } from "react";
import { Inter } from "next/font/google";
import { headers } from "next/headers";
import { PrivacyBanner } from "~/components/privacy-banner";
import { PrivacyProvider } from "~/components/privacy-provider";
import Swetrix from "~/components/swetrix";
import { ThemeProvider } from "~/components/theme-provider";
import { ThemeSwitcher } from "~/components/theme-switcher";
import { cn } from "~/utils/class-names";

import "~/styles/tailwind.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const RootLayout: FunctionComponent<LayoutProps<"/">> = async ({
  children,
}) => {
  const headersList = await headers();
  const nonce = headersList.get("x-nonce") ?? undefined;

  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
      className={cn("font-sans", inter.variable)}
    >
      <body
        className={cn(
          "min-h-dvh bg-background font-sans antialiased",
          inter.variable,
        )}
      >
        <Swetrix />
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
