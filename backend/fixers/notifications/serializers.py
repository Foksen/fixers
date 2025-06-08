from rest_framework import serializers
from .models import Notification


class NotificationSerializer(serializers.ModelSerializer):
    task_id = serializers.IntegerField(source='task.id', read_only=True)
    user_id = serializers.IntegerField(source='user.id', read_only=True)
    sender_id = serializers.IntegerField(source='sender.id', read_only=True, allow_null=True)
    sender_username = serializers.CharField(source='sender.username', read_only=True, allow_null=True)
    
    class Meta:
        model = Notification
        fields = [
            'id', 'task_id', 'user_id', 'sender_id', 'sender_username',
            'title', 'message', 'is_new', 'created_at'
        ]
        read_only_fields = ['created_at'] 