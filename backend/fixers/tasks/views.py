from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, permissions, filters
from rest_framework.exceptions import PermissionDenied
from users.models import Role

from .models import Task, TaskCategory
from .serializers import TaskSerializer, TaskCategorySerializer

class TaskCategoryViewSet(viewsets.ModelViewSet):
    queryset = TaskCategory.objects.all()
    serializer_class = TaskCategorySerializer
    permission_classes = [permissions.IsAuthenticated]

class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['status', 'category', 'client', 'master']
    ordering_fields = ['created_at', 'modified_at', 'status']

    def get_queryset(self):
        user = self.request.user
        if user.role in [Role.MASTER, Role.MODERATOR]:
            return Task.objects.all()
        elif user.role == Role.CLIENT:
            return Task.objects.filter(client=user)
        return Task.objects.none()

    def perform_create(self, serializer):
        serializer.save(client=self.request.user)

    def perform_update(self, serializer):
        user = self.request.user
        if user.role in [Role.MASTER, Role.CLIENT]:
            serializer.save()
        else:
            raise PermissionDenied("You do not have permission to update this task.")
