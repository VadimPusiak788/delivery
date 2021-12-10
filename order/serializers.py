from rest_framework import serializers

from order.models import Order, OrderItem, OrderStatus, Product, Supplier
from user.serializers import SerializersLocation, SerailizersCustomer, SerailizersCourier


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


class SerializersListSupplier(serializers.HyperlinkedModelSerializer):
    location = SerializersLocation(read_only=True)

    class Meta:
        model = Supplier
        fields = ('url', 'name', 'location')


class SerializersProduct(serializers.ModelSerializer):
    
    class Meta:

        model = Product
        fields = ('name', 'description', 'price')


class SerializersOrderItem(serializers.ModelSerializer):
    
    product = serializers.SlugRelatedField(
        read_only=True,
        slug_field='name'
    )

    class Meta:
        model = OrderItem
        fields = ('quantity', 'product')


class SerializersOrder(serializers.ModelSerializer):

    orderitem = SerializersOrderItem(many=True)
    customer = SerailizersCustomer(read_only=True)

    class Meta:
        model = Order
        fields = ('customer', 'orderitem')


class SerializersOrderStatus(serializers.HyperlinkedModelSerializer):

    date_create = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")
    courier = SerailizersCourier()


    class Meta:
        model = OrderStatus
        fields = ('url', 'status', 'courier', 'date_create')


class SerializersOrderStatusDetail(serializers.ModelSerializer):

    date_create = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")
    order = SerializersOrder(read_only=True)

    class Meta:
        model = OrderStatus
        fields = ('status', 'date_create', 'order')
    
    
