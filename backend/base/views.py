from django.shortcuts import render
from django.http import JsonResponse
from .products import products

# Create your views here.


def get_routes(request):
    return JsonResponse('Hello', safe=False)


def get_products(request):
    return JsonResponse(products, safe=False)
