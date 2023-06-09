# Generated by Django 4.2 on 2023-05-08 19:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0002_order_rename_countinstock_product_count_in_stock_and_more'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='shippingaddress',
            options={'verbose_name': 'shipping address', 'verbose_name_plural': 'shipping addresses'},
        ),
        migrations.RenameField(
            model_name='shippingaddress',
            old_name='postal_Code',
            new_name='country',
        ),
        migrations.RemoveField(
            model_name='shippingaddress',
            name='state',
        ),
        migrations.AddField(
            model_name='shippingaddress',
            name='postalCode',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
    ]
