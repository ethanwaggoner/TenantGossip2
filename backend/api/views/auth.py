from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt, csrf_protect
from django.views.decorators.http import require_safe
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status


@api_view(['POST'])
@permission_classes([AllowAny])
@csrf_protect
def login_user(request):
    email = request.data.get('email')
    password = request.data.get('password')
    user = authenticate(request, email=email, password=password)
    if user is not None:
        login(request, user)
        return Response({'message': 'Login successful'}, status=status.HTTP_200_OK)
    else:
        return Response({'message': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def logout_user(request):
    request.session.flush()
    logout(request)
    return Response({"message": "Logged out successfully"}, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def check_session(request):
    return Response({'message': 'User is authenticated'}, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([AllowAny])
@ensure_csrf_cookie
def set_csrf_token(request):
    return JsonResponse({"token": get_token(request)})
