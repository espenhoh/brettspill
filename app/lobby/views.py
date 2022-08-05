# views.py
# from django.contrib.auth.forms import UserCreationForm
# from django.contrib import messages
from django.shortcuts import render, redirect, reverse
from .forms import SpillerRegistreringForm
# from django.contrib.auth.views import LoginView, LogoutView
from django.views import View

# To send emails
from django.core.mail import send_mail
from django.conf import settings


# Create your views here.
def index(request):
    return render(request, 'brettspill/index.html')


class RegisterView(View):
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
        message = 'Hei ! Takk for at du registrerte deg hos holtebu.eu brettspill.'
        email_from = settings.EMAIL_HOST_USER
        recipient_list = ['espenhoh@gmail.com', ]
        send_mail(subject, message, email_from, recipient_list)
        # return redirect('redirect to a new page')
