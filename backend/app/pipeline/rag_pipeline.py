import dspy
from app.agents.clarifier import Clarifier
from app.agents.gatekeeper import Gatekeeper
from app.agents.query_optimizer import QueryOptimizer
from app.agents.response_generator import ResponseGenerator


class RAGPipeline(dspy.Module):
    def __init__(self):
        super().__init__()
        self.gatekeeper = Gatekeeper()
        self.clarifier = Clarifier()
        self.query_optimizer = QueryOptimizer()
        self.response_generator = ResponseGenerator()

    def forward(self):
        pass
