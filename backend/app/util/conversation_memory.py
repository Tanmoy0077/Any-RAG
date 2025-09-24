from mem0 import Memory
from typing import List, Dict


class ChatMemory:
    def __init__(self):
        self.memory = Memory()

    def get_memory(self):
        """
        Get the conversation history for the current user.
        """
        history = self.memory.get_all(user_id=self.user_id)
        return history

    def add_memory(self, messages: List[Dict[str, str]], user_id: str):
        """
        Add a new messages to the conversation history for the current user.
        """
        self.memory.add(messages, user_id=user_id)

    def clear_memory(self, user_id: str):
        """
        Clear the conversation history for the current user.
        """
        self.memory.delete_all(user_id=user_id)
