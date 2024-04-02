from django.urls import path
from .views import create_alphabet, practica1, compare_strings, create_lenguaje, calculate_power, validateComplex

urlpatterns = [
            path('', practica1, name='practica1'),
            path('create_alphabet/', create_alphabet, name='create_alphabet'),
            path('compare_strings/', compare_strings, name='compare_strings'),
            path('create_lenguaje/', create_lenguaje, name='create_lenguaje'),
            path('calculate_power/', calculate_power, name='calculate_power'),
            path('validateComplex/', validateComplex, name='validateComplex'),
            ]
