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
from base.views.user_views import (
    get_users,
    register_user,
    MyTokenObtainPairView,
    get_user_profile,
    update_user_profile,
    getUserById,
    updateUser,
    deleteUser
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


class TestUserUrls(SimpleTestCase):
    
    def test_users_url_is_resolved(self):
        url = reverse('users')
        self.assertEquals(resolve(url).func, get_users)

    def test_register_user_url_is_resolved(self):
        url = reverse('register')
        self.assertEquals(resolve(url).func, register_user)

    def test_login_user_url_is_resolved(self):
        url = reverse('token_obtain_pair')
        self.assertEquals(resolve(url).func.view_class, MyTokenObtainPairView)

    def test_user_profile_url_is_resolved(self):
        url = reverse('user-profile')
        self.assertEquals(resolve(url).func, get_user_profile)

    def test_update_profile_url_is_resolved(self):
        url = reverse('update-profile')
        self.assertEquals(resolve(url).func, update_user_profile)

    def test_get_user_url_is_resolved(self):
        url = reverse('get-user', args=['some-slug'])
        self.assertEquals(resolve(url).func, getUserById)

    def test_update_user_url_is_resolved(self):
        url = reverse('update-user', args=['some-slug'])
        self.assertEquals(resolve(url).func, updateUser)

    def test_delete_user_url_is_resolved(self):
        url = reverse('delete-user', args=['some-slug'])
        self.assertEquals(resolve(url).func, deleteUser)



