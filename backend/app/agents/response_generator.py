import dspy
from app.util.config import settings


class ResponseGeneratorSignature(dspy.Signature):
    """
    Generate a comprehensive response to user queries using relevant document snippets.
    The response should be informative, coherent, and directly address the user's question.
    """

    query = dspy.InputField(desc="User's query")
    documents = dspy.InputField(
        desc="List of relevant document snippets containing MSME scheme information"
    )
    conversation_history = dspy.InputField(
        desc="List of previous exchanges between user and system", default=[]
    )
    response = dspy.OutputField(
        desc="Comprehensive response that answers the user's query using the provided documents"
    )
    source_references = dspy.OutputField(
        desc="List of specific scheme names or document sections used in the response"
    )


class ResponseGenerator(dspy.Module):
    def __init__(self):
        super().__init__()
        dspy.configure(
            lm=dspy.LM(
                model="openai/openai/gpt-oss-20b",
                api_key=settings.GROQ_API_KEY,
                api_base=settings.GROQ_API_BASE,
            )
        )
        self.prog = dspy.ChainOfThought(ResponseGeneratorSignature)
        self.conversation_history = []

    def forward(self, query, documents, conversation_history=None):
        """
        Generate a response to the user's query using the provided relevant documents.

        Args:
            query (str): The user's query
            documents (list): List of relevant document snippets
            conversation_history (list, optional): Previous conversation history

        Returns:
            dict: Contains generated response and source references
                - response: The generated response answering the user's query
                - source_references: List of scheme names or document sections used
        """
        # Use provided conversation history or maintain local history
        if conversation_history is not None:
            self.conversation_history = conversation_history

        # Generate response using the language model
        result = self.prog(
            query=query,
            documents=documents,
            conversation_history=self.conversation_history,
        )

        # Add the current exchange to conversation history
        self.conversation_history.append({"query": query, "response": result.response})

        return {
            "response": result.response,
            "source_references": result.source_references,
        }
