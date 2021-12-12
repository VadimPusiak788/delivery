from django.db import models
from django.utils import timezone

from user.models import Customer, Courier, Location


class Supplier(models.Model):

    name = models.CharField(max_length=256, unique=True)
    location = models.ForeignKey(Location, on_delete=models.DO_NOTHING)

    def __str__(self) -> str:
        return f'Supplier {self.name}'


class Product(models.Model):

    supplier = models.ForeignKey(Supplier, related_name='products', on_delete=models.DO_NOTHING)
    name = models.CharField(max_length=256)
    description = models.TextField()
    price = models.DecimalField(max_digits=8, decimal_places=2)

    def __str__(self) -> str:

        return f'Product {self.name}'


class OrderItem(models.Model):

    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    customer = models.ForeignKey(Customer, on_delete=models.DO_NOTHING)
    ordered = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        if not self.id:
            self.date_create = timezone.now()
        self.date_create = timezone.now()
        return super(OrderItem, self).save(*args, **kwargs)

    def __str__(self) -> str:

        return f'Product {self.product.name} -> {self.quantity}'


class Order(models.Model):

    customer = models.ForeignKey(Customer, on_delete=models.DO_NOTHING)
    total = models.DecimalField(max_digits=8, decimal_places=2)
    orderitem = models.ManyToManyField(OrderItem)

    def __str__(self) -> str:
        
        return f'Order courier to costumer {self.customer}'


class OrderStatus(models.Model):

    CREATED = 'CREATED'
    ACCEPT = 'ACCEPT'
    FINISHED = 'FINISHED'

    STATUS_ORDER = [
        (CREATED, "Creat order"),
        (ACCEPT, "Accept order"),
        (FINISHED, 'Finished order')
    ]

    status = models.CharField(
        max_length=25,
        choices=STATUS_ORDER,
        default=CREATED
        )
    
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    date_create = models.DateTimeField(auto_now_add=True)
    courier = models.ForeignKey(Courier, on_delete=models.DO_NOTHING, null=True, blank=True)


    class Meta:
        verbose_name_plural = 'Order Status'


    def __str__(self) -> str:

        return f'Order status {self.status}'


