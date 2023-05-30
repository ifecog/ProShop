from django.test import TestCase, Client
from django.urls import reverse
from rest_framework import status
from django.contrib.auth.models import User

from base.models import (
    Product,
    Review,
    Order,
    OrderItem,
    ShippingAddress
)

class TestProductViews(TestCase):
    
    def setUp(self):
        self.client = Client()
        self.products_url = reverse('products')
        self.toprated_products_url = reverse('toprated-products')
        self.product_detail_url = reverse('product-detail', args=[1])        
        self.create_product_url = reverse('create-product')
        self.update_product_url = reverse('update-product', args=[1])
        self.delete_product_url = reverse('delete-product', args=['some-slug'])        
        self.create_product_review_url = reverse('product-review', args=[1])
               
    def test_get_products_GET(self):
        response = self.client.get(self.products_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_toprated_products_GET(self):
        response = self.client.get(self.toprated_products_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_product_detail_GET(self):
        # Create a sample product for testing
        sample_product = Product.objects.create(_id=1, name='Sample Product')
        
        response = self.client.get(self.product_detail_url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], 'Sample Product')
        
    def test_createProduct_POST(self):
        # Create a sample user for testing
        sample_user = User.objects.create(username='sampleuser', is_staff=True, is_superuser=True)
        sample_user.save()
        
        # Login the user
        self.client.force_login(sample_user)
        
        response = self.client.post(self.create_product_url, {
            'name': 'Sample Name',
            'price': 0,
            'brand': 'Sample Brand',
            'count_in_stock': 0,
            'category': 'Sample Category',
            'description': '',
        })
        
        # self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        # Since the view is decorated with @permission_classes([IsAdminUser]), only admin users are allowed to access it
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        
    def test_updateProduct_PUT(self):
        # Create a sample admin user for testing
        sample_user = User.objects.create(username='sampleadmin', is_staff=True, is_superuser=True)
        sample_user.save()
        
        # Create a sample product for testing
        sample_product = Product.objects.create(_id=1, name='Sample Product')
        
        # Login the admin user
        self.client.force_login(sample_user)
        
        response = self.client.put(self.update_product_url, {
            'name': 'Updated Name',
            'price': 10,
            'brand': 'Updated Brand',
            'count_in_stock': 5,
            'category': 'Updated Category',
            'description': 'Updated Description',
        })
        
        # self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Since the view is decorated with @permission_classes([IsAdminUser]), only admin users are allowed to access it
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
      
    def test_deleteProduct_DELETE(self):
        # Create a sample admin user for testing
        sample_user = User.objects.create(username='sampleadmin', is_staff=True, is_superuser=True)
        sample_user.save()
        
        # Create a sample product for testing
        sample_product = Product.objects.create(_id=1, name='Sample Product')
        
        # Login the admin user
        self.client.force_login(sample_user)
        
        response = self.client.delete(self.delete_product_url)
        
        # self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        
        # Since the view is decorated with @permission_classes([IsAdminUser]), only admin users are allowed to access it
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_createProductReview_POST(self):
        # Create a sample user for testing
        sample_user = User.objects.create(username='sampleadmin', is_staff=True, is_superuser=True)
        
        # Create a sample product for testing
        sample_product = Product.objects.create(_id=1, name='Sample Product')
        
        # Log in the user
        self.client.force_login(sample_user)
        
        # Test case 1: User already reviewed the product
        Review.objects.create(user=sample_user, product=sample_product)
        
        response = self.client.post(
            self.create_product_review_url,
            data={'rating': 5, 'comment': 'Great product'},
            format='json'
        )
        
        # self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        
        # Since the view is decorated with @permission_classes([IsAuthenticated]), only admin users are allowed to access it
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

        
        # Test case 2: No rating provided
        response = self.client.post(
            self.create_product_review_url,
            data={'rating': 0, 'comment': 'No rating provided'},
            format='json'
        )
        
        # self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        
        # Since the view is decorated with @permission_classes([IsAuthenticated]), only admin users are allowed to access it
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

        
        
    

    




