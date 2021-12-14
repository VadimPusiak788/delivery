from django.urls import path

from user.views import CourierRegistrationView, CustomerRegistrationView, UserProfileView, UserMeView, CouirerOffer

app_name = 'user'

urlpatterns = [
    path('registration/courier/', CourierRegistrationView.as_view(), name='register_courier'),
    path('registration/customer/', CustomerRegistrationView.as_view(), name='register_customer'),
    path('me/', UserMeView.as_view()),
    path('profile-order/', UserProfileView.as_view()),
    path('free_order/', CouirerOffer.as_view())
]