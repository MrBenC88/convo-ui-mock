import type { MessageBubbleProps } from "@/types/types";
import MessageStatusBlock from "./MessageStatusBlock";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const styles = {
  outgoingContainer: "flex flex-col items-end",
  outgoingMeta: "text-xs text-zinc-500 mb-1",
  outgoingBubble:
    "px-4 py-2 max-w-xs text-sm whitespace-pre-wrap rounded-xl shadow-md bg-blue-600 text-white rounded-br-none",

  incomingContainer: "flex items-start gap-3",
  avatar: "h-8 w-8 text-xs",
  outerWrapper: "flex flex-col items-start",
  innerWrapper: "text-xs text-zinc-400 leading-tight",
  innerContainer: "font-medium",
  incomingBubble:
    "mt-1 px-4 py-2 max-w-xs text-sm whitespace-pre-wrap rounded-xl shadow-md bg-zinc-800 text-zinc-100 rounded-bl-none",
};

const MessageBubble = ({ message, participantContact }: MessageBubbleProps) => {
  const isOutgoing = message.direction === "outgoing";
  const time = new Date(message.createdAt).toLocaleTimeString();
  const formattedDate = new Date(message.createdAt).toLocaleDateString();

  if (isOutgoing) {
    return (
      <div className={styles.outgoingContainer}>
        <div className={styles.outgoingMeta}>
          You • {formattedDate} • {time}
        </div>
        <div className={styles.outgoingBubble}>{message.text}</div>
        <MessageStatusBlock messageStatus={message.status} isOutgoing />
      </div>
    );
  }

  return (
    <div className={styles.incomingContainer}>
      <Avatar className={styles.avatar}>
        <AvatarFallback>{participantContact.symbol}</AvatarFallback>
      </Avatar>
      <div className={styles.outerWrapper}>
        <div className={styles.innerWrapper}>
          <div className={styles.innerContainer}>
            {participantContact.display} • {formattedDate} • {time}
          </div>
        </div>
        <div className={styles.incomingBubble}>{message.text}</div>
      </div>
    </div>
  );
};

export default MessageBubble;
