from django.contrib.auth.models import AbstractUser
from django.db import models

class AuthProvider(models.TextChoices):
    EMAIL = 'EMAIL', 'Email'
    GOOGLE = 'GOOGLE', 'Google'

class Role(models.TextChoices):
    CLIENT = 'CLIENT', 'Client'
    MASTER = 'MASTER', 'Master'
    MODERATOR = 'MODERATOR', 'Moderator'

class User(AbstractUser):
    email = models.EmailField(unique=True)
    auth_provider = models.CharField(
        max_length=20,
        choices=AuthProvider.choices,
        default=AuthProvider.EMAIL
    )
    role = models.CharField(
        max_length=20,
        choices=Role.choices,
        default=Role.CLIENT
    )
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'password', 'role', 'auth_provider']

    def __str__(self):
        return self.email