import { describe, expect, it } from "@jest/globals";
import { render, screen } from "@testing-library/react";
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
