from django.contrib import admin
from api.models.comment import Comment
from api.models.post import Post
from api.models.category import Category
from api.models.likes import PostLike, CommentLike
from api.models.user import CustomUser
from api.models.review import Review

admin.site.register(Comment)
admin.site.register(Post)
admin.site.register(Category)
admin.site.register(PostLike)
admin.site.register(CommentLike)
admin.site.register(CustomUser)
admin.site.register(Review)


