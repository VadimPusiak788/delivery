from rest_framework import generics
from rest_framework.views import APIView
from rest_framework import authentication, permissions


from order.models import Product, Supplier
from order.serializers import SerializersProduct, SerializersSupplier
from order.services import MainServices

class ListProductView(generics.ListAPIView):

    queryset = Product.objects.all()
    serializer_class = SerializersProduct


class ListSupllierView(generics.ListAPIView):

    queryset = Supplier.objects.all()
    serializer_class = SerializersSupplier


class AddProductToOrder(APIView):

    authentication_classes = [authentication.TokenAuthentication]

    permissions = [permissions.IsAuthenticated]

    def post(self, request):
        
        order = MainServices(request).execute()

