from django.db import models

# Create your models here.

class Product(models.Model):
    Id = models.AutoField(primary_key=True)
    Name = models.CharField(max_length=500)
    BarCode = models.IntegerField()

class Cart(models.Model):
    Id = models.AutoField(primary_key=True)

class CartItem(models.Model):
    Id = models.AutoField(primary_key=True)
    Product = models.ForeignKey(Product, on_delete=models.CASCADE)
    Cart = models.ForeignKey(Cart, on_delete=models.CASCADE)