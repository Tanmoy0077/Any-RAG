import React from "react";
import { FiCpu } from "react-icons/fi";

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-start gap-4">
      <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
        <FiCpu className="text-white" />
      </div>
      <div className="max-w-[80%] rounded-lg px-4 py-3 shadow-md bg-gray-800 text-white rounded-bl-none">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse-fast"></div>
          <div
            className="w-2 h-2 bg-gray-500 rounded-full animate-pulse-fast"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="w-2 h-2 bg-gray-500 rounded-full animate-pulse-fast"
            style={{ animationDelay: "0.4s" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
