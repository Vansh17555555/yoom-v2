"use client";

import { useState } from "react";
import axios from "axios";
import { useTranscription } from "@/context/TranscriptionContext";

const ChatComponent = () => {
  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string | null>(null);
  const [chatHistory, setChatHistory] = useState<Array<{ type: "question" | "answer"; text: string }>>([]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const { transcriptionText } = useTranscription();

  const handleAskQuestion = async () => {
    if (!question.trim() || isProcessing) return;

    setIsProcessing(true);

    setChatHistory((prev) => [...prev, { type: "question", text: question }]);
    setQuestion(""); 
    console.log(transcriptionText)
    setTimeout(async () => {
      try {
        const response = await axios.post("https://fastapi-backend-production-641e.up.railway.app/chat", { 
          question });
        console.log(response)
        const reply =await response.data.reply;

        setChatHistory((prev) => [...prev, { type: "answer", text: reply }]);
        setAnswer(reply);
      } catch (error) {
        console.error("Error asking question:", error);
        const errorMessage = "Failed to get an answer. Please try again.";
        setAnswer(errorMessage);
        setChatHistory((prev) => [...prev, { type: "answer", text: errorMessage }]);
      } finally {
        setIsProcessing(false);
      }
    }, 2000);
  };

  return (
    <div className="absolute bottom-24 left-0 right-0 mx-auto w-3/4 max-w-lg p-4 bg-white bg-opacity-90 rounded-lg shadow-lg flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 bg-gray-100 rounded-lg mb-4 space-y-2 max-h-60">
        {chatHistory.map((chat, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg ${chat.type === "question" ? "bg-blue-500 text-white self-end" : "bg-gray-300 text-black self-start"}`}
          >
            {chat.text}
          </div>
        ))}
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a question about the transcription..."
          className="flex-1 p-2 border border-gray-300 rounded"
          disabled={isProcessing}
        />
        <button
          onClick={handleAskQuestion}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
          disabled={isProcessing}
        >
          {isProcessing ? "Processing..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default ChatComponent;