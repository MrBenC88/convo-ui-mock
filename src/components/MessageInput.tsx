import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSendMessage } from "@/hooks/useSendMessage";
import type { Message, MessageInputProps } from "@/types/types";

const MAX_MESSAGE_LENGTH = 500;

const styles = {
  messageInputContainer:
    "sticky bottom-0 bg-zinc-950 border-t border-zinc-800 p-4 flex flex-col gap-1",
  messageInput: "flex items-center gap-2",
  validationError: "text-xs text-red-400 pl-1",
  errorMessage: "text-xs text-red-400 pl-1",
};

const MessageInput = ({
  phoneNumberId,
  participants,
  setLocalMessages,
}: MessageInputProps) => {
  const [text, setText] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);
  const { send, sending, error, isError } = useSendMessage();

  const buildOptimisticMessage = (message: string) => {
    const optimisticMessage: Message = {
      id: `temp-${Date.now()}`,
      from: phoneNumberId,
      to: [participants[0]],
      text: message,
      direction: "outgoing",
      createdAt: new Date().toISOString(),
      status: "queued",
      phoneNumberId: phoneNumberId,
      userId: "",
      updatedAt: "",
    };
    return optimisticMessage;
  };

  const handleSend = async () => {
    const trimmedMessage = text.trim();
    const validation = validateMessage(trimmedMessage);
    if (validation) return setValidationError(validation);

    // Build optimistic message ============================
    const optimisticMessage: Message = buildOptimisticMessage(trimmedMessage);
    setLocalMessages((prev) => [...prev, optimisticMessage]);
    // =====================================================

    await send({
      from: phoneNumberId,
      to: [participants[0]],
      content: trimmedMessage,
    });

    // Update optimistic message in local message state =====
    setLocalMessages((prev) =>
      prev.map((msg) =>
        msg.id === optimisticMessage.id
          ? { ...msg, status: isError ? "undelivered" : "sent" }
          : msg
      )
    );
    // =====================================================

    // Only reset the text if the send was successful
    if (!isError) setText("");
  };

  return (
    <div className={styles.messageInputContainer}>
      <div className={styles.messageInput}>
        <Input
          data-testid="message-input"
          placeholder="Type a message"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          //maxLength={MAX_MESSAGE_LENGTH}
        />
        <Button
          onClick={handleSend}
          disabled={sending || text.trim().length === 0}
        >
          Send
        </Button>
      </div>

      {validationError && (
        <div className={styles.validationError}>{validationError}</div>
      )}
      {isError && (
        <div className={styles.errorMessage} data-testid="error-message">
          Failed to send message. Please try again. {error?.name} -{" "}
          {error?.message}.
        </div>
      )}
    </div>
  );
};

const validateMessage = (value: string) => {
  if (!value) {
    return "Message cannot be empty.";
  }
  if (value.length > MAX_MESSAGE_LENGTH) {
    return `Limit to ${MAX_MESSAGE_LENGTH} characters.`;
  }
  return null;
};

export default MessageInput;
