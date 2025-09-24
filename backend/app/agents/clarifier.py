import dspy
from app.util.config import settings
from typing import List, Dict, Literal


class ClarifierSignature(dspy.Signature):
    """
    Handle vague queries and conversational messages by either asking clarifying questions
    or providing appropriate conversational responses, taking into account the conversation history.
    """

    query: str = dspy.InputField(desc="User's query")
    category: Literal["NEEDS_CLARIFICATION", "CONVERSATION"] = dspy.InputField(
        desc="Category from Gatekeeper: 'NEEDS_CLARIFICATION' or 'CONVERSATION'"
    )
    conversation_history: List[Dict[str, str]] = dspy.InputField(
        desc="List of previous exchanges between user and system", default=[]
    )
    response: str = dspy.OutputField(
        desc="The response to the user - either a clarifying question or conversational reply"
    )
    context: str = dspy.OutputField(
        desc="Additional context about what kind of information we're seeking (for clarifications) or the conversation state"
    )


class Clarifier(dspy.Module):
    def __init__(self):
        super().__init__()
        dspy.configure(
            lm=dspy.LM(
                model="openai/openai/gpt-oss-20b",
                api_key=settings.GROQ_API_KEY,
                api_base=settings.GROQ_API_BASE,
            )
        )
        self.prog = dspy.ChainOfThought(ClarifierSignature)

    def forward(self, query, category, conversation_history=None):
        """
        Process queries that need clarification or are conversational.

        Args:
            query (str): The user's input query
            category (str): The category determined by the Gatekeeper
            conversation_history (list, optional): Previous conversation history from Gatekeeper

        Returns:
            dict: Contains response, context, and updated conversation history
                - response: The clarifying question or conversational reply
                - context: Additional context about what we're trying to clarify
                          or the current conversation state
                - conversation_history: Updated history of the conversation
        """

        result = self.prog(
            query=query,
            category=category,
            conversation_history=conversation_history,
        )

        return {
            "response": result.response,
            "context": result.context,
        }
