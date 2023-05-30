from django.test import TestCase, Client
from django.urls import reverse
from base.models import (
    Product,
    Review,
    Order,
    OrderItem,
    ShippingAddress
)
import json

class TestProductViews(TestCase):
    
    def setUp(self):
        self.client = Client()
        self.products_url = reverse('products')
        self.toprated_products_url = reverse('toprated-products')
        self.product_detail_url = reverse('product-detail', args=[1])        
        self.create_product_url = reverse('create-product')
        self.update_product_url = reverse('update-product', args=[1])
        self.delete_product_url = reverse('delete-product', args=['some-slug'])        
        self.image_upload_url = reverse('image-upload')
               
    def test_get_products_GET(self):
        response = self.client.get(self.products_url)
        self.assertEquals(response.status_code, 200)

    def test_get_toprated_products_GET(self):
        response = self.client.get(self.toprated_products_url)
        self.assertEquals(response.status_code, 200)

    def test_get_product_detail_GET(self):
        response = self.client.get(self.product_detail_url)
        self.assertEquals(response.status_code, 200)

    # def test_createProduct_POST(self):
    #     response = self.client.post(self.create_product_url, {
    #         'user': 'Sample User',
    #         'name': 'Sample Name',
    #         'price': 0,
    #         'brand': 'Sample Brand',
    #         'count_in_stock': 0,
    #         'category': 'Sample Category',
    #         'description': '',
    #     })
    #     self.assertEquals(response.status_code, 401)
        
    # def test_updateProduct_PUT(self):
    #     response = self.client.put(self.update_product_url, {
    #         'user': 'Sample User',
    #         'name': 'Sample Name',
    #         'price': 0,
    #         'brand': 'Sample Brand',
    #         'count_in_stock': 0,
    #         'category': 'Sample Category',
    #         'description': '',
    #     })
    #     self.assertEquals(response.status_code, 401)
        
    # def test_deleteProduct_DELETE(self):
    #     response = self.client.delete(self.delete_product_url)
    #     self.assertEquals(response.status_code, 401)
        
    # def test_imageUpload_POST(self):
    #     response = self.client.post(self.image_upload_url)
    #     self.assertEquals(response.status_code, 401)
        
    

    




