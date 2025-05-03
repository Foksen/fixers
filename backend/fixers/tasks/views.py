from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, filters
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import AllowAny

from users.models import Role

from .models import Task, TaskCategory, ServiceCenter
from .serializers import TaskSerializer, TaskCategorySerializer, ServiceCenterSerializer


class TaskCategoryViewSet(viewsets.ModelViewSet):
    queryset = TaskCategory.objects.all()
    serializer_class = TaskCategorySerializer
    permission_classes = [AllowAny]

    def list(self, request, *args, **kwargs):
        print("TaskCategoryViewSet.list вызван!")
        return super().list(request, *args, **kwargs)

    def retrieve(self, request, *args, **kwargs):
        print("TaskCategoryViewSet.retrieve вызван!")
        return super().retrieve(request, *args, **kwargs)


class ServiceCenterViewSet(viewsets.ModelViewSet):
    queryset = ServiceCenter.objects.all()
    serializer_class = ServiceCenterSerializer
    permission_classes = [AllowAny]


class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['status', 'category', 'service_center', 'client', 'master']
    ordering_fields = ['created_at', 'modified_at']

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
