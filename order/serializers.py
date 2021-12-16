from rest_framework import serializers

from order.models import Order, OrderItem, OrderStatus, Product, Supplier
from user.serializers import SerializersLocation, SerailizersCustomer, SerailizersCourier



class SerializersListSupplier(serializers.ModelSerializer):
    location = SerializersLocation(read_only=True)

    class Meta:
        model = Supplier
        fields = ('id', 'name', 'location')


class SerializersProduct(serializers.ModelSerializer):
    
    class Meta:

        model = Product
        fields = ('id', 'name', 'description', 'price')


class SerializersSupplier(serializers.ModelSerializer):

    location = SerializersLocation(read_only=True)
    products = SerializersProduct(many=True)

    class Meta:

        model = Supplier
        fields = ('id', 'name', 'location', 'products')

class SerializersOrderItem(serializers.ModelSerializer):
    
    product = serializers.SlugRelatedField(
        read_only=True,
        slug_field='name'
    )

    class Meta:
        model = OrderItem
        fields = ('id', 'quantity', 'product')


class SerializersOrder(serializers.ModelSerializer):

    orderitem = SerializersOrderItem(many=True)
    customer = SerailizersCustomer(read_only=True)

    class Meta:
        model = Order
        fields = ('customer', 'orderitem', 'total')


class SerializersOrderStatus(serializers.ModelSerializer):

    date_create = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")
    courier = SerailizersCourier()
    order = SerializersOrder()


    class Meta:
        model = OrderStatus
        fields = ('id', 'order', 'status', 'courier', 'date_create')


class SerializersOrderStatusDetail(serializers.ModelSerializer):

    date_create = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")
    order = SerializersOrder(read_only=True)

    class Meta:
        model = OrderStatus
        fields = ('status', 'date_create', 'order')
    
    