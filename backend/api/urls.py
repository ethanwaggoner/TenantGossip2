from django.urls import path, include
from rest_framework.routers import DefaultRouter
from api.views.category import CategoryViewSet
from api.views.post import PostViewSet
from api.views.comment import CommentViewSet

router = DefaultRouter()

router.register(r'categories', CategoryViewSet)
router.register(r'posts', PostViewSet)
router.register(r'comments', CommentViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
