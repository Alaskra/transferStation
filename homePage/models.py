from django.db import models


class MyText(models.Model):
    text = models.TextField()


class MyImage(models.Model):
    img = models.FileField()


class MyFile(models.Model):
    name = models.CharField(max_length=255)
    content = models.FileField()


class MyAirportalFile(models.Model):
    name = models.CharField(max_length=255)
    content = models.FileField(upload_to='airportal')
    createTime = models.DateTimeField()
    hours = models.DurationField()
    downloads = models.IntegerField()  # 剩余下载次数
    pickupCode = models.CharField(max_length=6, unique=True)  # 六位的取件码数字
