from django.urls import path

from order.views import ListProductView, ListSupllierView


urlpatterns = [
    path('list/product/', ListProductView.as_view()),
    path('list/supplier/', ListSupllierView.as_view())
]