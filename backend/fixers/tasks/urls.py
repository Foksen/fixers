from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TaskViewSet, TaskCategoryViewSet, ServiceCenterViewSet, ServiceCenterInfoViewSet, \
    TaskCategoryInfoViewSet

router = DefaultRouter()
router.register('tasks', TaskViewSet, basename='task')
router.register('categories', TaskCategoryViewSet, basename='task-category')
router.register('categories-infos', TaskCategoryInfoViewSet, basename='task-category-info')
router.register('service-centers', ServiceCenterViewSet, basename='service-center')
router.register('service-centers-infos', ServiceCenterInfoViewSet, basename='service-center-info')

urlpatterns = [
    path('', include(router.urls)),
]
