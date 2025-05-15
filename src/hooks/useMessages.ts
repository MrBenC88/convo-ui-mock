import { useEffect, useRef, useState } from "react";
import { getMessages } from "@/api/api";
import type { Message, UseMessagesProps } from "@/types/types";

const MAX_RESULTS = 10;
const POLL_INTERVAL = 5000;

export const useMessages = ({
  phoneNumberId,
  participants,
}: UseMessagesProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const latestTimestampRef = useRef<string | null>(null);

  const fetchInitial = async () => {
    try {
      setIsLoading(true);
      const { data, nextPageToken } = await getMessages(
        phoneNumberId,
        participants,
        MAX_RESULTS
      );
      const sorted = dedupeMessages(data);
      setMessages(sorted);
      setNextPageToken(nextPageToken ?? null);

      const latest = sorted[sorted.length - 1];
      if (latest) latestTimestampRef.current = latest.createdAt;
    } catch (err) {
      console.error("❌ Initial fetch failed", err);
      setError(err instanceof Error ? err : new Error("Unknown error"));
    } finally {
      setIsLoading(false);
    }
  };

  const loadMore = async () => {
    if (!nextPageToken || isFetchingMore) return;

    try {
      setIsFetchingMore(true);
      const { data: more, nextPageToken: newToken } = await getMessages(
        phoneNumberId,
        participants,
        MAX_RESULTS,
        new Date(
          Math.min(...messages.map((msg) => new Date(msg.createdAt).getTime()))
        ).toISOString(),
        nextPageToken
      );
      const combined = dedupeMessages([...more, ...messages]);

      setMessages(combined);
      setNextPageToken(newToken ?? null);
    } catch (err) {
      console.error("❌ loadMore failed", err);
    } finally {
      setIsFetchingMore(false);
    }
  };

  const poll = async () => {
    try {
      const { data: latest } = await getMessages(
        phoneNumberId,
        participants,
        MAX_RESULTS
      );

      if (!latest.length) return;

      const latestFromServer = latest.reduce((latest, msg) =>
        new Date(msg.createdAt) > new Date(latest.createdAt) ? msg : latest
      );
      const currentLatest = latestTimestampRef.current;

      const hasNew = latest.some(
        (msg) =>
          !currentLatest || new Date(msg.createdAt) > new Date(currentLatest)
      );

      if (hasNew) {
        const merged = dedupeMessages([...messages, ...latest]);
        setMessages(merged);
        latestTimestampRef.current = latestFromServer.createdAt;
      } else {
        console.log("📭 No new messages to append");
      }
    } catch (err) {
      console.error("❌ polling failed", err);
    }
  };

  useEffect(() => {
    fetchInitial();
    const interval = setInterval(poll, POLL_INTERVAL);
    return () => clearInterval(interval);
  }, [phoneNumberId, participants.join(",")]);

  return {
    data: messages,
    isLoading,
    error,
    loadMore,
    refetch: fetchInitial,
  };
};

const dedupeMessages = (messages: Message[]): Message[] => {
  const seen = new Set<string>();
  return messages
    .filter((msg) => {
      if (seen.has(msg.id)) return false;
      seen.add(msg.id);
      return true;
    })
    .sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
};
