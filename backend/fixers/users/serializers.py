from rest_framework import serializers

from .models import User, Role


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()
    code = serializers.CharField(required=False, allow_blank=True)


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
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
            role=validated_data['role']
        )
        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'username', 'auth_provider', 'role', 'auth_provider', 'created_at', 'modified_at')
        read_only_fields = ('created_at', 'modified_at', 'auth_provider')


class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "email", "username", "role"]