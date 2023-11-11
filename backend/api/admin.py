from django.contrib import admin
from api.models.comment import Comment
from api.models.post import Post
from api.models.category import Category
from api.models.likes import PostLike, CommentLike

admin.site.register(Comment)
admin.site.register(Post)
admin.site.register(Category)
admin.site.register(PostLike)
admin.site.register(CommentLike)


