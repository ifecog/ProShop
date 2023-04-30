from django.contrib import admin
from .models import Product, Review, Order, OrderItem, ShippingAddress
from django.utils.html import format_html

# Register your models here.


class ProductAdmin(admin.ModelAdmin):
    def thumbnail(self, object):
        return format_html('<img src="{}" width="40" style="border-radius: 50px;" />'.format(object.image.url))

    thumbnail.short_description = 'photo'

    list_display = ('_id', 'thumbnail', 'name', 'brand',
                    'category', 'price', 'rating')
    list_display_links = ('name', 'thumbnail')
    search_fields = ['name', 'description', 'brand', 'category']


admin.site.register(Product, ProductAdmin)
admin.site.register(Review)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(ShippingAddress)
