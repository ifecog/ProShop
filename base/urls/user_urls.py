from django.urls import path
from base.views import user_views as views

urlpatterns = [
    path('', views.get_users, name='users '),
    path('register/', views.register_user, name='register'),
    path('login/', views.MyTokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path('profile/', views.getUserProfile, name='user-profile'),
]
