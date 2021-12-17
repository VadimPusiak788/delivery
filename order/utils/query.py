from order.models import OrderItem, Order
from user.models import Customer, Courier


def filter_order_item_user__ordered(user):
    
    return OrderItem.objects.filter(customer=user, ordered=False)

def filter_user_by_customer(user):

    return Customer.objects.get(customer=user)

def filter_user_by_courier(user):

    return Courier.objects.get(courier=user)

def create_order(user, price_total):
    return Order.objects.create(customer=user, total=price_total)



