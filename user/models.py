from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MaxValueValidator, MinValueValidator
import uuid
from django.conf import settings


class Location(models.Model):

    city = models.CharField(max_length=256)
    street = models.CharField(max_length=256)
    
    def __str__(self) -> str:
        return f'Location {self.city} -> {self.street}'

class User(AbstractUser):

    is_customer = models.BooleanField(default=False)
    is_courier = models.BooleanField(default=False)


class Customer(models.Model):

    customer = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    location = models.ForeignKey(Location, on_delete=models.DO_NOTHING, null=True, blank=True)

    def __str__(self) -> str:
        return f'Customer {self.customer.username}'


class Courier(models.Model):

    courier = models.OneToOneField(User, on_delete=models.CASCADE)
    location = models.ForeignKey(Location, on_delete=models.DO_NOTHING, null=True, blank=True)

    def __str__(self) -> str:
        return f'Courier {self.courier.first_name}'
