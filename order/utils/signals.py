from django.db.models.signals import post_save
from django.dispatch import receiver
from order.models import Order, OrderStatus


@receiver(post_save, sender=Order)
def create_order_status(sender, instance, created, **kwargs):
    if created:
        OrderStatus.objects.create(order=instance)