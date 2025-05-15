import { useMessages } from "@/hooks/useMessages";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";
import TopBar from "./TopBar";
import type { ConversationProps, Message } from "@/types/types";
import { useState } from "react";

const Conversation = ({
  participants,
  phoneNumberId,
  onBack,
}: ConversationProps) => {
  const {
    data = [],
    isLoading,
    error,
    refetch,
    loadMore,
  } = useMessages({ participants, phoneNumberId });
  const [localMessages, setLocalMessages] = useState<Message[]>([]);

  return (
    <div className="flex flex-col h-full">
      <TopBar participants={participants} onBack={onBack} />
      <MessageList
        messages={data}
        isLoading={isLoading}
        error={error}
        refetch={refetch}
        participants={participants}
        localMessages={localMessages}
        setLocalMessages={setLocalMessages}
        loadMore={loadMore}
      />
      <MessageInput
        phoneNumberId={phoneNumberId}
        participants={participants}
        localMessages={localMessages}
        setLocalMessages={setLocalMessages}
      />
    </div>
  );
};
export default Conversation;
