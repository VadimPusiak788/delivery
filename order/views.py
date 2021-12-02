from rest_framework import generics
from rest_framework.views import APIView
from rest_framework import authentication, permissions


from order.models import Product, Supplier
from order.serializers import SerializersProduct, SerializersSupplier
from order.services import MainServices

class DetailProductView(generics.RetrieveAPIView):

    queryset = Product.objects.all()
    serializer_class = SerializersProduct


class ListSupllierView(generics.ListAPIView):

    queryset = Supplier.objects.all()
    serializer_class = SerializersSupplier



