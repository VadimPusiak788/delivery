from rest_framework import serializers

from order.models import Product, Supplier
from user.serializers import SerializersLocation


class SerializersSupplier(serializers.ModelSerializer):
    products = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='name'
    )

    location = SerializersLocation(read_only=True)

    class Meta:

        model = Supplier
        fields = ('name', 'location', 'products')



class SerializersProduct(serializers.ModelSerializer):
    
    class Meta:

        model = Product
        fields = ('name', 'description', 'price')