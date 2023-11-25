from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination

from api.models.likes import PostLike
from api.models.post import Post
from api.serializers.post import PostSerializer


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 6
    page_size_query_param = 'page_size'
    max_page_size = 100


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    pagination_class = StandardResultsSetPagination

    def get_queryset(self):
        category_id = self.request.query_params.get('category_id', None)
        if category_id is not None:
            self.queryset = self.queryset.filter(category__id=category_id)
        return self.queryset

    @action(detail=True, methods=['get'], url_path='category/(?P<category_id>\d+)')
    def category_post(self, request, pk=None, category_id=None):
        try:
            post = self.queryset.get(id=pk, category__id=category_id)
            serializer = self.get_serializer(post)
            return Response(serializer.data)
        except Post.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    @action(detail=True, methods=['post'])
    def toggle_like(self, request, pk=None):
        post = self.get_object()
        like = PostLike.objects.filter(user=request.user, post=post)
        if like.exists():
            like.delete()
        else:
            PostLike.objects.create(user=request.user, post=post)

        return Response(PostSerializer(post).data)

