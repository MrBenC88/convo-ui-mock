import express from "express";
import { fetchPhoneNumbers } from "../services/api";

const router = express.Router();

router.get("/phone-numbers", async (req, res) => {
  const { userId } = req.query;

  try {
    const response = await fetchPhoneNumbers(userId as string);
    res.json(response.data);
  } catch (error: unknown) {
    console.error("Error fetching phone numbers", error);
    res.status(500).json({ error: "Failed to fetch phone numbers" });
  }
});

export default router;
