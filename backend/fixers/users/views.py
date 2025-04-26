from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import User, Role
from .serializers import RegisterSerializer, UserSerializer
from .tokens import CustomTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

    def get_permissions(self):
        if self.request.method == 'POST':
            if self.request.user.is_authenticated and self.request.user.role == Role.MODERATOR:
                return [IsAuthenticated()]
            else:
                return [AllowAny()]
        return super().get_permissions()

    def perform_create(self, serializer):
        user = self.request.user
        role = serializer.validated_data.get('role')

        if role in [Role.MASTER, Role.MODERATOR]:
            if user.role != Role.MODERATOR:
                raise PermissionDenied("Only moderators can create masters or moderators.")

        serializer.save()

class CustomTokenObtainPairView(TokenObtainPairView):
    permission_classes = [AllowAny]
    serializer_class = CustomTokenObtainPairSerializer

class UserMeView(generics.RetrieveAPIView):
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user
