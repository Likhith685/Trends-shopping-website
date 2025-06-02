import express from "express";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const router = express.Router();

// Initialize with correct API version
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/", async (req, res) => {
  try {
    const { messages } = req.body;

    const prompt = messages.map(
      (msg) => `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}`
    ).join("\n") + "\nAssistant:";

    const model = genAI.getGenerativeModel({ model: "gemini-2.0" });
    const result=await model.generateContent(prompt)
    const text = result.response.text();

    res.json({ reply: { role: "assistant", content: text } });
  } catch (error) {
    console.error("Error in /api/chat:", error);
    res.status(500).json({ error: "Error generating response from Gemini." });
  }
});

export default router;
