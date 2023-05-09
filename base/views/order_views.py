from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from base.models import Product, Order, OrderItem, ShippingAddress
from base.serializers import ProductSerializer

from rest_framework import status


@api_view(['POST'])
@permission_classes(['IsAuthenticated'])
def add_order_items(request):
    user = request.user
    data = request.data

    order_items = data['OrderItem']

    if order_items and len(order_items) == 0:
        message = {'detail': 'No Order Items'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

    else:
        # 1. create order
        order = Order.objects.create(
            user=user,
            payment_method=data['paymentMethod'],
            tax_price=data['taxFee'],
            shpping_price=data['shippingFee'],
            total_proce=data['totalFee'],

        )
        # 2. create shipping address
        # 3. create order items and set order to orderItem relationship
        # 4. update stock

    return Response('ORDER')
