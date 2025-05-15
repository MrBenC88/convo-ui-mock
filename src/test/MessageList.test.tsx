import { describe, it, vi, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import MessageList from "@/components/MessageList";
import type { MessageListProps, Message } from "@/types/types";

// Mock child components and hooks
vi.mock("@/components/MessageBubble", () => ({
  default: ({ message }: { message: Message }) => (
    <div data-testid="mock-bubble">{message.text}</div>
  ),
}));

vi.mock("@/utils/findParticipantData", () => ({
  findParticipantData: () => ({ display: "Test User", symbol: "TU" }),
}));

vi.mock("@/hooks/scrollHooks", () => ({
  useAutoScrollOnPageInit: () => {},
  useHandleLoadMoreScroll: () => {},
  usePreserveScrollOnLocalOptimisticMessage: () => {},
}));

vi.mock("@/utils/mergeUtils", () => ({
  mergeOptimisticUpdate: (msgs: Message[], locals: Message[]) => [
    ...msgs,
    ...locals,
  ],
}));

const baseProps: MessageListProps = {
  messages: [
    {
      id: "1",
      text: "Hello!",
      createdAt: new Date().toISOString(),
      from: "123",
      to: ["456"],
      direction: "incoming",
      status: "sent",
      phoneNumberId: "abc",
      userId: "",
      updatedAt: "",
    },
  ],
  localMessages: [],
  isLoading: false,
  error: null,
  refetch: vi.fn(),
  participants: ["456"],
  loadMore: vi.fn(),
  setLocalMessages: vi.fn(),
};

describe("MessageList", () => {
  it("renders all messages including local optimistic ones", () => {
    render(<MessageList {...baseProps} />);
    expect(screen.getByTestId("mock-bubble")).toHaveTextContent("Hello!");
  });

  it("renders loading skeletons when loading", () => {
    render(<MessageList {...baseProps} isLoading={true} messages={[]} />);
    expect(screen.getAllByTestId("skeleton-test")).toHaveLength(6);
  });

  it("shows error UI and retry button when error is present", () => {
    render(
      <MessageList
        {...baseProps}
        error={new Error("Load failed")}
        isLoading={false}
      />
    );
    expect(screen.getByText("Failed to load messages.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Retry" })).toBeInTheDocument();
  });

  it("calls refetch on Retry click", () => {
    const mockRefetch = vi.fn();
    render(
      <MessageList
        {...baseProps}
        error={new Error("fail")}
        refetch={mockRefetch}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: "Retry" }));
    expect(mockRefetch).toHaveBeenCalled();
  });

  it("renders localMessages with base messages", () => {
    const propsWithLocal = {
      ...baseProps,
      localMessages: [
        {
          id: "temp-1",
          text: "Test message",
          createdAt: new Date().toISOString(),
          from: "123",
          to: ["456"],
          direction: "outgoing" as "outgoing" | "incoming",
          status: "queued" as const,
          phoneNumberId: "abc",
          userId: "",
          updatedAt: "",
        },
      ],
    };
    render(<MessageList {...propsWithLocal} />);
    expect(screen.getByText("Test message")).toBeInTheDocument();
    expect(screen.getByText("Hello!")).toBeInTheDocument();
  });
});
