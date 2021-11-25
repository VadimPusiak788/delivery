class OrderSessionManager:

    def __init__(self, request) -> None:
        self.request = request

    def get_order_id(self):
        return self.request.session.get('order_id', None)

    def set_order_id_if_not_exsit(self, order_id, forced=False):

        if self.get_order_id(order_id) or not forced:
            return 
        self.request.session['order_id'] = order_id