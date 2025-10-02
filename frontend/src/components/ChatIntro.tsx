import React from "react";
import { Logo } from "./Logo";
import FeatureCard from "./FeatureCard";
import { FiZap } from "react-icons/fi";

interface ChatIntroProps {
  onSendMessage: (message: string) => void;
}

const ChatIntro: React.FC<ChatIntroProps> = ({ onSendMessage }) => {
  const examplePrompts = [
    "Explain me the topic X in simple terms?",
    "Tell me about the research advancements in Y?",
    "Fetch latest articles about this topic?",
    "Summarize the document for me.",
  ];

  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center">
      <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center mb-6">
        <Logo />
      </div>
      <h1 className="text-4xl font-bold text-white mb-2">Welcome to Any RAG</h1>
      <p className="text-gray-400 mb-8">
        Ask me anything about your documents, or start with an example below.
      </p>
      <div className="flex flex-wrap justify-center gap-4 w-full max-w-4xl">
        {examplePrompts.map((prompt, index) => (
          <FeatureCard
            key={index}
            icon={<FiZap />}
            description={prompt}
            onClick={() => onSendMessage(prompt)}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatIntro;
