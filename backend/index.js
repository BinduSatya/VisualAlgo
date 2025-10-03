import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

const app = express();
dotenv.config();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

app.get("/", (req, res) => {
  res.send("Hello");
});

app.post("/ask-ai", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    res.json({ reply: response.text });
  } catch (err) {
    console.error("Error with Gemini API:", err);
    res.status(500).json({ error: "AI request failed" });
  }
});

app.post("/simulate", async (req, res) => {
  const { algorithm, input } = req.body;

  console.log(algorithm, input);

  if (!algorithm || !input) {
    return res.status(400).json({ error: "Algorithm and input are required" });
  }

  const prompt = `You are an api endpoint that should perform a dry-run simulation of the algorithm "${algorithm}" on input ${JSON.stringify(
    input
  )}, give me just points that are worth noting and observing and donot index them 1,2,3.. like that.
  Rules:
  First show the initial state of array in squared brackets and then
  1. Narrate each step like pseudocode execution, concisely.
  2. Show intermediate array states after each change.
  3. Style the steps for clear readability: indicate which element is being compared or moved.
  4. End with the final sorted/result array.
  5. Other than text, do not include any code snippets or any other format, just plain english should be sufficient
Format the response as a concise, readable list of steps, one per line.
At the last show the final state of array in squared brackets.
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    // Split into steps (line by line)
    const steps = response.text
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    res.json({ steps });
  } catch (err) {
    console.error("Simulation error:", err);
    res.status(500).json({ error: "AI simulation failed" });
  }
});

app.listen(8000, () => {
  console.log("app is listening in 8000");
});
