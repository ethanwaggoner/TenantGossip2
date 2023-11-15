from rest_framework import serializers
from api.models.review import Review


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id', 'user', 'state_id', 'content', 'created_at']
