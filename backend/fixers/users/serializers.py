from rest_framework import serializers

from .models import User, Role

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)
    role = serializers.ChoiceField(choices=Role.choices, default=Role.CLIENT)

    class Meta:
        model = User
        fields = ('id', 'email', 'username', 'password', 'role', 'created_at', 'modified_at')
        read_only_fields = ('created_at', 'modified_at')

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            username=validated_data['username'],
            password=validated_data['password'],
            auth_provider='email',
            role=validated_data['role']
        )
        return user

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'username', 'auth_provider', 'role', 'created_at', 'modified_at')