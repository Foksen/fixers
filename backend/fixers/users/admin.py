from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import User

@admin.register(User)
class CustomUserAdmin(UserAdmin):
    model = User
    list_display = ('id', 'email', 'username', 'auth_provider', 'role', 'is_staff', 'is_active', 'created_at', 'modified_at')
    ordering = ('id',)
    search_fields = ('id', 'email', 'username')
    fieldsets = UserAdmin.fieldsets + (
        (None, {'fields': ('auth_provider', 'role', 'created_at', 'modified_at')}),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        (None, {'fields': ('auth_provider', 'role')}),
    )
    readonly_fields = ('id', 'created_at', 'modified_at')