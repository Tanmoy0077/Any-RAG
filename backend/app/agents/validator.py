import dspy
from app.util.config import settings
from typing import List


class DocumentValidatorSignature(dspy.Signature):
    """
    Validate if a document contains relevant and useful information for answering the query.
    """

    query: str = dspy.InputField(desc="User's query")
    document: str = dspy.InputField(desc="Single document snippet to validate")
    is_relevant: bool = dspy.OutputField(
        desc="Boolean indicating if the document contains relevant information (True/False)"
    )


class Validator(dspy.Module):
    def __init__(self):
        super().__init__()
        dspy.configure(
            lm=dspy.LM(
                model="openai/openai/gpt-oss-20b",
                api_key=settings.GROQ_API_KEY,
                api_base=settings.GROQ_API_BASE,
            )
        )
        self.validator = dspy.Predict(DocumentValidatorSignature)

    def validate_document(self, query: str, document: str):
        """
        Validate a single document for relevance to the query.

        Args:
            query (str): The user's query
            document (str): Document content to validate

        Returns:
            boolean: is_relevant
        """
        result = self.validator(query=query, document=document)
        return result.is_relevant

    def forward(self, query: str, documents: List[str]):
        """
        Validate multiple documents and return only the relevant ones.

        Args:
            query (str): The user's query
            documents (list): List of document snippets to validate

        Returns:
            dict: Contains validated documents
                - relevant_documents: List of documents that passed validation
        """
        validated_docs = []

        # Validate each document individually
        for doc in documents:
            is_relevant = self.validate_document(query, doc)
            if is_relevant:
                validated_docs.append(doc)

        return validated_docs
