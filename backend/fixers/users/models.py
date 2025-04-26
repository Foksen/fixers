from django.contrib.auth.models import AbstractUser
from django.db import models

class AuthProvider(models.TextChoices):
    EMAIL = 'email', 'Email'
    GOOGLE = 'google', 'Google'

class User(AbstractUser):
    email = models.EmailField(unique=True)
    auth_provider = models.CharField(
        max_length=20,
        choices=AuthProvider.choices,
        default=AuthProvider.EMAIL
    )

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email