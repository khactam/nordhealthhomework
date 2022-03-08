from rest_framework import serializers
from store.models import Product, Cart, CartItem
from django.core.serializers.json import Serializer

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model=Product
        fields=('Id', 'Name', 'BarCode')

class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model=Cart
        fields = '__all__'

class CartItemSerializer(serializers.ModelSerializer):
    Product = ProductSerializer()
    class Meta:
        model=CartItem
        fields=('Id', 'Product_id', 'Cart_id', 'Product')

class CreateCartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model=CartItem
        fields=('Product_id', 'Cart_id')
