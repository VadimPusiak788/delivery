from rest_framework import serializers
from rest_auth.registration.serializers import RegisterSerializer
from rest_framework.authtoken.models import Token
from django.contrib.auth.password_validation import validate_password

from user.models import Customer, Courier, Location


class SerializersLocation(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = '__all__'


class CustomerCustomRegistrationSerializer(RegisterSerializer):

    customer = serializers.PrimaryKeyRelatedField(read_only=True,)
    location = SerializersLocation()
    password1 = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    def save(self, request):
        user = super(CustomerCustomRegistrationSerializer, self).save(request)
        user.is_customer = True
        user.save()
        seller = Customer(customer=user)
        seller.save()
        return user


class CourierCustomRegistrationSerializer(RegisterSerializer):

    is_courier = serializers.PrimaryKeyRelatedField(read_only=True)
    location = SerializersLocation()
    password1 = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    def save(self, request):
        user = super(CourierCustomRegistrationSerializer, self).save(request)
        user.is_courier = True
        user.save()
        buyer = Courier(courier=user)
        buyer.save()

        return user


class SerailizersCustomer(serializers.ModelSerializer):

    class Meta:
        model = Customer
        fields = '__all__'


class SerailizersCourier(serializers.ModelSerializer):

    class Meta:
        model = Courier
        fields = '__all__'


