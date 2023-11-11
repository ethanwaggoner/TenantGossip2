from rest_framework import viewsets
from api.models.comment import Comment
from api.serializers.comment import CommentSerializer


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
