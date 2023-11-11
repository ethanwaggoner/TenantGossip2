from django.db import models
from django.conf import settings


class Post(models.Model):
    title = models.CharField(max_length=100)
    body = models.TextField(max_length=1000)
    category = models.ForeignKey('Category', on_delete=models.CASCADE, related_name='posts')
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def __str__(self):
        return self.title
