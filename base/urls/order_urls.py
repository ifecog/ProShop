from django.urls import path
from base.views import order_views as views

urlpatterns = [
    path('', views.getOrders, name='orders'),
    path('add/', views.addOrderItems, name='add-order'),
    path('myorders/', views.getMyOrders, name='my-orders'),
    path('<str:pk>/', views.getOrderbyId, name='user-order'),
    path('<str:pk>/pay/', views.updateOrderToPaid, name='update-payment'),
    path('<str:pk>/deliver/', views.updateOrderToDelivered, name='update-delivery'),
]
