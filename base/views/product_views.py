from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response

from base.models import Product, Review
from base.serializers import ProductSerializer
from rest_framework import status

from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

# Create your views here.
@api_view(['GET'])
def get_products(request):
    query = request.query_params.get('keyword')
    
    if query == None:
        query = ''
    
    products = Product.objects.filter(name__icontains=query)
    
    paginator = Paginator(products, 4)
    page = request.query_params.get('page')
    
    try:
        products = paginator.page(page)
    except PageNotAnInteger:
        products = paginator.page(1)
    except EmptyPage:
        products = paginator.page(paginator.num_pages)
        
    if page == None:
        page = 1
    
    page = int(page)
    
    serializer = ProductSerializer(products, many=True)
    
    return Response({'products': serializer.data, 'page': page, 'pages': paginator.num_pages})


@api_view(['GET'])
def get_toprated_products(request):
    products = Product.objects.filter(rating__gte=4).order_by('-rating')[0:5]
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)



@api_view(['GET'])
def get_product_detail(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)
    
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):
    user = request.user
    product = Product.objects.create(
        user=user,
        name='Sample Name',
        price=0,
        brand='Sample Brand',
        count_in_stock=0,
        category='Sample Category',
        description='',
    )
    serializer = ProductSerializer(product, many=False)
    
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request, pk):
    product = Product.objects.get(_id=pk)
    data = request.data
    
    # update fields
    product.name=data['name']
    product.description=data['description']
    product.price=data['price']
    product.brand=data['brand']
    product.category=data['category']
    product.count_in_stock=data['count_in_stock']
    
    serializer = ProductSerializer(product, many=False)
    
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def productDelete(request, pk):
    product_delete = Product.objects.get(_id=pk)
    product_delete.delete()
    
    return Response('Product was successfully deleted')


@api_view(['POST'])
def imageUpload(request):
    data = request.data
    
    product_id = data['product_id']
    product = Product.objects.get(_id=product_id)
    
    product.image = request.FILES.get('image')
    product.save()
    
    return Response('Image was successfully uploaded!')


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request, pk):
    user = request.user
    product = Product.objects.get(_id=pk)
    data = request.data
    
    # 1. Review already exists from a customer
    already_exists = product.review_set.filter(user=user).exists()
    
    if already_exists:
        message = {'detail': 'Product already reviewed by user'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    
    # 2. No rating or 0 rating
    elif data['rating'] == 0:
        message = {'detail': 'Please select a rating'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    
    # 3. Create rating
    else:
        review = Review.objects.create(
            user=user,
            product=product,
            name=user.first_name,
            rating=data['rating'],
            comment=data['comment'],            
        )
        
        reviews = product.review_set.all()
        product.num_reviews = len(reviews)
        
        total = 0
        for i in reviews:
            total += i.rating
            
        product.rating = total / len(reviews)
        product.save()
        
        return Response('Review Added')

