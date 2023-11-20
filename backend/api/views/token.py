from django.contrib.auth import logout
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from rest_framework_simplejwt.tokens import UntypedToken
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.response import Response
from rest_framework import status


class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if response.status_code == status.HTTP_200_OK:
            access_token = response.data['access']
            refresh_token = response.data['refresh']
            response.set_cookie(
                key='access_token', value=access_token, httponly=True, samesite='None', secure=True
            )
            response.set_cookie(
                key='refresh_token', value=refresh_token, httponly=True, samesite='None', secure=True
            )
            response.data = {'message': 'Authentication successful'}
        return response


class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        request.data['refresh'] = request.COOKIES.get('refresh_token')
        response = super().post(request, *args, **kwargs)
        if response.status_code == status.HTTP_200_OK:
            access_token = response.data['access']
            response.set_cookie(
                key='access_token', value=access_token, httponly=True, samesite='None', secure=True, max_age=7 * 24 * 60 * 60 * 1000
            )
            response.data = {'message': 'Token refreshed successfully'}
        return response


@api_view(['GET'])
def verify_token(request):
    try:
        token = request.COOKIES.get('access_token')
        if not token:
            return Response({'detail': 'No token provided.'}, status=status.HTTP_401_UNAUTHORIZED)

        try:
            UntypedToken(token)
        except (InvalidToken, TokenError) as e:
            return Response({'detail': str(e)}, status=status.HTTP_401_UNAUTHORIZED)

        return Response({'message': 'Token is valid'}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def logout_user(request):
    response = Response({"message": "Logged out successfully"}, status=status.HTTP_200_OK)
    response.delete_cookie('access_token')
    response.delete_cookie('refresh_token')
    logout(request)

    return response
