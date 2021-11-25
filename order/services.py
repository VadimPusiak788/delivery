from order.utils import OrderSessionManager
from order.repository import OrderRepository

class MainServices:

    def __init__(self, request) -> None:
        self.session_manager = OrderSessionManager(request)

    
    def _get_order_from_session(self):
        return self.session_manager.get_order_id()
    
    def _set_order_to_session(self, order_id):
        self.session_manager.set_order_id_if_not_exsit(order_id)
    
    def execute(self):
        order_id = self._get_order_from_session()
        order = OrderRepository.get_or_create_order_by_id(order_id)
        self._set_order_to_session(order_id)