from django.urls import path
from . import views


urlpatterns = [
    path("", views.index),
    path("login/", views.index),
    path("cabinet/cart/", views.index),
    path("cabinet/list-of-deals/", views.index),
    path("cabinet/history-orders/", views.index),
    path("registration/", views.index),
    path('supplier/<int:pk>/', views.indexs)
]