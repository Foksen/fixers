from django.contrib import admin

from .models import Task, TaskCategory, ServiceCenter


@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    model = Task
    list_display = ('id', 'client', 'master', 'category', 'service_center', 'status', 'created_at', 'modified_at')
    ordering = ('id',)
    readonly_fields = ('id', 'created_at', 'modified_at')


@admin.register(TaskCategory)
class TaskCategoryAdmin(admin.ModelAdmin):
    model = TaskCategory
    list_display = ('id', 'name', 'published')
    ordering = ('id',)


@admin.register(ServiceCenter)
class ServiceCenterAdmin(admin.ModelAdmin):
    model = ServiceCenter
    list_display = ('id', 'name', 'published')
    ordering = ('id',)