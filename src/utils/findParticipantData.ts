import type { ContactType } from "@/types/types";
import { testContacts } from "./testContacts";

export const findParticipantData = (participant: string): ContactType => {
  const match = testContacts.find((p) => p.number === participant);
  return (
    match ?? {
      number: participant,
      formattedNumber: participant,
      display: participant,
      symbol: "👤",
    }
  );
};
