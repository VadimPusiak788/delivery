# Generated by Django 3.2.9 on 2021-12-09 19:30

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('order', '0008_auto_20211209_1927'),
    ]

    operations = [
        migrations.RenameField(
            model_name='order',
            old_name='all_price',
            new_name='total',
        ),
    ]
