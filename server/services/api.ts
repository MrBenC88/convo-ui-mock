import axios from "axios";
import { FetchMessageParams, SendTextMessageBody } from "../types";
import {
  mockFetchMessagesResponse,
  mockFetchPhoneNumbersResponse,
} from "../data/mockResponses";

// This project was originally a take-home assignment restructured for public demo. All data is mock, and real API access has been stripped.
const BASE_URL = "INSERT URL HERE";

const getAuthHeader = () => {
  return {
    Authorization: process.env.YOUR_API_KEY!,
  };
};

/**
 * List phone numbers
 * Retrieve the list of phone numbers and users associated with your workspace.
 * @param userId (optional)
 */
export const fetchPhoneNumbers = async (userId?: string) => {
  // const res = await axios.get(`${BASE_URL}/phone-numbers`, {
  //   headers: getAuthHeader(),
  //   params: {
  //     userId,
  //   },
  // });
  // console.log(res);
  return mockFetchPhoneNumbersResponse;
};

/**
 * List messages
 * Retrieve a chronological list of messages exchanged between your number and specified participants, with support for filtering and pagination.
 * @param phoneNumberId
 * @param participants
 * @param maxResults
 * @param userId (optional)
 * @param createdAfter (optional)
 * @param createdBefore (optional)
 * @param pageToken (optional)
 */
export const fetchMessages = async (params: FetchMessageParams) => {
  // const res = await axios.get(`${BASE_URL}/messages`, {
  //   headers: getAuthHeader(),
  //   params,
  // });
  // console.log(res);
  return mockFetchMessagesResponse;
};

/**
 * Send a text message
 * Send a text message from your number to a recipient.
 * @body content
 * @body from
 * @body to
 * @body userId (optional)
 * @body setInboxStatus (optional)
 * @returns
 */
export const sendMessage = async (body: SendTextMessageBody) => {
  // const res = await axios.post(`${BASE_URL}/messages`, body, {
  //   headers: getAuthHeader(),
  // });
  return { data: "Successfully sent message" };
};
