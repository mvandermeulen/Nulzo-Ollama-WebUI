from rest_framework import viewsets, mixins
from rest_framework.permissions import IsAuthenticated
from api.services.conversation_service import ConversationService
from api.serializers.conversation import ConversationSerializer
from api.utils.pagination import StandardResultsSetPagination
from api.utils.responses.response import api_response
from api.utils.exceptions import ValidationError
import logging

logger = logging.getLogger(__name__)


class ConversationViewSet(mixins.CreateModelMixin,
                          mixins.ListModelMixin,
                          mixins.RetrieveModelMixin,
                          mixins.UpdateModelMixin,
                          mixins.DestroyModelMixin,
                          viewsets.GenericViewSet):
    """
    ViewSet for handling conversation operations.
    Returns minimal data for performance, with related data loaded lazily.
    """
    permission_classes = [IsAuthenticated]
    serializer_class = ConversationSerializer
    pagination_class = StandardResultsSetPagination
    lookup_field = 'uuid'

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.conversation_service = ConversationService()
        self.logger = logging.getLogger(__name__)

    def get_queryset(self):
        """Filter conversations for the authenticated user"""
        return self.conversation_service.get_user_conversations(self.request.user.id)

    def list(self, request, *args, **kwargs):
        """Get minimal conversation list"""
        try:
            queryset = self.get_queryset()
            page = self.paginate_queryset(queryset)

            # Return minimal data for each conversation
            data = [{
                'uuid': conv.uuid,
                'name': conv.name,
                'created_at': conv.created_at,
                'is_pinned': conv.is_pinned,
                'updated_at': conv.updated_at
            } for conv in page]
            return api_response(
                data=self.get_paginated_response(data).data,
                links={
                    "self": request.build_absolute_uri()
                }
            )

        except Exception as e:
            logger.error(f"Error fetching conversations: {str(e)}")
            return api_response(
                error={
                    "code": "CONVERSATION_FETCH_ERROR",
                    "message": "Failed to fetch conversations",
                    "details": str(e)
                },
                status=500
            )

    def update(self, request, *args, **kwargs):
        try:
            agent = self.conversation_service.update_conversation(uuid=kwargs['uuid'], user_id=request.user,
                                                                  data=request.data)
            serializer = self.get_serializer(agent)
            return api_response(
                data=serializer.data,
                links={
                    "self": request.build_absolute_uri()
                }
            )
        except ValidationError as e:
            self.logger.warning(f"Validation error: {str(e)}")
            return api_response(
                error={
                    "code": "VALIDATION_ERROR",
                    "message": str(e)
                },
                status=400
            )
        except Exception as e:
            self.logger.error(f"Error updating agent: {str(e)}")
            return api_response(
                error={
                    "code": "AGENT_UPDATE_ERROR",
                    "message": "Failed to update agent",
                    "details": str(e)
                },
                status=500
            )

    def retrieve(self, request, *args, **kwargs):
        """Get single conversation details"""
        try:
            conversation = self.conversation_service.get_conversation(
                kwargs['uuid'],
                request.user.id
            )

            # Return minimal conversation data
            data = {
                'uuid': conversation.uuid,
                'name': conversation.name,
                'created_at': conversation.created_at,
                'is_pinned': conversation.is_pinned,
                'updated_at': conversation.updated_at
            }
            return api_response(
                data=data,
                links={
                    "self": request.build_absolute_uri(),
                    "messages": f"/api/messages/?conversation={conversation.uuid}"
                }
            )

        except ValidationError as e:
            return api_response(
                error={
                    "code": "VALIDATION_ERROR",
                    "message": str(e)
                },
                status=400
            )
        except Exception as e:
            logger.error(f"Error retrieving conversation: {str(e)}")
            return api_response(
                error={
                    "code": "CONVERSATION_FETCH_ERROR",
                    "message": "Failed to fetch conversation",
                    "details": str(e)
                },
                status=500
            )

    def create(self, request, *args, **kwargs):
        """Create new conversation"""
        try:
            conversation = self.conversation_service.create_conversation(
                request.user,
                request.data
            )
            return api_response(
                data={
                    'uuid': conversation.uuid,
                    'name': conversation.name,
                    'created_at': conversation.created_at
                },
                status=201,
                links={
                    "self": request.build_absolute_uri(f'{conversation.uuid}/'),
                    "messages": f"/api/messages/?conversation={conversation.uuid}"
                }
            )
        except ValidationError as e:
            return api_response(
                error={
                    "code": "VALIDATION_ERROR",
                    "message": str(e)
                },
                status=400
            )
        except Exception as e:
            logger.error(f"Error creating conversation: {str(e)}")
            return api_response(
                error={
                    "code": "CONVERSATION_CREATE_ERROR",
                    "message": "Failed to create conversation",
                    "details": str(e)
                },
                status=500
            )

    def destroy(self, request, *args, **kwargs):
        try:
            self.conversation_service.delete_conversation(user_id=request.user, uuid=kwargs['uuid'])
            return api_response(status=204)
        except Exception as e:
            self.logger.error(f"Error deleting agent: {str(e)}")
            return api_response(
                error={
                    "code": "AGENT_DELETE_ERROR",
                    "message": "Failed to delete agent",
                    "details": str(e)
                },
                status=500
            )
