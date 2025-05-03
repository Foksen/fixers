from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.db import models


class AuthProvider(models.TextChoices):
    EMAIL = 'EMAIL', 'Email'
    GOOGLE = 'GOOGLE', 'Google'
    GITHUB = 'GITHUB', 'Github'


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

class TrustedIp(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,
                             related_name="trusted_ips", db_index=True)
    ip_address = models.CharField(max_length=45, db_index=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'ip_address')

class EmailAuthCode(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    code = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)
