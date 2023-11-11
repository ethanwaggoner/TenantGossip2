from rest_framework import serializers
from api.models.post import Post


class PostSerializer(serializers.ModelSerializer):
    like_count = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ['id', 'title', 'body', 'category', 'author', 'like_count']

    def get_like_count(self, obj):
        return obj.likes.count()