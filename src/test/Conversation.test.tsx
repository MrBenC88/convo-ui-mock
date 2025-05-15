import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Conversation from "@/components/Conversation";
import * as useMessagesTest from "@/hooks/useMessages";

vi.mock("@/components/TopBar", () => ({
  default: () => <div data-testid="topbar" />,
}));

vi.mock("@/components/MessageList", () => ({
  default: () => <div data-testid="message-list" />,
}));

vi.mock("@/components/MessageInput", () => ({
  default: () => <div data-testid="message-input" />,
}));

describe("Conversation", () => {
  const baseProps = {
    participants: ["+12223334444"],
    phoneNumberId: "12345",
    onBack: vi.fn(),
  };

  beforeEach(() => {
    vi.spyOn(useMessagesTest, "useMessages").mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
      refetch: vi.fn(),
      loadMore: vi.fn(),
    });
  });

  it("renders all components in conversation", () => {
    render(<Conversation {...baseProps} />);
    expect(screen.getByTestId("topbar")).toBeInTheDocument();
    expect(screen.getByTestId("message-list")).toBeInTheDocument();
    expect(screen.getByTestId("message-input")).toBeInTheDocument();
  });

  it("passes correct props to useMessages", () => {
    const spy = vi.spyOn(useMessagesTest, "useMessages");
    render(<Conversation {...baseProps} />);
    expect(spy).toHaveBeenCalledWith({
      participants: baseProps.participants,
      phoneNumberId: baseProps.phoneNumberId,
    });
  });
});
