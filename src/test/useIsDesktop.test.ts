import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { useIsDesktop } from "@/hooks/useIsDesktop";

describe("useIsDesktop", () => {
  const resizeWindow = (width: number) => {
    window.innerWidth = width;
    window.dispatchEvent(new Event("resize"));
  };

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("returns true if window width >= default breakpoint (900)", () => {
    resizeWindow(1024);
    const { result } = renderHook(() => useIsDesktop());
    expect(result.current).toBe(true);
  });

  it("returns false if window width < default breakpoint", () => {
    resizeWindow(600);
    const { result } = renderHook(() => useIsDesktop());
    expect(result.current).toBe(false);
  });

  it("updates when the window resized", () => {
    resizeWindow(1000);
    const { result } = renderHook(() => useIsDesktop());

    expect(result.current).toBe(true);

    act(() => {
      resizeWindow(500);
    });

    expect(result.current).toBe(false);
  });

  it("correctly updates with custom breakpoint", () => {
    resizeWindow(700);
    const { result } = renderHook(() => useIsDesktop(600));
    expect(result.current).toBe(true);

    act(() => {
      resizeWindow(500);
    });

    expect(result.current).toBe(false);
  });
});
