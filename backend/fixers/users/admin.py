from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import User, TrustedIp, EmailAuthCode


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    model = User
    list_display = ('id', 'email', 'username', 'auth_provider', 'role', 'is_staff', 'is_active', 'created_at', 'modified_at')
    ordering = ('id',)
    search_fields = ('id', 'email', 'username')
    fieldsets = UserAdmin.fieldsets + (
        ("Technical information", {'fields': ('auth_provider', 'role', 'created_at', 'modified_at')}),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        ("Technical information", {'fields': ('auth_provider', 'role')}),
    )
    readonly_fields = ('id', 'created_at', 'modified_at')

@admin.register(TrustedIp)
class TrustedIpAdmin(admin.ModelAdmin):
    list_display = ('user', 'ip_address', 'created_at')
    list_filter = ('user',)
    search_fields = ('user__email', 'ip_address')

@admin.register(EmailAuthCode)
class EmailAuthCodeAdmin(admin.ModelAdmin):
    list_display = ('user', 'code', 'created_at')
    search_fields = ('user__email',)