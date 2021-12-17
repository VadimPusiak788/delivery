from rest_framework import serializers
from rest_auth.registration.serializers import RegisterSerializer
from rest_framework.authtoken.models import Token
from django.contrib.auth.password_validation import validate_password

from user.models import Customer, Courier, Location, User


class SerializersLocation(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = '__all__'


class CustomerCustomRegistrationSerializer(RegisterSerializer):

    customer = serializers.PrimaryKeyRelatedField(read_only=True,)
    city = serializers.CharField()
    street = serializers.CharField()
    password1 = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    def get_cleaned_data(self):
        data = super(CustomerCustomRegistrationSerializer, self).get_cleaned_data()
        extra_data = {
            'city'   : self.validated_data.get('city'),
            'street'   : self.validated_data.get('street')
        }

        data.update(extra_data)

        return data

    def save(self, request):
        user = super(CustomerCustomRegistrationSerializer, self).save(request)
        user.is_customer = True
        loc = Location.objects.create(city=self.cleaned_data.get('city'), street=self.cleaned_data.get('street'))
        loc.save()
        user.save()
        seller = Customer(customer=user, location=loc)
        seller.save()
        return user


class CourierCustomRegistrationSerializer(RegisterSerializer):

    is_courier = serializers.PrimaryKeyRelatedField(read_only=True,)
    city = serializers.CharField()
    street = serializers.CharField()
    password1 = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    def get_cleaned_data(self):
        data = super(CourierCustomRegistrationSerializer, self).get_cleaned_data()
        extra_data = {
            'city'   : self.validated_data.get('city'),
            'street'   : self.validated_data.get('street')
        }
        data.update(extra_data)

        return data

    def save(self, request):
        user = super(CourierCustomRegistrationSerializer, self).save(request)
        user.is_courier = True
        loc = Location.objects.create(city=self.cleaned_data.get('city'), street=self.cleaned_data.get('street'))
        loc.save()
        user.save()
        buyer = Courier(courier=user, location=loc)
        buyer.save()

        return user 

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields=("username", "first_name", "last_name", "email")

class SerailizersCustomerMe(serializers.ModelSerializer):

    class Meta:
        model = Customer
        fields = '__all__'
    
    def to_representation(self, instance):
        response = super().to_representation(instance)
        response["user"] = UserSerializer(instance.customer.customer).data
        return response


class SerailizersCourierMe(serializers.ModelSerializer):

    class Meta:
        model = Courier
        fields = '__all__'
    
    def to_representation(self, instance):
        response = super().to_representation(instance)
        response["user"] = UserSerializer(instance.courier.courier).data
        return response

class SerailizersCustomer(serializers.ModelSerializer):

    class Meta:
        model = Customer
        fields = '__all__'



class SerailizersCourier(serializers.ModelSerializer):

    class Meta:
        model = Courier
        fields = '__all__'

