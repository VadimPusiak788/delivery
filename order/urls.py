from django.urls import path

from order.views import  ListSupllierView, DetailProductView


urlpatterns = [
    path('product/detail/<int:pk>/', DetailProductView.as_view(), name='detail_product'),
    path('list/supplier/', ListSupllierView.as_view())
]