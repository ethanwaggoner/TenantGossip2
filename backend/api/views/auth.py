import logging
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt, csrf_protect
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status

from api.models.user import CustomUser

logger = logging.getLogger('django')


@api_view(['POST'])
@permission_classes([AllowAny])
@csrf_protect
def login_user(request):
    try:
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(request, email=email, password=password)
        if user is not None:
            login(request, user)
            logger.info(f"User {email} logged in successfully")
            user = CustomUser.objects.get(email=email)
            return Response({'message': 'Login successful', 'username': str(user.random_username)}, status=status.HTTP_200_OK)
        else:
            logger.warning(f"Login failed for user {email}")
            return Response({'message': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
    except Exception as e:
        logger.exception(f"Error during login {e}")
        return Response({'message': 'login error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def logout_user(request):
    try:
        user_email = request.user.email
        request.session.flush()
        logout(request)
        logger.info(f"User {user_email} logged out successfully")
        return Response({"message": "Logged out successfully"}, status=status.HTTP_200_OK)
    except Exception as e:
        logger.error(f"Error during logout: {e}", exc_info=True)
        return Response({"message": "Logout error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def check_session(request):
    try:
        logger.info(f"Session check for user {request.user.email}")
        return Response({'message': 'User is authenticated'}, status=status.HTTP_200_OK)
    except Exception as e:
        logger.error(f"Error in session check: {e}", exc_info=True)
        return Response({'message': 'Error checking session'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@permission_classes([AllowAny])
@ensure_csrf_cookie
def set_csrf_token(request):
    try:
        token = get_token(request)
        logger.info("CSRF token set successfully")
        return JsonResponse({"token": token})
    except Exception as e:
        logger.error(f"Error setting CSRF token: {e}", exc_info=True)
        return JsonResponse({"message": "Error setting token"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
