from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from api.models.likes import ReviewLike
from api.models.review import Review
from api.serializers.review import ReviewSerializer, ReviewLikeSerializer
from rest_framework.pagination import PageNumberPagination


class ReviewPagination(PageNumberPagination):
    page_size = 4
    page_size_query_param = 'page_size'
    max_page_size = 100


class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    pagination_class = ReviewPagination
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = super().get_queryset()
        state_id = self.request.query_params.get('state_id')
        if state_id is not None:
            queryset = queryset.filter(state_id=state_id)
        return queryset

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'])
    def toggle_like(self, request, pk=None):
        review = self.get_object()
        likes = ReviewLike.objects.filter(user=request.user, review=review)

        if likes.exists():
            likes.delete()
        else:
            ReviewLike.objects.create(user=request.user, review=review)

        return Response(ReviewSerializer(review).data)


class ReviewLikeViewSet(viewsets.ModelViewSet):
    queryset = ReviewLike.objects.all()
    serializer_class = ReviewLikeSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)
