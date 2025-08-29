import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import CookiePage from "./ClientPage";

describe("pages", () => {
  describe("Cookie", () => {
    it("should render correctly", () => {
      render(<CookiePage />);

      expect(
        screen.getByText((content, element) => {
          return (
            element?.tagName.toLowerCase() === "h1" &&
            content.startsWith("Cookie Policy")
          );
        }),
      ).toBeInTheDocument();
    });
  });
});
