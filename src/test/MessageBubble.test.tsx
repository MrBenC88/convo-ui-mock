import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeAll, vi } from "vitest";
import MessageBubble from "@/components/MessageBubble";

const mockMessage = {
  id: "1",
  from: "111",
  to: ["222"],
  text: "Hello there!",
  direction: "outgoing",
  createdAt: new Date("2024-01-01T12:34:56Z").toISOString(),
  status: "sent" as const,
  phoneNumberId: "111",
  userId: "",
  updatedAt: "",
};

const mockContact = {
  display: "Alice Smith",
  symbol: "AS",
  number: "+15550001111",
  formattedNumber: "+1(555)222-1111",
};

beforeAll(() => {
  vi.spyOn(Date.prototype, "toLocaleTimeString").mockReturnValue("12:34 PM");
  vi.spyOn(Date.prototype, "toLocaleDateString").mockReturnValue("Jan 1, 2024");
});

describe("MessageBubble", () => {
  it("renders an outgoing message correctly", () => {
    render(
      <MessageBubble
        message={{ ...mockMessage, direction: "outgoing" }}
        participantContact={mockContact}
      />
    );

    expect(screen.getByText("Hello there!")).toBeInTheDocument();
    expect(
      screen.getByText("You • Jan 1, 2024 • 12:34 PM")
    ).toBeInTheDocument();
  });

  it("renders an incoming message with avatar and sender name", () => {
    render(
      <MessageBubble
        message={{ ...mockMessage, direction: "incoming" }}
        participantContact={mockContact}
      />
    );

    expect(screen.getByText("Hello there!")).toBeInTheDocument();
    expect(
      screen.getByText("Alice Smith • Jan 1, 2024 • 12:34 PM")
    ).toBeInTheDocument();
    expect(screen.getByText("AS")).toBeInTheDocument();
  });
});
