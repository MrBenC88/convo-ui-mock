import express from "express";
import { fetchMessages, sendMessage } from "../services/api";
import { SendTextMessageBody } from "../types";

const router = express.Router();

router.get("/messages", async (req, res) => {
  const {
    phoneNumberId,
    participants,
    maxResults,
    userId,
    createdAfter,
    createdBefore,
    pageToken,
  } = req.query;

  if (!phoneNumberId) {
    res.status(400).json({ error: "Missing phoneNumberId" });
    return;
  }

  if (!participants) {
    res.status(400).json({ error: "Missing participants" });
    return;
  }

  try {
    const response = await fetchMessages({
      phoneNumberId: phoneNumberId as string,
      participants: participants as string[],
      maxResults: Number(maxResults) || 10,
      userId: userId as string | undefined,
      createdAfter: createdAfter as string | undefined,
      createdBefore: createdBefore as string | undefined,
      pageToken: pageToken as string | undefined,
    });
    res.json(response);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Error fetching messages", message, res.status);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

router.post("/messages", async (req, res) => {
  const { content, from, to } = req.body;

  if (!content || !from || !to) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }

  try {
    const response = await sendMessage(req.body as SendTextMessageBody);
    res.json(response.data);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Error sending message", message, res.status);
    res.status(500).json({ error: "Failed to send message" });
  }
});

export default router;
