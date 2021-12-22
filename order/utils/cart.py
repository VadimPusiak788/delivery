from django.shortcuts import get_object_or_404

from decimal import Decimal
from django.conf import settings
from order.models import OrderItem, Product
from order.utils.query import filter_order_item_user__ordered


class Cart:

    @staticmethod
    def add(product_id, user):

        product = get_object_or_404(Product, pk=product_id)
        order_item, created = OrderItem.objects.get_or_create(product=product, customer=user, ordered=False)

        if not created:
            order_item.quantity += 1
            order_item.save()

    @staticmethod
    def remove(order_item_id, user):
        get_object_or_404(OrderItem, pk=order_item_id, customer=user).delete()
    
    @staticmethod
    def clear(user):
        filter_order_item_user__ordered(user).delete()

    @staticmethod     
    def get_all_orders(user):
        orders = filter_order_item_user__ordered(user)
        if len(orders) >= 1:
            return orders
        return None


    def get_total_price(user):
        orders = Cart.get_all_orders(user)
        return str(sum(Decimal(order.product.price) * order.quantity for order in orders))
      
