import logging
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination

from api.models.likes import PostLike
from api.models.post import Post
from api.serializers.post import PostSerializer

logger = logging.getLogger(__name__)


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 6
    page_size_query_param = 'page_size'
    max_page_size = 100


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    pagination_class = StandardResultsSetPagination
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        try:
            category_id = self.request.query_params.get('category_id', None)
            if int(category_id):
                self.queryset = self.queryset.filter(category__id=category_id)
            return self.queryset
        except Exception as e:
            logger.error(f"Error in get_queryset of PostViewSet: {e}", exc_info=True)
            return []

    def create(self, request, *args, **kwargs):
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            try:
                serializer.save(author=request.user)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            except Exception as e:
                logger.error(f"Error in creating a post: {e}", exc_info=True)
                return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['get'], url_path='category/(?P<category_id>\d+)')
    def category_post(self, request, pk=None, category_id=None):
        try:
            post = self.queryset.get(id=pk, category__id=category_id)
            serializer = self.get_serializer(post)
            return Response(serializer.data)
        except Post.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            logger.error(f"Error in category_post action: {e}", exc_info=True)
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(detail=True, methods=['post'])
    def toggle_like(self, request, pk=None):
        try:
            post = self.get_object()
            like = PostLike.objects.filter(user=request.user, post=post)
            if like.exists():
                like.delete()
            else:
                PostLike.objects.create(user=request.user, post=post)

            return Response(PostSerializer(post).data)
        except Exception as e:
            logger.error(f"Error in toggle_like action: {e}", exc_info=True)
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

