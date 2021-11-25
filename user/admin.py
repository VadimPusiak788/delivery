from django.contrib import admin

from user.models import User, Customer, Courier, Location

admin.site.register(User)
admin.site.register(Customer)
admin.site.register(Courier)
admin.site.register(Location)
