# views.py
from django.contrib.auth.forms import UserCreationForm
from django.shortcuts import render, redirect, reverse
from .forms import RegisterForm
# from django.contrib.auth.views import LoginView, LogoutView
from django.views import View


# Create your views here.
def index(request):
    return render(request, 'brettspill/index.html')


class RegisterView(View):
    def get(self, request):
        form = {'form': UserCreationForm()}
        return render(request, 'lobby/register.html', form)

    def post(self, request):
        form = RegisterForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect(reverse("login"))
        else:
            return render(request, "lobby/register.html", {"form": form})
