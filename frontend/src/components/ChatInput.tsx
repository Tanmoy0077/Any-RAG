import React, { useState } from "react";
import { FiSend } from "react-icons/fi";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  disabled = false,
}) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 rounded-xl border border-gray-700 p-2 flex items-center"
    >
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask a question about your documents..."
        disabled={disabled}
        className="flex-1 bg-transparent text-white placeholder-gray-400 px-4 py-3 focus:outline-none"
      />
      <button
        type="submit"
        disabled={disabled || !message.trim()}
        className={`w-12 h-12 bg-gradient-to-br from-red-500 to-red-700 text-white rounded-full flex items-center justify-center transition-transform transform hover:scale-110
          ${
            disabled || !message.trim()
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
      >
        <FiSend className="text-xl" />
      </button>
    </form>
  );
};

export default ChatInput;
