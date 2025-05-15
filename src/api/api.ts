import type { GetMessageResponse, PhoneNumber } from "@/types/types";

export const getPhoneNumbers = async (): Promise<PhoneNumber[]> => {
  const res = await fetch("/api/phone-numbers");
  return await res.json();
};

export const getMessages = async (
  phoneNumberId: string,
  participants: string[],
  maxResults: number,
  createdBefore?: string,
  pageToken?: string
): Promise<GetMessageResponse> => {
  const participantParams = participants
    .map((p) => `participants=${encodeURIComponent(p)}`)
    .join("&");

  const query = [
    `phoneNumberId=${phoneNumberId}`,
    `maxResults=${maxResults}`,
    participantParams,
    createdBefore ? `createdBefore=${encodeURIComponent(createdBefore)}` : "",
    pageToken ? `pageToken=${encodeURIComponent(pageToken)}` : "",
  ]
    .filter(Boolean)
    .join("&");
  const url = `/api/messages?${query}`;

  const res = await fetch(url);
  const json = await res.json();

  return {
    data: json.data,
    nextPageToken: json.nextPageToken,
  };
};

export const sendMessage = async ({
  from,
  to,
  content,
}: {
  from: string;
  to: string[];
  content: string;
}) => {
  const res = await fetch("/api/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from, to, content }),
  });

  if (!res.ok) {
    console.log("❌ Failed to send message: ", content, res.status);
    throw new Error(`Failed to send message: ${content} ${res.status}`);
  } else if (res.ok) {
    console.log("✅ Message sent successfully: ", content);
  }
  return await res.json();
};
