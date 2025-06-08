from rest_framework import serializers
from .models import Task, TaskCategory, ServiceCenter
from users.models import Role


class TaskCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskCategory
        fields = ['id', 'name', 'published']


class TaskCategoryInfoSerializer(serializers.ModelSerializer):
    tasks_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = TaskCategory
        fields = ['id', 'name', 'published', 'tasks_count']


class ServiceCenterSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceCenter
        fields = ['id', 'name', 'published']


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
        read_only_fields = ['client', 'created_at', 'modified_at']

    def validate(self, attrs):
        errors = {}
        
        request = self.context.get('request')
        if request and hasattr(request, 'user'):
            user_role = getattr(request.user, 'role', None)
            
            if user_role == Role.MODERATOR:
                return attrs
            
            if self.instance and user_role in [Role.MASTER, Role.CLIENT]:
                if 'category' in attrs and attrs['category'] != self.instance.category:
                    category = attrs['category']
                    if category and not category.published:
                        errors["category"] = "Category is unavailable"
                
                if 'service_center' in attrs and attrs['service_center'] != self.instance.service_center:
                    service_center = attrs['service_center']
                    if service_center and not service_center.published:
                        errors["service_center"] = "Service center is unavailable"
                
                if not errors:
                    return attrs
        
        if self.instance is None:
            category = attrs.get("category")
            service_center = attrs.get("service_center")

            if category and not category.published:
                errors["category"] = "Category is unavailable"
            if service_center and not service_center.published:
                errors["service_center"] = "Service center is unavailable"

        elif "category" in attrs:
            category = attrs["category"]
            if category and not category.published:
                errors["category"] = "Category is unavailable"

            service_center = attrs["service_center"]
            if service_center and not service_center.published:
                errors["service_center"] = "Service center is unavailable"

        if errors:
            raise serializers.ValidationError(errors)
        return attrs
