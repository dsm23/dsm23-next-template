import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import useMounted from ".";

describe("hooks", () => {
  describe("useMounted", () => {
    it("should return true immediately after mounting effects run", () => {
      const { result } = renderHook(() => useMounted());

      expect(result.current).toBe(true);
    });

    it("should maintain true state on subsequent re-renders", () => {
      const { result, rerender } = renderHook(() => useMounted());

      expect(result.current).toBe(true);

      rerender();

      expect(result.current).toBe(true);
    });
  });
});
