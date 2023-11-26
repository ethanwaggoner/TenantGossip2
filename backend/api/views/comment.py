import logging
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from api.models.comment import Comment
from api.serializers.comment import CommentSerializer

logger = logging.getLogger(__name__)


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            try:
                serializer.save(author=request.user)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            except Exception as e:
                logger.error(f"Error in creating a comment: {e}", exc_info=True)
                return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            logger.warning(f"Validation errors in creating a comment: {serializer.errors}")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
