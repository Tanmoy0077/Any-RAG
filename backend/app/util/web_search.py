from tavily import TavilyClient
from app.util.config import settings


tavily_client = TavilyClient(api_key=settings.TAVILY_API_KEY)


def search_web(query: str):
    """
    Search the web for relevant information.

    """
    response = tavily_client.search(query)
    formatted_response = []
    for result in response["results"]:
        formatted_response.append(
            f"Title: {result['title']}\nContent: {result['content']}"
        )

    return formatted_response
