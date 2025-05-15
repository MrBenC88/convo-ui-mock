import { sendMessage } from "@/api/api";
import { useState } from "react";

export const useSendMessage = () => {
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const send = async ({
    from,
    to,
    content,
  }: {
    from: string;
    to: string[];
    content: string;
  }) => {
    setSending(true);
    setError(null);

    try {
      await sendMessage({ from, to, content });
    } catch (err) {
      const finalError =
        err instanceof Error ? err : new Error("Unknown error");
      setError(finalError);
      console.error("Failed to send message:", finalError);
    } finally {
      setSending(false);
    }
  };

  return { send, sending, error, isError: !!error };
};
