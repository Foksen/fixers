
from rest_framework import permissions

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
            and getattr(request.user, "role", None) in [Role.MODERATOR]
        )


class IsOwnerOrModerator(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.user == obj or request.user.role == Role.MODERATOR
