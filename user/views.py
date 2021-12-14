from rest_auth.registration.views import RegisterView
from rest_framework.views import APIView
from rest_framework.response import Response
from order.models import Order, OrderStatus
from order.serializers import SerializersOrderStatus

from user.serializers import (CourierCustomRegistrationSerializer,
                CustomerCustomRegistrationSerializer,SerailizersCustomerMe,SerailizersCourierMe)

from order.query import filter_user_by_courier
from rest_framework.permissions import IsAuthenticated, AllowAny


class CourierRegistrationView(RegisterView):
    permission_classes = (AllowAny,)
    authentication_classes = ()
    serializer_class = CourierCustomRegistrationSerializer

class UserMeView(APIView):
    def get(self, request):
        serializer_context = {
            'request': request,
        }
        if request.user.is_customer:
            return Response(SerailizersCustomerMe(request.user,  context=serializer_context).data)
        return Response(SerailizersCourierMe(request.user,  context=serializer_context).data)

class CustomerRegistrationView(RegisterView):
    permission_classes = (AllowAny,)
    authentication_classes = ()
    serializer_class = CustomerCustomRegistrationSerializer


class UserProfileView(APIView):


    def get(self, request):
        
        if request.user.is_customer:
            order = Order.objects.filter(customer=request.user.id)
            orders = OrderStatus.objects.filter(order__in=order)
        
        else:
            courier = filter_user_by_courier(request.user)
            orders = OrderStatus.objects.filter(courier=courier, status='FINISHED')
            
        serializer_context = {
            'request': request,
        }

        serializers_order = SerializersOrderStatus(orders, many=True, context=serializer_context)

        return Response(serializers_order.data)


class CouirerOffer(APIView):


    def get(self, request):

        order = OrderStatus.objects.filter(status__in=['CREATED', 'ACCEPT'])

        serializers_order = SerializersOrderStatus(order, many=True)

        return Response(serializers_order.data)


