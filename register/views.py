# views.py
from django.contrib.auth.forms import UserCreationForm
from django.shortcuts import render, redirect, reverse
from .forms import RegisterForm
from django.contrib.auth.views import LoginView, LogoutView
from django.views import View


# Create your views here.
class RegisterView(View):
    def get(self,request):
        return render(request, 'register/register.html', {'form':UserCreationForm()})

    def post(self, request):
        form = RegisterForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect(reverse("login"))
        else:
            return render(request, "register/register.html", {"form":form})
