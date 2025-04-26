from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import User

@admin.register(User)
class CustomUserAdmin(UserAdmin):
    model = User
    list_display = ('email', 'username', 'auth_provider', 'is_staff', 'is_active')
    ordering = ('email',)
    search_fields = ('email', 'username')
