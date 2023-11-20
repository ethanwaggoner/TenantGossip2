from django.contrib.auth import logout
from rest_framework.decorators import api_view
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from rest_framework_simplejwt.tokens import UntypedToken
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.response import Response
from rest_framework import status


def set_secure_cookie(response, key, value):
    response.set_cookie(
        key=key, value=value, httponly=True, samesite='None', secure=True
    )


class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if response.status_code == status.HTTP_200_OK:
            set_secure_cookie(response, 'access_token', response.data['access'])
            set_secure_cookie(response, 'refresh_token', response.data['refresh'])
            response.data = {'message': 'Authentication successful'}
        return response


class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        request.data['refresh'] = request.COOKIES.get('refresh_token')
        response = super().post(request, *args, **kwargs)
        if response.status_code == status.HTTP_200_OK:
            set_secure_cookie(response, 'access_token', response.data['access'])
            response.data = {'message': 'Token refreshed successfully'}
        return response


@api_view(['GET'])
def verify_token(request):
    token = request.COOKIES.get('access_token')
    if not token:
        return Response({'detail': 'No token provided.'}, status=status.HTTP_401_UNAUTHORIZED)

    try:
        UntypedToken(token)
        return Response({'message': 'Token is valid'}, status=status.HTTP_200_OK)
    except (InvalidToken, TokenError) as e:
        return Response({'detail': str(e)}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['POST'])
def logout_user(request):
    response = Response({"message": "Logged out successfully"}, status=status.HTTP_200_OK)
    response.delete_cookie('access_token')
    response.delete_cookie('refresh_token')
    logout(request)
    return response
