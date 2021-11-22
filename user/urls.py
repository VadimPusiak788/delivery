from django.urls import path

from user.views import CourierRegistrationView, CustomerRegistrationView, GetUserView

app_name = 'user'

urlpatterns = [
    path('registration/courier/', CourierRegistrationView.as_view(), name='register_courier'),
    path('registration/customer/', CustomerRegistrationView.as_view(), name='register_customer'),
    path('test/', GetUserView.as_view())
]