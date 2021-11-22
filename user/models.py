from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MaxValueValidator, MinValueValidator, RegexValidator
import uuid
from django.conf import settings


class User(AbstractUser):

    is_customer = models.BooleanField(default=False)
    is_courier = models.BooleanField(default=False)


class Customer(models.Model):

    customer = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    city = models.CharField(max_length=125)
    rating = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)

    def __str__(self) -> str:
        return f'Customer {self.customer.username}'


class Courier(models.Model):

    FREE = 'FREE'
    PROCESS = 'PROCESS'
    FINISHED = 'FINISHED'

    EXECUTION_STATUS = [
        (FREE, "not has orders"),
        (PROCESS, "procesing order"),
        (FINISHED, "finished order"),
    ]

    performer_status_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    courier = models.OneToOneField(User, on_delete=models.CASCADE)
    status = models.CharField(
        max_length=10,
        choices=EXECUTION_STATUS,
        default=FREE
    )
    city = models.CharField(max_length=256)
    rating = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(10)], default=0)

    def __str__(self) -> str:
        return f'Courier {self.courier.first_name}'


class BlackListCourier(models.Model):

    user = models.ForeignKey(Courier, on_delete=models.DO_NOTHING)
    message = models.TextField()

    def __str__(self) -> str:
        return f'Black List Courier {self.user.user.username}'


class BlackListCustomer(models.Model):

    user = models.ForeignKey(Customer, on_delete=models.DO_NOTHING)
    message = models.TextField()
    email = models.EmailField()
    rating = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(10)])

    def __str__(self) -> str:
        return f'Black List Customer {self.user.username}'