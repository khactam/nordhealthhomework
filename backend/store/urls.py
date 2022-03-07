from django.urls import re_path
from store import views

urlpatterns = [
    re_path(r'^store$', views.productApi),
    re_path(r'^store/([0-9]+)$', views.productApi)
]
