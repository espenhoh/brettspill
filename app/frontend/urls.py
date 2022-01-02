from django.urls import path
from .views import test, index

urlpatterns = [
    path('', index),
    path('test', test),
]
