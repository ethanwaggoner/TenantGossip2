from rest_framework import serializers
from api.models.post import Post


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id', 'title', 'body', 'category', 'author']