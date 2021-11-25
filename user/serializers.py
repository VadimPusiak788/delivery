from rest_framework import serializers
from rest_auth.registration.serializers import RegisterSerializer
from rest_framework.authtoken.models import Token
from django.contrib.auth.password_validation import validate_password

from user.models import Customer, Courier, Location


class CustomerCustomRegistrationSerializer(RegisterSerializer):

    customer = serializers.PrimaryKeyRelatedField(read_only=True,)
    city = serializers.CharField(required=True)
    email = serializers.EmailField(required=True)
    password1 = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    def get_cleaned_data(self):
        data = super(CustomerCustomRegistrationSerializer, self).get_cleaned_data()
        extra_data = {
            'city' : self.validated_data.get('city', ''),
            'email' : self.validated_data.get('email'),

            }
        data.update(extra_data)
        return data

    def save(self, request):
        user = super(CustomerCustomRegistrationSerializer, self).save(request)

        user.is_customer = True
        user.email = self.cleaned_data.get('email')
        user.save()
        seller = Customer(customer=user, city=self.cleaned_data.get('city'))
        seller.save()
        return user


class CourierCustomRegistrationSerializer(RegisterSerializer):

    is_courier = serializers.PrimaryKeyRelatedField(read_only=True,) #by default allow_null = False
    city = serializers.CharField(required=True)
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    def get_cleaned_data(self):
        data = super(CourierCustomRegistrationSerializer, self).get_cleaned_data()
        extra_data = {
            'city'   : self.validated_data.get('city')
        }
        data.update(extra_data)

        return data

    def save(self, request):
        user = super(CourierCustomRegistrationSerializer, self).save(request)
        user.is_courier = True
        
        user.save()
        buyer = Courier(courier=user, city=self.cleaned_data.get('city'))
        buyer.save()

        return user


class SerializersLocation(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = '__all__'
