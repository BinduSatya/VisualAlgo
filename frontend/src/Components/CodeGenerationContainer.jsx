import { useState, useEffect, useRef } from "react";
import { fetchCodeForLanguage } from "../Sorting/Explanations/explanation.js";

// Utility to clean AI code output (strip markdown fences)
const cleanCode = (codeString) => {
  if (!codeString) return "";
  return codeString
    .replace(/```[a-zA-Z]*/g, "") // remove ```python, ```java, etc.
    .replace(/```/g, "") // remove closing ```
    .trim();
};

const CodeGenerationContainer = ({ clicked }) => {
  const [selectedLanguage, setSelectedLanguage] = useState("Python");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const codeContainerRef = useRef(null);

  useEffect(() => {
    if (codeContainerRef.current) {
      codeContainerRef.current.scrollTop =
        codeContainerRef.current.scrollHeight;
    }
  }, [code]);

  const handleGenerateCode = async () => {
    if (!clicked) return;
    setLoading(true);
    try {
      const result = await fetchCodeForLanguage(clicked, selectedLanguage);
      const formatted = Array.isArray(result) ? result.join("\n") : result;
      setCode(cleanCode(formatted));
    } catch (error) {
      console.error("Error fetching code:", error);
      setCode("// Error fetching code. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-1/3 max-h-screen bg-gray-800 rounded-xl shadow-lg border border-gray-600 flex flex-col">
      <div className="flex-none p-4 border-b border-gray-600">
        <h2 className="text-xl font-bold text-accent">
          {`Show me ${clicked || "Algorithm"} in X Language`}
        </h2>
      </div>

      <div
        ref={codeContainerRef}
        className="flex-1 overflow-y-auto p-4 font-mono text-sm text-white bg-gray-900"
      >
        {code ? (
          <pre className="whitespace-pre-wrap break-words">
            <code>{code}</code>
          </pre>
        ) : (
          <p className="text-gray-400">
            Select a language and click{" "}
            <span className="text-accent font-semibold">"Generate Code"</span>{" "}
            to see the algorithm.
          </p>
        )}
      </div>

      {/* Controls */}
      <div className="flex-none flex justify-between items-center p-4 border-t border-gray-600">
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="bg-gray-900 border border-gray-600 text-white px-3 py-2 rounded-md focus:outline-none focus:border-accent transition-colors duration-300 mr-3"
        >
          <option value="Python">Python</option>
          <option value="C++">C++</option>
          <option value="Java">Java</option>
          <option value="JavaScript">JavaScript</option>
        </select>

        <button
          onClick={handleGenerateCode}
          disabled={!clicked || loading}
          className={`px-5 py-2 rounded-md shadow-md transition-all duration-300 ${
            loading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-accent hover:bg-primary text-white font-medium"
          }`}
        >
          {loading ? "Loading..." : "Generate Code"}
        </button>
      </div>
    </div>
  );
};

export default CodeGenerationContainer;
