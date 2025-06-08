from django.contrib import admin
from .models import Notification


@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'user', 'task', 'sender', 'is_new', 'created_at')
    list_filter = ('is_new', 'created_at')
    search_fields = ('title', 'message', 'user__username', 'sender__username')
    readonly_fields = ('created_at',)
