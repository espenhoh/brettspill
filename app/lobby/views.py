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
from rest_framework import viewsets, generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from lobby.models import Spiller, Spill
from lobby.serializers import RegisterSerializer
from lobby.serializers import SpillSerializer
from lobby.serializers import SpillerSerializer


# To send emails
from django.core.mail import send_mail
from django.conf import settings


# Create your views here.
def index(request):
    return render(request, 'brettspill/index.html')


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


class RegisterView2(View):
    def get(self, request):
        form = {'form': SpillerRegistreringForm()}
        return render(request, 'lobby/register.html', form)

    def post(self, request):
        form = SpillerRegistreringForm(request.POST)
        if form.is_valid():
            form.save()
            self._send_velkomstepost(form)
            return redirect(reverse("login"))
        else:
            return render(request, "lobby/register.html", {"form": form})

    def _send_velkomstepost(form):
        subject = 'Brettspillregistrering'
        message = 'Hei! Takk for at du registrerte deg hos holtebu.eu brettspill.'
        email_from = settings.EMAIL_HOST_USER
        recipient_list = ['espenhoh@gmail.com', ]
        send_mail(subject, message, email_from, recipient_list)
        # return redirect('redirect to a new page')


def hello_there(request, name):
    now = datetime.now()
    formatted_now = now.strftime("%A, %d %B, %Y at %X")

    # Filter the name argument to letters only using regular expressions. URL arguments
    # can contain arbitrary text, so we restrict to safe characters only.
    match_object = re.match("[a-zA-Z]+", name)

    if match_object:
        clean_name = match_object.group(0)
    else:
        clean_name = "Friend"

    content = "Hello there, " + clean_name + "! It's " + formatted_now
    return HttpResponse(content)


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
