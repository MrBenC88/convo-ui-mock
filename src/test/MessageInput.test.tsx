import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useSendMessage } from "@/hooks/useSendMessage";
import MessageInput from "@/components/MessageInput";

vi.mock("@/hooks/useSendMessage", () => ({
  useSendMessage: vi.fn(),
}));

const mockSend = vi.fn();
const mockSetLocalMessages = vi.fn();

const baseProps = {
  phoneNumberId: "123",
  participants: ["+15550001111"],
  setLocalMessages: mockSetLocalMessages,
  localMessages: [],
};

describe("MessageInput", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (useSendMessage as any).mockReturnValue({
      send: mockSend,
      sending: false,
      error: null,
      isError: false,
    });
  });

  it("renders input and send button", () => {
    render(<MessageInput {...baseProps} />);
    expect(screen.getByTestId("message-input")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Type a message")).toBeInTheDocument();
    expect(screen.getByText("Send")).toBeInTheDocument();
  });

  it("validates empty input on Enter", async () => {
    render(<MessageInput {...baseProps} />);
    const input = screen.getByPlaceholderText("Type a message");

    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    expect(
      await screen.findByText("Message cannot be empty.")
    ).toBeInTheDocument();
  });

  it("validates long input", async () => {
    render(<MessageInput {...baseProps} />);
    const input = screen.getByPlaceholderText("Type a message");
    fireEvent.change(input, {
      target: { value: "a".repeat(501) },
    });
    fireEvent.click(screen.getByText("Send"));
    expect(
      await screen.findByText("Limit to 500 characters.")
    ).toBeInTheDocument();
  });

  it("calls send and updates local messages", async () => {
    render(<MessageInput {...baseProps} />);
    const input = screen.getByPlaceholderText("Type a message");

    fireEvent.change(input, { target: { value: "Hello world" } });
    fireEvent.click(screen.getByText("Send"));

    await waitFor(() => {
      expect(mockSend).toHaveBeenCalled();
      expect(mockSetLocalMessages).toHaveBeenCalled();
    });
  });

  it("displays error message on send failure", async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (useSendMessage as any).mockReturnValue({
      send: mockSend,
      sending: false,
      error: null,
      isError: true,
    });

    render(<MessageInput {...baseProps} />);
    const input = screen.getByPlaceholderText("Type a message");
    fireEvent.change(input, { target: { value: "Failure" } });
    fireEvent.click(screen.getByText("Send"));

    await waitFor(() => {
      expect(screen.getByTestId("error-message")).toBeInTheDocument();
    });
  });
});
