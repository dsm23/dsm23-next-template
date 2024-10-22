import type { FunctionComponent, PropsWithChildren } from "react";
import { Inter as FontSans } from "next/font/google";
import { headers } from "next/headers";
import { ThemeProvider } from "~/components/theme-provider";
import { cn } from "~/utils/classNames";

import "~/styles/tailwind.css";

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
          "min-h-dvh bg-background font-sans antialiased",
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
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
