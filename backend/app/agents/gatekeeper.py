import dspy
from app.util.config import settings
from typing import List, Dict, Literal


class GatekeeperSignature(dspy.Signature):
    """
    Analyze user queries to determine if they are MSME scheme-related, vague, or general conversation,
    taking into account the conversation history.
    """

    query: str = dspy.InputField(desc="User's query")
    conversation_history: List[Dict[str, str]] = dspy.InputField(
        desc="List of previous exchanges between user and system", default=[]
    )
    category: Literal["MSME_SPECIFIC", "NEEDS_CLARIFICATION", "CONVERSATION"] = (
        dspy.OutputField(
            desc="One of: 'MSME_SPECIFIC' (clear question about MSME schemes), 'NEEDS_CLARIFICATION' (vague or unclear query), or 'CONVERSATION' (general chat or unrelated topic)"
        )
    )
    reason: str = dspy.OutputField(
        desc="Detailed explanation for why the query was classified in this category"
    )


class Gatekeeper(dspy.Module):
    def __init__(self):
        super().__init__()
        dspy.configure(
            lm=dspy.LM(
                model="openai/openai/gpt-oss-20b",
                api_key=settings.GROQ_API_KEY,
                api_base=settings.GROQ_API_BASE,
            )
        )
        self.prog = dspy.ChainOfThought(GatekeeperSignature)

    def forward(self, query: str, conversation_history: List[Dict[str, str]] = []):
        """
        Process the user query and determine its category along with reasoning.

        Args:
            query (str): The user's input query
            conversation_history (list[dict[str, str]], optional): Previous conversation history from Clarifier


        Returns:
            dict: Contains category, reason, and updated conversation history
        """
        result = self.prog(query=query, conversation_history=conversation_history)

        self.conversation_history.append(
            {"user": query, "category": result.category, "reason": result.reason}
        )

        return {
            "category": result.category,
            "reason": result.reason,
        }
