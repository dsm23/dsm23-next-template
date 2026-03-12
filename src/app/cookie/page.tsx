import type { FunctionComponent } from "react";
import type { Metadata } from "next";
import ClientPage from "./client-page";

export const metadata: Metadata = {
  description: "Cookie Policy",
  title: "Cookie Policy",
};

const CookiePage: FunctionComponent<PageProps<"/cookie">> = () => {
  return <ClientPage />;
};

export default CookiePage;
