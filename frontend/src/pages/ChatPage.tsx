import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import ChatMessage from "../components/ChatMessage";
import ChatInput from "../components/ChatInput";
import Button from "../components/Button";
import {
  sendMessage,
  generateUserId,
  clearChatHistory,
} from "../utils/chatService";
import type { BackendMessage } from "../utils/chatService";
import { FiPlusCircle } from "react-icons/fi";
import { Logo } from "../components/Logo";
import ChatIntro from "../components/ChatIntro";
import TypingIndicator from "../components/TypingIndicator";

export interface Message {
  id: string;
  content: string;
  isUser: boolean;
}

const ChatPage: React.FC = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<string>(() => generateUserId());
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Check if documents are loaded
  useEffect(() => {
    const hasDocuments = localStorage.getItem("documentsLoaded");
    if (hasDocuments !== "true") {
      navigate("/upload");
    }
  }, [navigate]);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      isUser: true,
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsLoading(true);

    try {
      // Get AI response
      const response: BackendMessage = await sendMessage(content, userId);

      // Add AI message
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.content,
        isUser: response.role !== "assistant",
      };

      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    } catch (error) {
      console.error("Error getting AI response:", error);

      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "Sorry, I encountered an error while processing your request. Please try again.",
        isUser: false,
      };

      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewChat = async () => {
    if (
      messages.length > 0 &&
      !window.confirm(
        "Start a new chat? This will clear the current conversation."
      )
    ) {
      return;
    }

    try {
      await clearChatHistory(userId);
    } catch (error) {
      console.error("Failed to clear chat history on the server:", error);
    }

    setMessages([]);
    setUserId(generateUserId());
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/50 backdrop-blur-lg border-b border-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Link to="/">
              <Logo />
            </Link>
            <Link to="/">
              <span
                className="text-xl font-bold"
                style={{ fontFamily: '"Orbitron", sans-serif' }}
              >
                Any RAG
              </span>
            </Link>
          </div>
          <Button
            variant="secondary"
            onClick={handleNewChat}
            className="flex items-center gap-2"
          >
            <FiPlusCircle /> New Chat
          </Button>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-4 pt-24">
        <div className="w-full max-w-3xl flex-1 flex flex-col">
          {messages.length === 0 ? (
            <ChatIntro onSendMessage={handleSendMessage} />
          ) : (
            <div className="flex-1 overflow-y-auto space-y-6 p-4">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              {isLoading && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>
          )}

          <div className="py-4">
            <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChatPage;
