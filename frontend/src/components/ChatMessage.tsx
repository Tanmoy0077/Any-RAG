import React from "react";
import { FiUser, FiCpu } from "react-icons/fi";

interface ChatMessageProps {
  message: {
    id: string;
    content: string;
    isUser: boolean;
  };
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const { isUser, content } = message;

  return (
    <div className={`flex items-start gap-4 ${isUser ? "justify-end" : ""}`}>
      {!isUser && (
        <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
          <FiCpu className="text-white" />
        </div>
      )}
      <div
        className={`max-w-[80%] rounded-lg px-4 py-3 shadow-md ${
          isUser
            ? "bg-gradient-to-br from-red-500 to-red-700 text-white rounded-br-none"
            : "bg-gray-800 text-white rounded-bl-none"
        }`}
      >
        <p className="whitespace-pre-wrap">{content}</p>
      </div>
      {isUser && (
        <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
          <FiUser className="text-white" />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
