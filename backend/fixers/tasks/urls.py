from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TaskViewSet, TaskCategoryViewSet

router = DefaultRouter()
router.register('', TaskViewSet, basename='task')
router.register('categories', TaskCategoryViewSet, basename='task-category')

urlpatterns = [
    path('', include(router.urls)),
]
