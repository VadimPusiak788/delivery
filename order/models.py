from django.db import models

from user.models import Customer, Courier, Location


class Supplier(models.Model):

    name = models.CharField(max_length=256, unique=True)
    location = models.ForeignKey(Location, on_delete=models.DO_NOTHING)

    def __str__(self) -> str:
        return f'Supplier {self.name}'

class OrderStatus(models.Model):
    
    CREATED = 'CREATED'
    ACCEPT = 'ACCEPT'
    INPROGREES = 'INPROGREES'
    FINISHED = 'FINISHED'

    STATUS_ORDER = [
        (CREATED, "Creat order"),
        (ACCEPT, "Accept order"),
        (INPROGREES, "In progress order"),
        (FINISHED, 'Finished order')
    ]

    status = models.CharField(
        max_length=25,
        choices=STATUS_ORDER,
        default=CREATED
        )
    date_create = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:

        return f'Order status {self.status}'

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

    def __str__(self) -> str:

        return f'Product {self.product.name} -> {self.quantity}'


class Order(models.Model):

    customer = models.ForeignKey(Customer, on_delete=models.DO_NOTHING)
    courier = models.ForeignKey(Courier, on_delete=models.DO_NOTHING, null=True, blank=True)
    orderitem = models.ManyToManyField(OrderItem)
    status = models.ForeignKey(OrderStatus, on_delete=models.DO_NOTHING)

    def __str__(self) -> str:
        
        return f'Order courier {self.courier} to costumer {self.customer}'


