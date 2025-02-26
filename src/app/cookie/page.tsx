import type { FunctionComponent } from "react";
import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  description: "Cookie Policy",
  title: "Cookie Policy",
};

const CookiePage: FunctionComponent = (props) => {
  return <ClientPage {...props} />;
};

export default CookiePage;
