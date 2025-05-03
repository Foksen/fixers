from django.contrib import admin

from .models import Task, TaskCategory, ServiceCenter


admin.site.register(Task)
admin.site.register(TaskCategory)
admin.site.register(ServiceCenter)