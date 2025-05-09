
from rest_framework import permissions
from rest_framework.permissions import SAFE_METHODS

from users.models import Role


class IsMasterOrModerator(permissions.BasePermission):
    def has_permission(self, request, view):
        return (
            request.user
            and request.user.is_authenticated
            and getattr(request.user, "role", None) in [Role.MASTER, Role.MODERATOR]
        )


class IsModerator(permissions.BasePermission):
    def has_permission(self, request, view):
        return (
            request.user
            and request.user.is_authenticated
            and getattr(request.user, "role", None) == Role.MODERATOR
        )


class IsSafeOrIsModerator(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        return (
            request.user
            and request.user.is_authenticated
            and getattr(request.user, 'role', None) == Role.MODERATOR
        )


class IsOwnerOrModerator(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.user == obj or request.user.role == Role.MODERATOR
