const API_BASE_URL = "http://localhost:8000/api";

export interface BackendMessage {
  content: string;
  role: string;
}

export const generateUserId = (): string => {
  return Math.random().toString(36).substring(2, 15);
};

export const sendMessage = async (
  message: string,
  userId: string,
  conversationId?: string
): Promise<BackendMessage> => {
  const response = await fetch(`${API_BASE_URL}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: message,
      user_id: userId,
      conversation_id: conversationId,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Failed to get response from AI");
  }

  const data = await response.json();
  return data;
};

/**
 * Clears the chat history for a given user.
 * @param userId The ID of the user whose history should be cleared.
 */
export const clearChatHistory = async (userId: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/chat/clear/${userId}`, {
    method: "POST",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Failed to clear chat history");
  }
};
