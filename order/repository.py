from order.models import Order, Product, OrderItem


class OrderRepository:

    @staticmethod
    def get_or_create_order_by_id(order_id=None) -> Order:
        
        order = Order.objects.filter(id=order_id).first()

        if order is None:
            order = Order.objects.create()
            order.save()

        return order


    @classmethod
    def add_product_to_order(cls, product, quantity=1, order_id=None):

        order = cls.get_or_create_order_by_id(order_id)

        order_item = OrderItem.objects.create(quantity=quantity, product=product)

        order_item.save()

        order.orderitem.add(order_item)
        
        return order




