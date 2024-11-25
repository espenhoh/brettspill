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
# from django.contrib import admin
import lobby.views as views
from django.views.generic.base import RedirectView

from django.urls import re_path, path, include
from .routers import OptionalSlashRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

router = OptionalSlashRouter()
router.register(r'spiller', views.SpillerViewSet)
# router.register(r'groups', views.GroupViewSet)
router.register(r'spill', views.SpillViewSet, basename='spill')

urlpatterns = [
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', views.LogoutView.as_view(), name='auth_logout'),
    path('register/', views.RegisterView.as_view(), name='auth_register'),
    path('', include(router.urls)),
    # path('home/', RedirectView.as_view(url='/static/lobby/index.html')),
    # re_path(r'^home/(?P<path>.*)$', RedirectView.as_view(url='static/lobby/index.html')),
]
