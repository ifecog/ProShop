from django.urls import path
from base.views import product_views as views

urlpatterns = [
    path('', views.get_products, name='products'),
    
    path('create/', views.createProduct, name='create-product'),
    path('image-upload/', views.imageUpload, name='image-upload'),
    
    path('<str:pk>/reviews/', views.createProductReview, name='product-review'),
    path('top/', views.get_toprated_products, name='toprated-products'),
    path('<str:pk>/', views.get_product_detail, name='product-detail'),
    
    path('update/<str:pk>/', views.updateProduct, name='update-product'),
    path('delete/<str:pk>/', views.productDelete, name='product-delete'),
]
