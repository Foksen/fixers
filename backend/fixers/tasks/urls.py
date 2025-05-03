from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TaskViewSet, TaskCategoryViewSet, ServiceCenterViewSet


router = DefaultRouter()
router.register('tasks', TaskViewSet, basename='task')
router.register('categories', TaskCategoryViewSet, basename='task-category')
router.register('service-centers', ServiceCenterViewSet, basename='service-center')

urlpatterns = [
    path('', include(router.urls)),
]
