from pickle import FALSE, TRUE
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from store.models import Product, Cart, CartItem
from store.serializers import ProductSerializer, CartSerializer, CartItemSerializer

# Create your views here.


@csrf_exempt
def productApi(request, id=0):
    if request.method == 'GET':
        products = Product.objects.all()
        products_serializer = ProductSerializer(products, many=TRUE)
        return JsonResponse(products_serializer.data, safe=False)
    elif request.method == 'POST':
        product_data = JSONParser().parse(request)
        products_serializer = ProductSerializer(data=product_data)
        if products_serializer.is_valid():
            products_serializer.save()
            return JsonResponse("Post success", safe=False)
        return JsonResponse("Post failed", safe=False)
    elif request.method == 'PUT':
        product_data = JSONParser().parse(request)
        product = Product.objects.get(Id=product_data['Id'])
        products_serializer = ProductSerializer(product, data=product_data)
        if products_serializer.is_valid():
            products_serializer.save()
            return JsonResponse("Update successfully", safe=False)
        return JsonResponse("Update failed", safe=False)
    elif request.method == 'DELETE':
        product = Product.objects.get(Id=id)
        product.delete()
        return JsonResponse("Deleted successfully", safe=False)


@csrf_exempt
def cartApi(request, id=0):
    if request.method == 'GET':
        cart = Cart.objects.filter(Id=id)
        cart_serializer = CartSerializer(cart, many=FALSE)
        return JsonResponse(cart_serializer.data, safe=False)
    elif request.method == 'POST':
        cart_data = JSONParser().parse(request)
        cart_serializer = CartSerializer(data=cart_data)
        if cart_serializer.is_valid(raise_exception=True):
            cart_serializer.save()
            return JsonResponse({'status': "Post success", 'cart': cart_serializer.data}, safe=False)
        return JsonResponse("Post failed", safe=False)


@csrf_exempt
def cartItemsApi(request, id=0):
    if request.method == 'GET':
        cartItems = CartItem.objects.filter(
            Cart_id=id).select_related('Product')
        cartitems_serializer = CartItemSerializer(cartItems, many=TRUE)
        return JsonResponse(cartitems_serializer.data, safe=False)
    elif request.method == 'POST':
        cart_item_data = JSONParser().parse(request)
        isCartExisted = Cart.objects.filter(
            pk=cart_item_data["Cart_id"]).exists()
        isProductExisted = Product.objects.filter(
            pk=cart_item_data["Product_id"]).exists()
        if isCartExisted and isProductExisted:
            new_cart_item = CartItem.objects.create(
                Cart_id=cart_item_data["Cart_id"], Product_id=cart_item_data["Product_id"])
            new_cart_item.save()
            return JsonResponse("Post successfully", safe=False)
        return JsonResponse("Post failed", safe=False)
    elif request.method == 'DELETE':
        cart_item = CartItem.objects.get(Id=id)
        cart_item.delete()
        return JsonResponse("Deleted successfully", safe=False)
