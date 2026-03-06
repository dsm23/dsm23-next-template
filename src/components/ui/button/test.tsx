import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from ".";

describe("component", () => {
  describe("Button", () => {
    it("should render correctly", () => {
      render(<Button>Hello, World!</Button>);

      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("should render correctly, with render prop", () => {
      render(<Button render={<a href="#" />}>Hello, World!</Button>);

      expect(screen.getByRole("link")).toBeInTheDocument();
    });
  });
});
