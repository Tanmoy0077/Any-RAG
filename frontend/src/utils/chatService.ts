/**
 * Sends a user message to the AI and returns the AI's response
 */
export const sendMessageToAI = async (message: string): Promise<string> => {
  // In a real application, this would make an API call to your backend
  // which would use a RAG system to generate a response
  // Here we simulate the response with a delay

  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Simulate different responses based on the question
  if (
    message.toLowerCase().includes("hello") ||
    message.toLowerCase().includes("hi")
  ) {
    return "Hello! I'm your document assistant. How can I help you with your uploaded documents?";
  }

  if (message.toLowerCase().includes("what can you do")) {
    return "I can answer questions about the documents you've uploaded. I can extract information, summarize content, and help you find specific details within your PDFs and CSVs.";
  }

  if (message.toLowerCase().includes("how many")) {
    return "Based on the documents you've uploaded, I found several instances of the data you're asking about. The specific count is 42 occurrences across your documents.";
  }

  // Default response that references the "documents"
  return "According to the documents you've uploaded, I can provide the following information: The data shows a trend of increasing values over the past quarter, with key metrics improving by approximately 15%. The main factors contributing to this growth appear to be the new initiatives launched in March and the optimization of existing processes.";
};
