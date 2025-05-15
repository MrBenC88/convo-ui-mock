import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useSendMessage } from "@/hooks/useSendMessage";
import { sendMessage } from "@/api/api";

vi.mock("@/api/api", async () => {
  const actual = await vi.importActual<typeof import("@/api/api")>("@/api/api");
  return {
    ...actual,
    sendMessage: vi.fn(),
  };
});

const mockedSendMessage = sendMessage as unknown as ReturnType<typeof vi.fn>;

describe("useSendMessage", () => {
  const mockMessage = {
    from: "123",
    to: ["+12341234567"],
    content: "Hello World",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("starts with default values", () => {
    const { result } = renderHook(() => useSendMessage());
    expect(result.current.sending).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.isError).toBe(false);
  });

  it("should set sending to true during API call and then false", async () => {
    mockedSendMessage.mockResolvedValueOnce({});
    const { result } = renderHook(() => useSendMessage());

    await act(() => result.current.send(mockMessage));

    expect(mockedSendMessage).toHaveBeenCalled();
    expect(result.current.sending).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.isError).toBe(false);
  });

  it("should set error on failure", async () => {
    mockedSendMessage.mockRejectedValueOnce(new Error("API failed"));
    const { result } = renderHook(() => useSendMessage());

    await act(() => result.current.send(mockMessage));

    expect(result.current.sending).toBe(false);
    expect(result.current.error?.message).toBe("API failed");
    expect(result.current.isError).toBe(true);
  });

  it("should return error and set message to unknown error", async () => {
    mockedSendMessage.mockRejectedValueOnce("string error");
    const { result } = renderHook(() => useSendMessage());

    await act(() => result.current.send(mockMessage));

    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error?.message).toBe("Unknown error");
    expect(result.current.isError).toBe(true);
  });
});
