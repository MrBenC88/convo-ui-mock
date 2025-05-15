import type { MessageStatusProps } from "@/types/types";
import { Clock, RefreshCcw } from "lucide-react";

const MessageStatusBlock = ({
  messageStatus,
  isOutgoing,
}: MessageStatusProps) => {
  return (
    isOutgoing &&
    messageStatus && (
      <div className="text-xs text-zinc-400 mt-1 flex items-center gap-1">
        {messageStatus === "queued" && (
          <>
            <Clock className="w-3 h-3" />
            Sending...
          </>
        )}
        {messageStatus === "undelivered" && (
          <>
            <RefreshCcw className="w-3 h-3 text-red-500" />
            Failed to send
          </>
        )}
        {messageStatus === "delivered" && <>Delivered</>}
        {messageStatus === "sent" && <>Sent</>}
      </div>
    )
  );
};
export default MessageStatusBlock;
