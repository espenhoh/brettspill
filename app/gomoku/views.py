from django.shortcuts import render


# Create your views here.
def startGomuku(request):
    return render(request, 'gomuku/index.html')


# Create your views here.
def startGomukuTest(request):
    return render(request, 'gomuku/test.html')
