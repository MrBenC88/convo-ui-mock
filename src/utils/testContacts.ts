import type { ContactType } from "@/types/types";

const personalPhone = import.meta.env.VITE_TEST_PHONE_NUMBER;
const personalPhoneFormatted = import.meta.env.VITE_TEST_FORMATTED_PHONE_NUMBER;

export const testContacts: ContactType[] = [
  {
    number: "+12223334444",
    formattedNumber: "(222) 333-4444",
    display: "John Smith",
    symbol: "📞",
  },
  {
    number: "+10000000002",
    formattedNumber: "(100) 000-0002",
    display: "Alice Johnson",
    symbol: "📞",
  },
  // {
  //   number: personalPhone,
  //   formattedNumber: personalPhoneFormatted,
  //   display: "Personal Phone",
  //   symbol: "📱",
  // },
];
