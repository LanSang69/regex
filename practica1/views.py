from ast import List
from django.shortcuts import render
from .src import regex
from django.http import JsonResponse

alphabet = {}

def practica1(request):
    return render(request, 'model.html')

def create_alphabet(request):
    userInput = request.POST['inputU']
    global alphabet  # Access the global variable
    alphabet = regex.generate_alphabet(userInput)
    print(alphabet)
    return JsonResponse({'alphabet': alphabet})

def compare_strings(request):
    string1 = request.POST['string1']
    string2 = request.POST['string2']
    result = regex.compare_strings(string1, string2, alphabet)
    print(result)
    return JsonResponse({'result': result})

def create_lenguaje(request):
    np = request.POST['np']
    l = request.POST['l']
    r = regex.generateLanguage(alphabet,np,l)
    print(r)
    return JsonResponse({'response': r})

def calculate_power(request):
    n = request.POST['n']
    result = regex.calculate_power(alphabet, n)
    return JsonResponse({"response": result})

def validateComplex(request):
    complexN = request.POST['complexN']
    result = regex.validComplex(complexN)
    return JsonResponse({"response": result})