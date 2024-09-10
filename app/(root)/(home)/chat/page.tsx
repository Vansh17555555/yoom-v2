"use client";

import { useState } from "react";
import axios from "axios";

const ChatComponent = () => {
  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string | null>(null);

  const handleAskQuestion = async () => {
    try {
      const response = await axios.post('https://yoom-v2.onrender.com/chat', { question });
      setAnswer(response.data.reply);
    } catch (error) {
      console.error("Error asking question:", error);
      setAnswer("Failed to get an answer. Please try again.");
    }
  };

  return (
    <div className="absolute bottom-24 left-0 right-0 mx-auto w-3/4 p-4 bg-black bg-opacity-50 text-white rounded-lg">
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask a question about the transcription"
        className="w-full p-2 text-black rounded"
      />
      <button onClick={handleAskQuestion} className="mt-2 bg-blue-500 text-white p-2 rounded">
        Ask
      </button>
      {answer && (
        <div className="mt-4">
          <h4 className="font-bold">Answer:</h4>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

export default ChatComponent;
