from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Product
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from typing import Dict, Any


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs: Dict[str, Any]) -> Dict[str, str]:
        data = super().validate(attrs)

        data['username'] = self.user.username
        data['email'] = self.user.email

        return data
