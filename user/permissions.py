from rest_framework import permissions


class PermissionOrderCustomer(permissions.BasePermission):

    def has_permission(self, request, view):

        if request.user.is_customer:
            return True

        return False


class PermissionOrderCourier(permissions.BasePermission):

    def has_permission(self, request, view):

        if request.user.is_courier:
            return True        

        return False
        