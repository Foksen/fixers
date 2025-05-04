from rest_framework import serializers
from .models import Task, TaskCategory, ServiceCenter


class TaskCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskCategory
        fields = ['id', 'name']


class TaskCategoryInfoSerializer(serializers.ModelSerializer):
    tasks_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = TaskCategory
        fields = ['id', 'name', 'published', 'tasks_count']


class ServiceCenterSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceCenter
        fields = ['id', 'name']


class ServiceCenterInfoSerializer(serializers.ModelSerializer):
    tasks_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = ServiceCenter
        fields = ['id', 'name', 'published', 'tasks_count']


class TaskSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    service_center_name = serializers.CharField(source='service_center.name', read_only=True)
    master_username = serializers.CharField(source='master.username', read_only=True)

    class Meta:
        model = Task
        fields = '__all__'
        read_only_fields = ['client', 'master', 'created_at', 'modified_at']
