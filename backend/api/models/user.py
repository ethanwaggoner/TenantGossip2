import random

from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models


def load_words_from_file(file_path):
    with open(file_path) as file:
        return [line.strip() for line in file]


ADJECTIVES = load_words_from_file(r'C:\Users\14434\Desktop\Programming '
                                  r'Projects\TenantGossip2\backend\wordlists\adjectives.txt')
NOUNS = load_words_from_file(r'C:\Users\14434\Desktop\Programming Projects\TenantGossip2\backend\wordlists\nouns.txt')


class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)

        unique_username = False
        random_username = None
        while not unique_username:
            adjective = random.choice(ADJECTIVES)
            noun = random.choice(NOUNS)
            number = random.randint(1000, 9999)
            random_username = f"{adjective}-{noun}{number}"
            if not self.model.objects.filter(random_username=random_username).exists():
                unique_username = True
        print(random_username)
        user.random_username = random_username
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, password, **extra_fields)


class CustomUser(AbstractUser):
    username = None
    email = models.EmailField(unique=True)
    random_username = models.CharField(max_length=100, unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email
