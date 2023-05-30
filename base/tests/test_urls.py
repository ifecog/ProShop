from django.test import SimpleTestCase
from django.urls import resolve, reverse
from base.views.product_views import (
    get_products,
    createProduct,
    imageUpload,
    createProductReview,
    get_toprated_products,
    get_product_detail,
    updateProduct,
    productDelete
)
from base.views.order_views import (
   getOrders,
   addOrderItems,
   getMyOrders,
   getOrderbyId,
   updateOrderToPaid,
   updateOrderToDelivered 
)

class TestProductUrls(SimpleTestCase):
    
    def test_products_url_is_resolved(self):
        url = reverse('products')
        self.assertEquals(resolve(url).func, get_products)

    def test_create_product_url_is_resolved(self):
        url = reverse('create-product')
        self.assertEquals(resolve(url).func, createProduct)

    def test_image_upload_url_is_resolved(self):
        url = reverse('image-upload')
        self.assertEquals(resolve(url).func, imageUpload)

    def test_product_review_url_is_resolved(self):
        url = reverse('product-review', args=['some-slug'])
        self.assertEquals(resolve(url).func, createProductReview)

    def test_toprated_products_url_is_resolved(self):
        url = reverse('toprated-products')
        self.assertEquals(resolve(url).func, get_toprated_products)

    def test_product_detail_url_is_resolved(self):
        url = reverse('product-detail', args=['some-slug'])
        self.assertEquals(resolve(url).func, get_product_detail)

    def test_update_product_url_is_resolved(self):
        url = reverse('update-product', args=['some-slug'])
        self.assertEquals(resolve(url).func, updateProduct)

    def test_product_delete_url_is_resolved(self):
        url = reverse('product-delete', args=['some-slug'])
        self.assertEquals(resolve(url).func, productDelete)


class TestOrderUrls(SimpleTestCase):
    
    def test_orders_url_is_resolved(self):
        url = reverse('orders')
        self.assertEquals(resolve(url).func, getOrders)

    def test_add_orders_url_is_resolved(self):
        url = reverse('add-order')
        self.assertEquals(resolve(url).func, addOrderItems)

    def test_my_orders_url_is_resolved(self):
        url = reverse('my-orders')
        self.assertEquals(resolve(url).func, getMyOrders)

    def test_update_payment_delete_url_is_resolved(self):
        url = reverse('user-order', args=['some-slug'])
        self.assertEquals(resolve(url).func, getOrderbyId)

    def test_update_payment_delete_url_is_resolved(self):
        url = reverse('update-payment', args=['some-slug'])
        self.assertEquals(resolve(url).func, updateOrderToPaid)

    def test_update_delivery_delete_url_is_resolved(self):
        url = reverse('update-delivery', args=['some-slug'])
        self.assertEquals(resolve(url).func, updateOrderToDelivered)



