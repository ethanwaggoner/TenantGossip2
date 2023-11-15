from rest_framework import viewsets
from api.models.review import Review
from api.serializers.review import ReviewSerializer
from rest_framework.pagination import PageNumberPagination


class ReviewPagination(PageNumberPagination):
    page_size = 6
    page_size_query_param = 'page_size'
    max_page_size = 100


class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    pagination_class = ReviewPagination

    def get_queryset(self):
        queryset = super().get_queryset()
        state_id = self.request.query_params.get('state_id')
        if state_id is not None:
            queryset = queryset.filter(state_id=state_id)
        return queryset
