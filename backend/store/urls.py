from django.urls import re_path
from store import views

urlpatterns = [
    re_path(r'^store$', views.productApi),
    re_path(r'^store/([0-9]+)$', views.productApi),
    re_path(r'^store/cart$', views.cartApi),
    re_path(r'^store/cart/([0-9]+)$', views.cartApi),
    re_path(r'^store/cartItems$', views.cartItemsApi),
    re_path(r'^store/cartItems/([0-9]+)$', views.cartItemsApi)
]
