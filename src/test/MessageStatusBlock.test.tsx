import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import MessageStatusBlock from "@/components/MessageStatusBlock";
import type { MessageStatusProps } from "@/types/types";

const mockStatus: MessageStatusProps = {
  messageStatus: "sent",
  isOutgoing: true,
};

describe("MessageStatusBlock", () => {
  it("renders sent status", () => {
    render(<MessageStatusBlock {...mockStatus} />);

    expect(screen.getByText("Sent")).toBeInTheDocument();
  });

  it("renders queued status", () => {
    render(<MessageStatusBlock {...mockStatus} messageStatus="queued" />);

    expect(screen.getByText("Sending...")).toBeInTheDocument();
  });

  it("renders undelivered status", () => {
    render(<MessageStatusBlock {...mockStatus} messageStatus="undelivered" />);

    expect(screen.getByText("Failed to send")).toBeInTheDocument();
  });

  it("renders sent status", () => {
    render(<MessageStatusBlock {...mockStatus} messageStatus="delivered" />);

    expect(screen.getByText("Delivered")).toBeInTheDocument();
  });
});
