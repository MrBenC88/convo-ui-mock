export type SendTextMessageBody = {
  content: string;
  from: string;
  to: string[];
  userId?: string;
  setInboxStatus?: string;
};

export type FetchMessageParams = {
  phoneNumberId: string;
  participants: string[];
  maxResults: number;
  userId?: string;
  createdAfter?: string;
  createdBefore?: string;
  pageToken?: string;
};
