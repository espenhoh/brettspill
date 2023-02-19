# views.py
# from django.contrib.auth.forms import UserCreationForm
# from django.contrib import messages
from django.utils.timezone import datetime
import re
from django.http import HttpResponse
from django.shortcuts import render, redirect, reverse
from lobby.forms import SpillerRegistreringForm
# from django.contrib.auth.views import LoginView, LogoutView
from django.views import View
from django.views.generic import TemplateView
# REST things
from rest_framework.views import APIView
from rest_framework import viewsets, generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from lobby.models import Spiller, Spill
from lobby.serializers import RegisterSerializer
from lobby.serializers import SpillSerializer
from lobby.serializers import SpillerSerializer


class HomeView(TemplateView):
    template_name = "brettspill/index.html"

    def dispatch(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            return redirect('members:members-home')
        return super(HomeView, self).dispatch(request, *args, **kwargs)


class RegisterView(generics.CreateAPIView):
    queryset = Spiller.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer


class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()

            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class SpillerViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Spiller.objects.all().order_by('-date_joined')
    serializer_class = SpillerSerializer
    permission_classes = [IsAuthenticated]


class SpillViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Spill.objects.all()
    serializer_class = SpillSerializer
    permission_classes = []
