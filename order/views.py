from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from user.permissions import PermissionOrderCustomer, PermissionOrderCourier
from rest_framework import status
from django.shortcuts import get_object_or_404


from order.models import  OrderStatus, Product, Supplier
from order.serializers import (SerializersProduct, SerializersListSupplier, SerializersSupplier, SerializersOrderItem,
                                SerializersOrder, SerializersOrderStatusDetail)

from order.cart import Cart
from order.query import filter_user_by_customer, filter_user_by_courier, create_order


class DetailSupplierView(generics.RetrieveAPIView):
    queryset = Supplier.objects.all()
    serializer_class = SerializersSupplier


class ListSupllierView(generics.ListAPIView):

    queryset = Supplier.objects.all()
    serializer_class = SerializersListSupplier


class DetailProductView(APIView):

    permission_classes = [PermissionOrderCustomer]


    def get(self, request, pk):
        product = get_object_or_404(Product, pk=pk)
        serializers_product = SerializersProduct(product)
        return Response(serializers_product.data)

    def post(self, request, pk):

        customer = filter_user_by_customer(request.user)
        Cart.add(pk, customer)

        return Response("It's OK")


class CartView(APIView):

    permission_classes = [PermissionOrderCustomer]

    def get(self, request):
        customer = filter_user_by_customer(request.user)
        orders = Cart.get_all_orders(customer)
        if orders is not None:
            
            return Response({'products': SerializersOrderItem(Cart.get_all_orders(customer), many=True).data,
                                                             'price_total': Cart.get_total_price(customer)})

        return Response("You have no orders yet")
    

    def post(self, request):
        customer = filter_user_by_customer(request.user)

        all_orders = Cart.get_all_orders(customer)

        if all_orders is  None:
            return Response("You have no orders yet")

        price_total = Cart.get_total_price(customer)
        order = create_order(customer, price_total)

        for orderit in all_orders:
            orderit.ordered = True
            orderit.save()

        order.orderitem.add(*all_orders)
        order.save()

        serializers_order = SerializersOrder(order)

        return Response(serializers_order.data)
    
    def delete(self, request):

        Cart.clear()

        return Response('Cart is empty')
    

class OrderDetailView(APIView):

    permission_classes = [PermissionOrderCourier]

    def patch(self, request, pk):
        order_stat = get_object_or_404(OrderStatus, pk=pk)

        courier = filter_user_by_courier(request.user)

        order_stat.courier = courier

        updated_order_serializer = SerializersOrderStatusDetail(order_stat, data=request.data, partial=True)
        if updated_order_serializer.is_valid():

            updated_order_serializer.save()
            return Response(updated_order_serializer.data)

        return Response(
            updated_order_serializer.errors, status=status.HTTP_400_BAD_REQUEST
        )

        
