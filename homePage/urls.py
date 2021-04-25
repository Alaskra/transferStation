from django.urls import path, re_path
from . import views

urlpatterns = [
    path('', views.homePage),
    re_path(r'upload', views.upload, name='upload'),
    path('media/<fileName>', views.download),
    path('delete/<fileName>', views.delete),
]
