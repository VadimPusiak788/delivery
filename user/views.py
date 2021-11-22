from django.http import response
from rest_auth.registration.views import RegisterView
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response


from user.serializers import (CourierCustomRegistrationSerializer,
                CustomerCustomRegistrationSerializer)


class CourierRegistrationView(RegisterView):
    serializer_class = CourierCustomRegistrationSerializer


class CustomerRegistrationView(RegisterView):
    serializer_class = CustomerCustomRegistrationSerializer


class GetUserView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response('All OK')