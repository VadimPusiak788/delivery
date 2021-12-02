from rest_framework import serializers

from order.models import Product, Supplier
from user.serializers import SerializersLocation


class SerializersSupplier(serializers.ModelSerializer):

    location = SerializersLocation(read_only=True)
    products = serializers.HyperlinkedRelatedField(
        many=True,
        read_only=True,
        view_name='detail_product'
    )

    class Meta:

        model = Supplier
        fields = ('name', 'location', 'products')



class SerializersProduct(serializers.ModelSerializer):
    
    class Meta:

        model = Product
        fields = ('name', 'description', 'price')