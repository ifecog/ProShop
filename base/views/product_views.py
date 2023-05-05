from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.response import Response

from base.models import Product
from base.serializers import ProductSerializer
# from .products import products


# Create your views here.
@api_view(['GET'])
def get_products(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    
    return Response(serializer.data)


@api_view(['GET'])
def get_product_detail(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)
    
    return Response(serializer.data)
