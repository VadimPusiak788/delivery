from rest_auth.registration.views import RegisterView
from rest_framework.views import APIView
from rest_framework.response import Response
from order.models import Order, OrderStatus
from order.serializers import SerializersOrderStatus

from user.serializers import (CourierCustomRegistrationSerializer,
                CustomerCustomRegistrationSerializer)


class CourierRegistrationView(RegisterView):
    serializer_class = CourierCustomRegistrationSerializer


class CustomerRegistrationView(RegisterView):
    serializer_class = CustomerCustomRegistrationSerializer


class UserProfileView(APIView):


    def get(self, request):
        
        if request.user.is_customer:
            order = Order.objects.filter(customer=request.user.id)
            orders = OrderStatus.objects.filter(order__in=order)
        
        else:
            orders = OrderStatus.objects.all()

        serializer_context = {
            'request': request,
        }

        serializers_order = SerializersOrderStatus(orders, many=True, context=serializer_context)

        return Response(serializers_order.data)