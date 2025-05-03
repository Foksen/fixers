from django.contrib import admin

from .models import Task, TaskCategory, ServiceCenter

@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    model = Task
    list_display = ('id', 'client', 'master', 'category', 'service_center', 'status', 'created_at', 'modified_at')
    ordering = ('id',)
    readonly_fields = ('id', 'created_at', 'modified_at')

admin.site.register(TaskCategory)

admin.site.register(ServiceCenter)