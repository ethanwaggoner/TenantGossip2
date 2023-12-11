import logging
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from rest_framework import viewsets, status
from rest_framework.decorators import action, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination

from api.models.likes import ReviewLike
from api.models.review import Review
from api.serializers.review import ReviewSerializer, ReviewLikeSerializer

logger = logging.getLogger(__name__)


class ReviewPagination(PageNumberPagination):
    page_size = 4
    page_size_query_param = 'page_size'
    max_page_size = 100


class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    pagination_class = ReviewPagination

    def get_queryset(self):
        try:
            queryset = super().get_queryset()
            state_id = self.request.query_params.get('state_id')
            if state_id is not None:
                queryset = queryset.filter(state_id=state_id)
            return queryset
        except Exception as e:
            logger.error(f"Error in get_queryset of ReviewViewSet: {e}", exc_info=True)
            return []

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            try:
                serializer.save(user=request.user)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            except Exception as e:
                logger.error(f"Error in creating a review: {e}", exc_info=True)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, review_id):
        try:
            review = Review.objects.get(id=review_id, user=request.user)
            review.delete()
            logger.info("Deleted review")
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            logger.error(f"Error in deleting a review: {e}", exc_info=True)


    @action(detail=True, methods=['post'])
    @permission_classes([IsAuthenticated])
    def toggle_like(self, request, pk=None):
        try:
            review = self.get_object()
            like = ReviewLike.objects.filter(user=request.user, review=review)

            if like.exists():
                like.delete()
            else:
                ReviewLike.objects.create(user=request.user, review=review)

            return Response(ReviewSerializer(review).data)
        except Exception as e:
            logger.error(f"Error in toggle_like: {e}", exc_info=True)
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ReviewLikeViewSet(viewsets.ModelViewSet):
    queryset = ReviewLike.objects.all()
    serializer_class = ReviewLikeSerializer

    def perform_create(self, serializer):
        try:
            serializer.save(user=self.request.user)
        except Exception as e:
            logger.error(f"Error in ReviewLikeViewSet perform_create: {e}", exc_info=True)

    def get_queryset(self):
        try:
            return self.queryset.filter(user=self.request.user)
        except Exception as e:
            logger.error(f"Error in ReviewLikeViewSet get_queryset: {e}", exc_info=True)
            return []
