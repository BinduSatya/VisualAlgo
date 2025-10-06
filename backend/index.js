import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

const app = express();
dotenv.config();

const allowedOrigins = ["http://localhost:5173", process.env.FRONTEND_URL];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
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

app.post("/chat-with-ai", async (req, res) => {
  try {
    const { algorithm, input, chatHistory, question } = req.body;
    console.log(algorithm, input, chatHistory, question);

    const prompt = `You are a senior most developer that answers questions to a junior developer based on the simulation of the algorithm "${algorithm}" with input ${JSON.stringify(
      input
    )} and the previous chat history: ${chatHistory}. 
Now respond to the following question: ${question}.

Rules:
- Answer in 1 to 3 points clearly, simple bullet points. Maximum 5 lines total.
- Only answer if the question is related to the sorting/graph or any other algorithms or it is any thing related to coding, else reply: "Sorry, I'm not trained for this input."
- Use only plain English and some software development terms that a coder can Understand (no code, no formatting, no special characters). Keep it very concise and easy to read.`;

    const userInput = {
      role: "user",
      content: prompt,
      timestamp: new Date().toISOString(),
    };
    chatHistory.push(userInput);

    const formattedHistory = chatHistory.map((msg) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

    const chat = ai.chats.create({
      model: "gemini-2.5-flash",
      history: formattedHistory,
    });

    const response = await chat.sendMessage({ message: prompt });

    const aiOutput = {
      role: "assistant",
      content: response.text,
      timestamp: new Date().toISOString(),
    };
    chatHistory.push(aiOutput);

    res.status(200).json({
      currentResponse: aiOutput,
      fullHistory: chatHistory,
    });
  } catch (e) {
    console.error("Error occurred:", e);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/get-code-from-ai", async (req, res) => {
  try {
    const { algorithmName, language, code } = req.body;
    console.log(algorithmName, language, code);

    const prompt = `Think of you as a senior most developer that can give code to the any algorithm that the user asks. Now assume that I want to get the code for "${algorithmName}" in ${language} language, by taking the following code as a reference ${code}.

Rules:
- Just give the code in preferred language ${language}, nothing more, nothing less.
- Write comments for each functionality why it is happening like that`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    res.json({ code: response.text });
  } catch (e) {
    console.error("Error occurred:", e);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/clear-history", (req, res) => {
  chatHistory = [];
  res.status(200).json({ message: "Conversation history cleared." });
});

app.listen(8000, () => {
  console.log("app is listening in 8000");
});
