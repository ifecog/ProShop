from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_routes, name='routes'),
    path('products/', views.get_products, name='products'),
    path('products/<str:pk>/', views.get_product_detail, name='product-detail'),
    path('user/profile/', views.getUserProfile, name='user-profile'),
    path('users/login/', views.MyTokenObtainPairView.as_view(),
         name='token_obtain_pair'),
]
