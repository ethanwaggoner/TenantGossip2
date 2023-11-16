from django.db import models
from django.conf import settings


class Review(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    state_id = models.IntegerField()
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=100)

    def num_likes(self):
        return self.likes.count()

    def __str__(self):
        return f'Review by {self.user.email} on state {self.state_id}'
