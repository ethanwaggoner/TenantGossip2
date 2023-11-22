from django.urls import path, include
from rest_framework.routers import DefaultRouter

from api.views.auth import login_user, logout_user, check_session, set_csrf_token
from api.views.review import ReviewViewSet, ReviewLikeViewSet
from api.views.category import CategoryViewSet
from api.views.post import PostViewSet
from api.views.comment import CommentViewSet
from api.views.register import register_user

router = DefaultRouter()

router.register(r'categories', CategoryViewSet)
router.register(r'posts', PostViewSet)
router.register(r'comments', CommentViewSet)
router.register(r'reviews', ReviewViewSet)
router.register(r'reviews-likes', ReviewLikeViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('register/', register_user, name='register'),
    path('login/', login_user, name='login'),
    path('logout/', logout_user, name='logout'),
    path('check-session/', check_session, name='check-session'),
    path('csrf/', set_csrf_token, name='set-csrf-token'),

]
