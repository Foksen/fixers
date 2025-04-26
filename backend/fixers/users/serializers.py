from rest_framework import serializers

from .models import User

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)

    class Meta:
        model = User
        fields = ('id', 'email', 'username', 'password')

    def create(self, validated_data):
        user = User.objects.create_user(
            email = validated_data['email'],
            username=validated_data['username'],
            password=validated_data['password'],
            auth_provider='email'
        )
        return user
