from django.db.models import Count
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, filters
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated

from users.models import Role, User
from users.permissions import IsModerator, IsSafeOrIsModerator
from notifications.utils import create_task_status_notification, create_task_master_notification

from .models import Task, TaskCategory, ServiceCenter
from .serializers import TaskSerializer, TaskCategorySerializer, ServiceCenterSerializer, TaskCategoryInfoSerializer, \
    ServiceCenterInfoSerializer


class TaskCategoryViewSet(viewsets.ModelViewSet):
    queryset = TaskCategory.objects.all()
    serializer_class = TaskCategorySerializer
    permission_classes = [IsSafeOrIsModerator]
    filterset_fields = ['published',]


class TaskCategoryInfoViewSet(viewsets.ModelViewSet):
    queryset = TaskCategory.objects.annotate(tasks_count=Count('task'))
    serializer_class = TaskCategoryInfoSerializer
    permission_classes = [IsAuthenticated & IsModerator]
    filterset_fields = ['published', ]


class ServiceCenterViewSet(viewsets.ModelViewSet):
    queryset = ServiceCenter.objects.all()
    serializer_class = ServiceCenterSerializer
    permission_classes = [IsSafeOrIsModerator]
    filterset_fields = ['published',]


class ServiceCenterInfoViewSet(viewsets.ModelViewSet):
    queryset = ServiceCenter.objects.annotate(tasks_count=Count('task'))
    serializer_class = ServiceCenterInfoSerializer
    permission_classes = [IsAuthenticated & IsModerator]
    filterset_fields = ['published', ]


class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = {
        'status': ['in', 'exact'],
        'category': ['in', 'exact'],
        'service_center': ['in', 'exact'],
        'client': ['in', 'exact'],
        'master': ['in', 'exact'],
    }
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
        task = self.get_object()
        old_status = task.status
        old_master = task.master
        
        if user.role in [Role.MASTER, Role.CLIENT, Role.MODERATOR]:
            if user.role == Role.MODERATOR:
                master_id = self.request.data.get('master_id')
                
                if master_id == "null" or master_id == "" or master_id is None:
                    # Master being removed
                    if old_master:
                        serializer.save(master=None)
                        create_task_master_notification(task, task.client, old_master, 'removed')
                        return
                    else:
                        serializer.save(master=None)
                        return
                
                try:
                    master = User.objects.get(id=master_id)
                    if old_master != master:
                        serializer.save(master=master)
                        create_task_master_notification(task, task.client, master, 'assigned')
                        return
                    else:
                        serializer.save(master=master)
                        return
                except (User.DoesNotExist, ValueError):
                    pass
            
            elif user.role == Role.MASTER:
                master_id = self.request.data.get('master_id')
                
                if master_id == "null" and serializer.instance.master == user:
                    serializer.save(master=None)
                    create_task_master_notification(task, task.client, user, 'removed')
                    return
                
                if master_id and str(master_id) == str(user.id) and serializer.instance.master is None:
                    serializer.save(master=user)
                    create_task_master_notification(task, task.client, user, 'assigned')
                    return
            
            status = self.request.data.get('status')
            if status and status != old_status:
                instance = serializer.save()
                create_task_status_notification(instance, task.client, user)
            else:
                serializer.save()
        else:
            raise PermissionDenied("You do not have permission to update this task.")
