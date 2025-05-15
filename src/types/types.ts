export type PhoneUser = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  groupId: string;
};

export type PhoneNumberRestrictions = {
  messaging: Record<"CA" | "US" | "Intl", string>;
  calling: Record<"CA" | "US" | "Intl", string>;
};

export type PhoneNumber = {
  id: string;
  groupId: string;
  name: string;
  number: string;
  formattedNumber: string;
  symbol: string;
  users: PhoneUser[];
  restrictions: PhoneNumberRestrictions;
  createdAt?: string;
  updatedAt?: string;
  forward?: string | null;
  portRequestId?: string | null;
  portingStatus?: string | null;
};

export type Message = {
  id: string;
  from: string;
  to: string[];
  text: string;
  phoneNumberId: string;
  direction: "incoming" | "outgoing";
  userId: string;
  createdAt: string;
  updatedAt: string;
  status?: MessageStatus;
  pageToken?: string;
};

export type GetMessageResponse = {
  data: Message[];
  nextPageToken?: string;
};

export type UseMessagesProps = {
  phoneNumberId: string;
  participants: string[];
};

export type ContactType = {
  number: string;
  formattedNumber: string;
  display: string;
  symbol: string;
};

export type MessageStatus = "queued" | "sent" | "delivered" | "undelivered";

export type ConversationProps = {
  participants: string[];
  phoneNumberId: string;
  onBack: () => void;
};

export type MessageListProps = {
  messages: Message[];
  participants: string[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
  localMessages: Message[];
  setLocalMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  loadMore: () => Promise<void>;
};

export type MessageInputProps = {
  phoneNumberId: string;
  participants: string[];
  localMessages: Message[];
  setLocalMessages: React.Dispatch<React.SetStateAction<Message[]>>;
};

export type TopBarProps = {
  participants: string[];
  onBack?: () => void;
};

export type ParticipantInfoProps = {
  participant: string;
};

export type MessageBubbleProps = {
  message: Message;
  participantContact: ContactType;
};

export type MessageStatusProps = {
  messageStatus?: MessageStatus;
  isOutgoing: boolean;
};
