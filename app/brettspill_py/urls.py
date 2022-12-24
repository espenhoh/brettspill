"""brettspill_py URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from . import settings
from lobby import views

from django.contrib import admin
from django.urls import path, include
# from django.views.generic.base import RedirectView
from rest_framework import routers
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

router = routers.DefaultRouter()
router.register(r'users', views.SpillerViewSet)
router.register(r'groups', views.GroupViewSet)
router.register(r'spill', views.SpillViewSet)

urlpatterns = [
    # path(r'api/auth/', include('knox.urls')), 
    path('admin/', admin.site.urls),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path(r'lobby/', include(router.urls)),
    # path('lobby/', include('lobby.urls')),
    # path('', include('gomoku.urls')),
    # path('api/', include('api.urls')),
    # path('frontend/', include('frontend.urls')),
    # path('', RedirectView.as_view(url='lobby/')),
]

if settings.DEBUG:
    # Something
    pass
