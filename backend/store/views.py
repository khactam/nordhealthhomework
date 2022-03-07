from pickle import TRUE
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from store.models import Product
from store.serializers import ProductSerializer

# Create your views here.

@csrf_exempt
def productApi(request, id = 0):
    if request.method == 'GET':
        products = Product.objects.all()
        products_serializer = ProductSerializer(products, many = TRUE)
        return JsonResponse(products_serializer.data, safe=False)
    elif request.method == 'POST':
        product_data = JSONParser().parse(request)
        products_serializer = ProductSerializer(data = product_data)
        if products_serializer.is_valid():
            products_serializer.save()
            return JsonResponse("post success", safe=False)
        return JsonResponse("failed", safe=False)
    elif request.method == 'PUT':
        product_data = JSONParser().parse(request)
        product = Product.objects.get(Id = product_data['Id'])
        products_serializer = ProductSerializer(product, data = product_data)
        if products_serializer.is_valid():
            products_serializer.save()
            return JsonResponse("Update successfully", safe=False)
        return JsonResponse("Failed update", safe=False)
    elif request.method == 'DELETE':
        product = Product.objects.get(Id = id)
        product.delete()
        return JsonResponse("Deleted",safe=False)
