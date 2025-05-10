import waffle
from django.contrib.auth import authenticate
from rest_framework import generics, viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import User, Role, TrustedIp, EmailAuthCode
from .permissions import IsMasterOrModerator, IsOwnerOrModerator
from .serializers import RegisterSerializer, UserSerializer, LoginSerializer, UserInfoSerializer
from .tokens import CustomTokenObtainPairSerializer
from .utils import get_client_ip, generate_code


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data['email']
        password = serializer.validated_data['password']
        code = serializer.validated_data.get('code', None)

        user = authenticate(request, email=email, password=password)
        if not user:
            return Response({'detail': 'Invalid credentials'}, status=401)

        ip = get_client_ip(request)

        if not waffle.flag_is_active(request, '2fa_enabled'):
            tokens = CustomTokenObtainPairSerializer.get_token(user)
            return Response({
                'access': str(tokens.access_token),
                'refresh': str(tokens)
            })

        if waffle.flag_is_active(request, 'trusted_ips_enabled'):
            if TrustedIp.objects.filter(user=user, ip_address=ip).exists():
                tokens = CustomTokenObtainPairSerializer.get_token(user)
                return Response({
                    'access': str(tokens.access_token),
                    'refresh': str(tokens)
                })

        if not code:
            email_code, _ = EmailAuthCode.objects.update_or_create(
                user=user,
                defaults={'code': generate_code()}
            )
            # send_mail(
            #     'Код авторизации (Fixers)',
            #     f'Для авторизации на сайте введите код: {email_code.code}',
            #     settings.EMAIL_HOST_USER,
            #     [user.email],
            #     fail_silently=False
            # )
            print(f'Authentication code: {email_code.code}')
            return Response({'detail': '2fa_required'}, status=403)

        try:
            email_auth_code = EmailAuthCode.objects.get(user=user)
        except EmailAuthCode.DoesNotExist:
            return Response({'detail': 'No code generated'}, status=400)
        if email_auth_code.code != code:
            return Response({'detail': 'Invalid code'}, status=400)

        if waffle.flag_is_active(request, 'trusted_ips_enabled'):
            TrustedIp.objects.get_or_create(user=user, ip_address=ip)
        email_auth_code.delete()
        tokens = CustomTokenObtainPairSerializer.get_token(user)
        return Response({
            'access': str(tokens.access_token),
            'refresh': str(tokens)
        })


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

    def get_permissions(self):
        if self.request.method == 'POST':
            if self.request.user.is_authenticated and self.request.user.role == Role.MODERATOR:
                return [IsAuthenticated()]
            else:
                return [AllowAny()]
        return super().get_permissions()

    def perform_create(self, serializer):
        user = self.request.user
        role = serializer.validated_data.get('role')

        if role in [Role.MASTER, Role.MODERATOR]:
            if user.role != Role.MODERATOR:
                raise PermissionDenied("Only moderators can create masters or moderators.")

        serializer.save()


class UserView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrModerator]
    http_method_names = ['get', 'patch', 'put', 'delete']

    def get_object(self):
        if self.request.user.role != Role.MODERATOR:
            return self.request.user
        return super().get_object()

    def list(self, request, *args, **kwargs):
        if request.user.role != Role.MODERATOR:
            return Response({'detail': 'Not enough rights'}, status=403)
        return super().list(request, *args, **kwargs)


class UserInfosViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserInfoSerializer
    permission_classes = [IsAuthenticated & IsMasterOrModerator]