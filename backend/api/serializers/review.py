from rest_framework import serializers
from api.models.review import Review
from api.models.likes import ReviewLike
from app import settings


class ReviewSerializer(serializers.ModelSerializer):
    num_likes = serializers.IntegerField(read_only=True)
    author_random_username = serializers.SerializerMethodField()
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        ordering = ['-created_at']
        model = Review
        fields = ['id', 'user', 'state_id', 'title', 'content', 'created_at', 'num_likes', 'author_random_username']

    def get_author_random_username(self, obj):
        return obj.user.random_username if obj.user else None


class ReviewLikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReviewLike
        fields = ['id', 'user', 'review']

