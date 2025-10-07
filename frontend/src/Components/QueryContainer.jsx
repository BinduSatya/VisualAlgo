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
        className={`flex-1 overflow-y-auto p-4 space-y-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-700 `}
      >
        {chatHistory.length === 0 ? (
          <div className="flex justify-center flex-col items-center select-none h-full">
            <img src="chat-room.png" className="" />
            <p className="text-white opacity-30 ">
              Chat with AI about this algorithm!
            </p>
          </div>
        ) : null}
        {chatHistory.map(
          (chat, ind) =>
            chat && (
              <div key={ind} id={ind} className="rounded">
                {chat.role === "assistant" ? (
                  <div className="chat chat-start">
                    <div className="chat-image avatar">
                      <div className="w-10 rounded-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-7 h-7 text-accent"
                          fill="currentColor"
                          viewBox="0 0 30 30"
                        >
                          <path d="M14.217,19.707l-1.112,2.547c-0.427,0.979-1.782,0.979-2.21,0l-1.112-2.547c-0.99-2.267-2.771-4.071-4.993-5.057	L1.73,13.292c-0.973-0.432-0.973-1.848,0-2.28l2.965-1.316C6.974,8.684,8.787,6.813,9.76,4.47l1.126-2.714	c0.418-1.007,1.81-1.007,2.228,0L14.24,4.47c0.973,2.344,2.786,4.215,5.065,5.226l2.965,1.316c0.973,0.432,0.973,1.848,0,2.28	l-3.061,1.359C16.988,15.637,15.206,17.441,14.217,19.707z"></path>
                          <path d="M24.481,27.796l-0.339,0.777c-0.248,0.569-1.036,0.569-1.284,0l-0.339-0.777c-0.604-1.385-1.693-2.488-3.051-3.092	l-1.044-0.464c-0.565-0.251-0.565-1.072,0-1.323l0.986-0.438c1.393-0.619,2.501-1.763,3.095-3.195l0.348-0.84	c0.243-0.585,1.052-0.585,1.294,0l0.348,0.84c0.594,1.432,1.702,2.576,3.095,3.195l0.986,0.438c0.565,0.251,0.565,1.072,0,1.323	l-1.044,0.464C26.174,25.308,25.085,26.411,24.481,27.796z"></path>
                        </svg>
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
                        <img alt="User" src="user.png" />
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
          <div className="chat chat-start justify-center ">
            <span className="loading loading-dots loading-md"></span>
          </div>
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
