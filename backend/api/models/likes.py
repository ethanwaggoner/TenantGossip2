from django.db import models
from django.conf import settings


class PostLike(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='post_likes')
    post = models.ForeignKey('Post', on_delete=models.CASCADE, related_name='likes')

    def __str__(self):
        return f"User {self.user_id} likes Post {self.post_id}"

    class Meta:
        unique_together = ('user', 'post')


class CommentLike(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='comment_likes')
    comment = models.ForeignKey('Comment', on_delete=models.CASCADE, related_name='likes')

    def __str__(self):
        return f"User {self.user_id} likes Comment {self.comment_id}"

    class Meta:
        unique_together = ('user', 'comment')


class ReviewLike(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='review_likes')
    review = models.ForeignKey('Review', on_delete=models.CASCADE, related_name='likes')

    def __str__(self):
        return f"User {self.user_id} likes Review {self.review_id}"

    class Meta:
        unique_together = ('user', 'review')
