from rest_framework import serializers
from api.models.comment import Comment
from api.models.post import Post


class CommentSerializer(serializers.ModelSerializer):
    post = serializers.PrimaryKeyRelatedField(queryset=Post.objects.all())

    class Meta:
        model = Comment
        fields = ['id', 'body', 'post', 'created_at']
