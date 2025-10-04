import { useEffect, useRef, useState } from "react";
import { getTime } from "../utils/utils";
import { ChatBot } from "../Sorting/Explanations/explanation.js";

const QueryContainer = ({ clicked, iniArray }) => {
  const chatContainerRef = useRef(null);
  const [chatWithAI, setChatWithAI] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loadingChatWithAI, setLoadingChatWithAI] = useState(false);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleAskAI = async (e) => {
    e.preventDefault();
    if (!chatWithAI.trim()) return;
    setChatWithAI("");
    const userInput = {
      role: "user",
      content: chatWithAI,
      timestamp: new Date().toISOString(),
    };
    console.log(userInput);

    setChatHistory((prev) => [...prev, userInput]);
    setLoadingChatWithAI(true);
    try {
      const resp = await ChatBot({
        clicked,
        iniArray,
        chatHistory,
        chatWithAI,
        setChatHistory,
      });
      console.log("response is", resp);

      if (resp) {
        console.log("in if statement");
        console.log("curr resp is", resp);
        setChatHistory((prev) => [...prev, resp]);
      }
    } catch (err) {
      console.error("Error calling ChatBot:", err);
    } finally {
      setLoadingChatWithAI(false);
    }
  };
  return (
    <div className="w-1/3 max-h-screen bg-gray-800 rounded-xl shadow-lg border border-gray-600 flex flex-col">
      <div className="flex-none p-4 border-b border-gray-600">
        <h2 className="text-xl font-bold text-accent">
          Ask About <span className="text-white">{clicked}</span>
        </h2>
      </div>

      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-2"
      >
        {chatHistory.map(
          (chat, ind) =>
            chat && (
              <div key={ind} id={ind} className="rounded">
                {chat.role === "assistant" ? (
                  <div className="chat chat-start">
                    <div className="chat-image avatar">
                      <div className="w-10 rounded-full">
                        <img
                          alt="Assistant"
                          src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
                        />
                      </div>
                    </div>
                    <div className="chat-header">
                      Assistant
                      <time className="text-xs opacity-50 ml-2">
                        {getTime(chat.timestamp)}
                      </time>
                    </div>
                    <div className="chat-bubble chat-bubble-primary">
                      {chat.content}
                    </div>
                  </div>
                ) : (
                  <div className="chat chat-end">
                    <div className="chat-image avatar">
                      <div className="w-10 rounded-full">
                        <img
                          alt="User"
                          src="https://img.daisyui.com/images/profile/demo/anakeen@192.webp"
                        />
                      </div>
                    </div>
                    <div className="chat-header">
                      User
                      <time className="text-xs opacity-50 ml-2">
                        {getTime(chat.timestamp)}
                      </time>
                    </div>
                    <div className="chat-bubble chat-bubble-secondary">
                      {chat.content}
                    </div>
                  </div>
                )}
              </div>
            )
        )}
        {loadingChatWithAI && (
          <span className="loading loading-dots loading-md"></span>
        )}
      </div>

      <form
        className="flex-none flex justify-end items-center p-4 border-t border-gray-600"
        onSubmit={handleAskAI}
      >
        <input
          type="text"
          value={chatWithAI}
          onChange={(e) => setChatWithAI(e.target.value)}
          placeholder="Ask about this algorithm..."
          className="flex-1 bg-gray-900 border border-gray-600 text-white px-3 py-2 rounded-md focus:outline-none focus:border-accent transition-colors duration-300 mr-3"
        />
        <button
          type="submit"
          className="bg-accent hover:bg-primary text-white font-medium px-5 py-2 rounded-md shadow-md transition-all duration-300"
        >
          Ask !
        </button>
      </form>
    </div>
  );
};

export default QueryContainer;
