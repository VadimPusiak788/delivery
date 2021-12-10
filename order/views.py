from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from user.models import Customer, Courier
from django.http import Http404
from user.permissions import PermissionOrderCustomer, PermissionOrderCourier
from rest_framework import status


from order.models import Order, OrderItem, OrderStatus, Product, Supplier
from order.serializers import (SerializersProduct, SerializersListSupplier, SerializersSupplier,
                                SerializersOrder, SerializersOrderStatusDetail)

from order.cart import Cart


class DetailSupplierView(generics.RetrieveAPIView):
    queryset = Supplier.objects.all()
    serializer_class = SerializersSupplier


class ListSupllierView(generics.ListAPIView):

    queryset = Supplier.objects.all()
    serializer_class = SerializersListSupplier


class DetailProductView(APIView):

    def get_object(self, pk):
        try:
            return Product.objects.get(pk=pk)
        except Product.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        product = self.get_object(pk)
        serializers_product = SerializersProduct(product)
        return Response(serializers_product.data)

    def post(self, request, pk):

        cart = Cart(request)

        cart.add(pk)

        return Response("It's OK")


class CartView(APIView):

    permission_classes = [PermissionOrderCustomer]

    def get(self, request):
        cart = Cart(request)
        cart_product = cart.get_all_product()
        price_total = cart.get_total_price()

        return Response({'products':cart_product , 'price_total': price_total})
    

    def post(self, request):
        cart = Cart(request)
        all_orders = cart.get_all_orders()
        price_total = cart.get_total_price()

        customer = Customer.objects.get(customer=request.user)
        order = Order.objects.create(customer=customer, total=price_total)
        order.orderitem.add(*all_orders)
        order.save()
        cart.clear()

        serializers_order = SerializersOrder(order)

        return Response(serializers_order.data)
    
    def patch(self, request):
        pass

    def delete(self, request):
        cart = Cart(request)

        cart.clear()

        return Response('Cart is empty')
    


class OrderDetailView(APIView):

    permission_classes = [PermissionOrderCourier]

    def get_object(self, pk):
        try:
            return OrderStatus.objects.get(pk=pk)
        except OrderStatus.DoesNotExist:
            raise Http404

    def patch(self, request, pk):
        order_stat = self.get_object(pk)

        # courier = Courier.objects.get(courier=request.user)

        # order_stat.courier = courier

        updated_order_serializer = SerializersOrderStatusDetail(order_stat, data=request.data, partial=True)

        if updated_order_serializer.is_valid():

            updated_order_serializer.save()
            return Response(updated_order_serializer.data)

        return Response(
            updated_order_serializer.errors, status=status.HTTP_400_BAD_REQUEST
        )
    
        
