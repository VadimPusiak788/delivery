from django.contrib import admin

from order.models import Order, Product, OrderItem, Supplier, OrderStatus

admin.site.register(Order)
admin.site.register(Product)
admin.site.register(OrderItem)
admin.site.register(Supplier)
admin.site.register(OrderStatus)