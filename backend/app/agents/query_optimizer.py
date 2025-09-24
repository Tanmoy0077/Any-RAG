import dspy
from app.util.config import settings


class QueryOptimizerSignature(dspy.Signature):
    """
    Enrich and optimize user queries by incorporating context from conversation history
    to improve vector store document retrieval.
    """

    query = dspy.InputField(desc="User's original query")
    conversation_history = dspy.InputField(
        desc="List of previous exchanges between user and system", default=[]
    )
    optimized_query = dspy.OutputField(
        desc="Enhanced search query that includes relevant context from conversation history"
    )


class QueryOptimizer(dspy.Module):
    def __init__(self):
        super().__init__()
        dspy.configure(
            lm=dspy.LM(
                model="openai/openai/gpt-oss-20b",
                api_key=settings.GROQ_API_KEY,
                api_base=settings.GROQ_API_BASE,
            )
        )
        self.prog = dspy.ChainOfThought(QueryOptimizerSignature)

    def forward(self, query, conversation_history=None):
        """
        Optimize the query by incorporating relevant context from conversation history
        for better vector store search results.

        Args:
            query (str): The user's original query
            conversation_history (list, optional): Previous conversation history

        Returns:
            str: Enhanced query for vector store search with incorporated context
        """

        result = self.prog(query=query, conversation_history=conversation_history)

        return result.optimized_query
