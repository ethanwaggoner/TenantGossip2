from django.urls import path, include
from rest_framework.routers import DefaultRouter

from api.views.review import ReviewViewSet, ReviewLikeViewSet
from api.views.category import CategoryViewSet
from api.views.post import PostViewSet
from api.views.comment import CommentViewSet
from api.views.register import register_user
from api.views.token import CustomTokenObtainPairView, CustomTokenRefreshView, verify_token, logout_user

router = DefaultRouter()

router.register(r'categories', CategoryViewSet)
router.register(r'posts', PostViewSet)
router.register(r'comments', CommentViewSet)
router.register(r'reviews', ReviewViewSet)
router.register(r'reviews-likes', ReviewLikeViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('register/', register_user, name='register'),
    path('logout/', logout_user, name='logout'),
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
    path('verify-token/', verify_token, name='verify-token')
]
