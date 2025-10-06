import axios from "axios";
import { algorithms } from "../Algos/algorithms";

export const Simulator = async (algorithm, input) => {
  try {
    const BASE_URL =
      import.meta.env.VITE_BACKEND_ROUTE || "http://localhost:8000";
    const res = await axios.post(`${BASE_URL}/simulate`, {
      algorithm: algorithm,
      input: input,
    });
    return res.data.steps;
  } catch (err) {
    console.error(err.response?.data || err.message);
  }
};

export const ChatBot = async ({
  clicked,
  iniArray,
  chatHistory,
  chatWithAI,
}) => {
  try {
    console.log(
      "Loading in ChatBot",
      "clicked",
      clicked,
      "iniArray",
      iniArray,
      "chatHistory",
      chatHistory,
      "chatWithAI",
      chatWithAI
    );
    const BASE_URL =
      import.meta.env.VITE_BACKEND_ROUTE || "http://localhost:8000";

    const res = await axios.post(`${BASE_URL}/chat-with-ai`, {
      algorithm: clicked,
      input: iniArray,
      chatHistory: chatHistory,
      question: chatWithAI,
    });
    console.log("response is", res);
    const { currentResponse, fullHistory } = res.data;

    console.log("Latest AI Response:", currentResponse.content);
    console.log("Full History:", fullHistory);
    return res.data.currentResponse;
  } catch (err) {
    console.log("error occured at axios", err);
  }
};

export const fetchCodeForLanguage = async (clicked, selectedLanguage) => {
  try {
    const BASE_URL =
      import.meta.env.VITE_BACKEND_ROUTE || "http://localhost:8000";
    console.log(selectedLanguage);
    const algoObj = algorithms.find((algo) => algo.name === clicked);
    if (!algoObj) throw new Error("Algorithm not found");

    let codeJs = algoObj.func.toString();

    const response = await axios.post(`${BASE_URL}/get-code-from-ai`, {
      algorithmName: clicked,
      language: selectedLanguage,
      code: codeJs,
    });

    return response.data.code;
  } catch (e) {
    console.error("Error occurred while fetching code:", e);
    return "// Error fetching code. Please try again.";
  }
};
