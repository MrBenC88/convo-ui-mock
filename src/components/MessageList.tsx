import { Skeleton } from "@/components/ui/skeleton";
import { type Message, type MessageListProps } from "@/types/types";
import MessageBubble from "./MessageBubble";
import { findParticipantData } from "@/utils/findParticipantData";
import { useRef } from "react";
import {
  useAutoScrollOnPageInit,
  useHandleLoadMoreScroll,
  usePreserveScrollOnLocalOptimisticMessage,
} from "@/hooks/scrollHooks";
import { mergeOptimisticUpdate } from "@/utils/mergeUtils";

const styles = {
  messageListContainer:
    "flex-1 overflow-y-auto px-4 py-3 space-y-4 h-full bg-white/5  border border-white/50 rounded-md",

  errorContainer:
    "flex-1 flex flex-col items-center justify-center text-sm text-red-500 gap-2",
  retryButton:
    "text-white px-3 py-1 rounded border border-red-500 hover:bg-red-500 hover:text-white transition",
  messageLoadingSkeletonContainer: "flex-1 px-5 py-5 space-y-4",
  messageLoadingSkeleton: "bg-zinc-700 rounded px-5 py-3",
};

const MessageList = ({
  messages,
  isLoading,
  error,
  refetch,
  participants,
  localMessages,
  loadMore,
}: MessageListProps) => {
  const recipientParticipantData = findParticipantData(participants[0]);
  const containerRef = useRef<HTMLDivElement>(null);

  useAutoScrollOnPageInit(containerRef, messages.length);
  useHandleLoadMoreScroll(containerRef, loadMore);
  usePreserveScrollOnLocalOptimisticMessage(containerRef, localMessages.length);

  // Merge and deduplicate local messages after optimistic update
  const allMessages: Message[] = mergeOptimisticUpdate(messages, localMessages);

  if (isLoading) return <MessageLoadingSkeleton />;
  if (error) return <ErrorMessage refetch={refetch} />;

  return (
    <div className={styles.messageListContainer} ref={containerRef}>
      {allMessages.map((msg) => (
        <MessageBubble
          key={msg.id}
          message={msg}
          participantContact={recipientParticipantData}
        />
      ))}
    </div>
  );
};

const ErrorMessage = ({ refetch }: { refetch: () => void }) => (
  <div className={styles.errorContainer}>
    <span>Failed to load messages.</span>
    <button onClick={refetch} className={styles.retryButton} type="button">
      Retry
    </button>
  </div>
);

const MessageLoadingSkeleton = () => (
  <div className={styles.messageLoadingSkeletonContainer}>
    {Array.from({ length: 6 }).map((_, i) => (
      <Skeleton
        key={i}
        data-testid={"skeleton-test"}
        className={styles.messageLoadingSkeleton}
      />
    ))}
  </div>
);

export default MessageList;
