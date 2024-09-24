from repository.message_repository import MessageRepository
from services.ollama.ollama import OllamaService
from api.serializers.message import MessageSerializer
from api.models.conversation.conversation import Conversation


class MessageService:
    def __init__(self):
        self.message_repository = MessageRepository()
        self.ollama_service = OllamaService()

    def get_message(self, message_id):
        return self.message_repository.get_message_by_id(message_id)

    def list_messages(self):
        return self.message_repository.get_all_messages()

    def get_conversation_messages(self, conversation_id):
        return self.message_repository.get_messages_by_conversation(conversation_id)

    def create_message(self, conversation, role, content, model=None, user=None):
        return self.message_repository.create_message(
            conversation, role, content, model, user
        )

    def update_message(self, message, **kwargs):
        return self.message_repository.update_message(message, **kwargs)

    def delete_message(self, message_id):
        self.message_repository.delete_message(message_id)

    def handle_user_message(self, serializer_data):
        serializer = MessageSerializer(data=serializer_data)

        if serializer.is_valid():
            messages = serializer.validated_data.get("content")
            conversation = serializer.validated_data.get("conversation")
            user_id = serializer.validated_data.get("user")
            model_id = serializer.validated_data.get("model")

            if not model_id:
                return serializer.errors

            self.message_repository.create_message(
                conversation=conversation,
                role="user",
                content=messages,
                model=model_id,
                user=user_id
            )
            
            all_messages = conversation.messages.all().order_by('created_at')
            
            flattened_messages = [
                {"role": message.role, "content": message.content}
                for message in all_messages
            ]

            print(flattened_messages)

            response = self.ollama_service.chat(model=model_id.name, messages=flattened_messages)

            if response["done"]:
                bot_response_content = response["message"]["content"]
                self.message_repository.create_message(
                    conversation=conversation,
                    role="assistant",
                    content=bot_response_content,
                    model=model_id,
                    user=user_id
                )
                return response
            else:
                return response

        return {"errors": serializer.errors}