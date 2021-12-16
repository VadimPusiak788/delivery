from django.shortcuts import render


def index(request):
    return render(request, 'frontend/index.html')

def indexs(request, pk):
    return render(request, 'frontend/index.html')