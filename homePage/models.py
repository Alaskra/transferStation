from django.db import models

class MyText(models.Model):
    text=models.TextField()

class MyFile(models.Model):
    name = models.CharField(max_length=255)
    content = models.FileField()
