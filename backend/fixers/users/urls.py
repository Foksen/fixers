from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView

from .views import RegisterView, LoginView, UserInfosViewSet, UserView

router = DefaultRouter()
router.register(r'infos', UserInfosViewSet, basename='user-infos')
router.register(r'users', UserView, basename='user')

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('token-refresh/', TokenRefreshView.as_view(), name='token-refresh'),
    path('', include(router.urls)),
]