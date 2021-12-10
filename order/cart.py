from django.shortcuts import get_object_or_404

from decimal import Decimal
from django.conf import settings
from order.models import OrderItem, Product


class Cart:
    
    def __init__(self, request) -> None:
        
        self.session = request.session
        self.user_id = str(request.user.pk)

        cart = self.session.get(settings.CART_SESSION_ID + self.user_id)

        if not cart:
            cart = self.session[settings.CART_SESSION_ID + self.user_id] = {}
        self.cart = cart
    
    def add(self, product_id, quantity=1, override_quantity=False):

        product = get_object_or_404(Product, pk=product_id)
        order_item = OrderItem.objects.create(product=product)
        order_item_id = order_item.pk 

        if order_item_id not in self.cart:
            self.cart[order_item_id] = {'quantity': order_item.quantity,
            'price': str(order_item.product.price),
            'product': order_item.product.name}

        self.save()
    
    def save(self):
        self.session.modified = True

    def remove(self, order_item_id):

        if order_item_id in self.cart:
            
            del self.cart[order_item_id]
            self.save()
        
    def clear(self):
        for orders_id in self.cart:
            OrderItem.objects.filter(id=orders_id)
        del self.session[settings.CART_SESSION_ID + self.user_id]

        self.save()
    
    def get_total_price(self):
        return str(sum(Decimal(item['price']) * item['quantity'] for item in self.cart.values()))
    
    def get_all_product(self):
        return self.cart

    def get_all_orders(self):
        orders = []
        for orders_id in self.cart:
            orders.append(OrderItem.objects.get(id=orders_id))

        return orders        