from django.urls import path

from order.views import  (ListSupllierView, DetailProductView, DeleteSpecificOrder,
                             DetailSupplierView, CartView, OrderDetailView)


app_name='order'

urlpatterns = [
    path('product/detail/<int:pk>/', DetailProductView.as_view(), name='detail_product'),
    path('supplier/detail/<int:pk>/', DetailSupplierView.as_view(), name='supplier-detail'),
    path('list/supplier/', ListSupllierView.as_view()),
    path('customer/view_cart/', CartView.as_view()),
    path('courier/change_order/<int:pk>/', OrderDetailView.as_view(), name='orderstatus-detail'),
    path('customer/delete_order/<int:pk>/', DeleteSpecificOrder.as_view())
]