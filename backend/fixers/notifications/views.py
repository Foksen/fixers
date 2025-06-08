from django.shortcuts import render
from rest_framework import viewsets, filters, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend

from .models import Notification
from .serializers import NotificationSerializer


class NotificationViewSet(viewsets.ModelViewSet):
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['is_new', 'task', 'user']
    ordering_fields = ['created_at']
    
    def get_queryset(self):
        return Notification.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    
    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)
        self.get_queryset().filter(is_new=True).update(is_new=False)
        return response
    
    @action(detail=False, methods=['get'])
    def count_new(self, request):
        count = self.get_queryset().filter(is_new=True).count()
        return Response({'count': count})
    
    @action(detail=False, methods=['post'])
    def mark_all_as_read(self, request):
        notifications = self.get_queryset().filter(is_new=True)
        notifications.update(is_new=False)
        return Response({'status': 'All notifications marked as read'}, status=status.HTTP_200_OK)
    
    @action(detail=True, methods=['post'])
    def mark_as_read(self, request, pk=None):
        notification = self.get_object()
        notification.is_new = False
        notification.save()
        return Response({'status': 'Notification marked as read'}, status=status.HTTP_200_OK)
