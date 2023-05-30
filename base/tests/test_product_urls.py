from django.test import SimpleTestCase
from django.urls import resolve, reverse
from base.views.product_views import get_products


class TestUrls(SimpleTestCase):
    
    def test_products_url_is_resolved(self):
        url = reverse('products')
        print(resolve(url))