import  { useEffect, useRef } from "react";
import { getTime } from "../utils/utils";

const QueryContainer = ({
  clicked,
  handleAskAI,
  chatWithAI,
  setChatWithAI,
  chatHistory,
}) => {
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <div className="w-1/3 max-h-screen bg-gray-800 rounded-xl shadow-lg border border-gray-600 flex flex-col">
    
      <div className="flex-none p-4 border-b border-gray-600">
        <h2 className="text-xl font-bold text-accent">
          {`Query About ${clicked || "Algorithm"}`}
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
