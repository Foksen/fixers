
from rest_framework import permissions

from users.models import Role


class IsMasterOrModerator(permissions.BasePermission):
    def has_permission(self, request, view):
        return (
            request.user
            and request.user.is_authenticated
            and getattr(request.user, "role", None) in [Role.MASTER, Role.MODERATOR]
        )
