import time
import suf_sub
import languages
import complex
from django.http import JsonResponse

print("--------------------------------------------------------------------")
print("\tBienvenido al generador de expresiones regulares")
print("--------------------------------------------------------------------")

time.sleep(1)
print("Por favor ingrese los terminos de tu alfabeto separados por coma: ")
inputU = input("-->")
alphabet = list()


if '-' in inputU:
    indexes = [i for i, char in enumerate(inputU) if char == '-']
    for i in indexes:
        if inputU[i-1].isdigit() and inputU[i+1].isdigit():
            left, right = int, int
            left = inputU[i-1]  
            right = inputU[i+1]
            for index in range(int(left), int(right)+1):
                if index not in alphabet:
                    alphabet.append(index)

        elif inputU[i-1].isalpha() and inputU[i+1].isalpha():
            left = inputU[i-1]
            right = inputU[i+1]
            for char in range(ord(left), ord(right)+1):
                if chr(char) not in alphabet:
                    alphabet.append(chr(char))
else:
    for char in inputU:
        if char.isdigit() or char.isalpha():
            alphabet.append(char)

print("\tSelecciona la opcion a realizar:")
opt = input("1. Comparar cadenas\n2. Generar lenguajes\n3. Potencia del alfabeto\n4. Implementación de expresión regular\n5. Ver alfabeto\n6. Salir\n-->")   

x = True
w1_declared = False
w2_declared = False
while x:
    if opt == "1":
        if not w1_declared:
            while True:
                w1 = input("cadena 1: ")
                if all(char in alphabet for char in w1):
                    w1_declared = True
                    break
                else:
                    print("La cadena 1 no pertenece al alfabeto")
            
        if w1_declared and not w2_declared:
            while True:
                w2 = input("cadena 2: ")
                if all(char in alphabet for char in w2):
                    w2_declared = True
                    break
                else:
                    print("La cadena 2 no pertenece al alfabeto")
        if(len(w1) < len(w2)):
            sufijoP = suf_sub.sufijoP(w1, w2)
            sufijoI = suf_sub.sufijoI(w1, w2)
            subcadena = suf_sub.subcadena(w1, w2)
            subsecuencia = suf_sub.subsecuencia(w1, w2)
            print("-----------------------------------------------------")
            print("Comparacion de cadenas: ")
            if sufijoP:
                print("La cadena 1 es sufijo propio de la cadena 2")
            if sufijoI:
                print("La cadena 1 es sufijo impropio de la cadena 2")
            if subcadena:
                print("La cadena 1 es subcadena de la cadena 2")
            if subsecuencia:
                print("La cadena 1 es subsecuencia de la cadena 2")
            if not sufijoP and not sufijoI and not subcadena and not subsecuencia:
                print("La cadena 1 no se relaciona con la cadena 2")
            print("----------------------------------------------------\n")
            time.sleep(3)
            print("\tSelecciona la opcion a realizar:")
        else:
            print(w1 + " es mas grande que " + w2)
            sufijoP = suf_sub.sufijoP(w1, w2)
            if sufijoP:
                print("La cadena 1 es sufijo propio de la cadena 2")
                time.sleep(2)

        opt = input("1. Comparar cadenas\n2. Generar lenguajes\n3. Potencia del alfabeto\n4. Analizar palabra bajo alfabeto\n5. Ver alfabeto\n6. Salir\n-->")   
    elif opt == "2":
        np = input("Numero de palabras a generar: ")
        l = input("Longitud de las palabras: ")

        L1 = languages.generate_words(alphabet, int(np), int(l))
        L2 = languages.generate_words(alphabet, int(np), int(l))

        print("-------------------")
        print("Lenguaje 1: ", L1)
        print("Lenguaje 2: ", L2)
        print("-------------------")

        L_difference = list(set(L1) - set(L2))
        
        print("-------------------")
        print("Lenguaje D: ", L_difference)
        print("-------------------")
        time.sleep(2)

        opt = input("1. Comparar cadenas\n2. Generar lenguajes\n3. Potencia del alfabeto\n4. Implementación de expresión regular\n5. Ver alfabeto\n6. Salir\n-->")      
        pass
    elif opt == "3":
        power = list()
        n = input("Potencia a calcular: ")
        if int(n) < -5 or int(n) > 5:
            print("No es valida esa potencia")
            break
        if int(n) < 0:
            print("No es posible hacer potencias negativas de un alfabeto")
        else:    
            power = languages.generate_powerL(alphabet, int(n))
            print("Potencia ", n, " del alfabeto: ", power)
            time.sleep(2)
            opt = input("1. Comparar cadenas\n2. Generar lenguajes\n3. Potencia del alfabeto\n4. Implementación de expresión regular\n5. Ver alfabeto\n6. Salir\n-->")   
            pass
    elif opt == "4":
        print("Implementación de expresión regular, validador de numeros complejos")
        print("Ejemplo: 3+4i")
        complexN = input("Ingresa tu número complejo: ")

        valid = complex.validateComplex(complexN)

        if(valid):
            print("Tu número complejo es válido")
        else:
            print("No es válido")
        time.sleep(2)
        opt = input("1. Comparar cadenas\n2. Generar lenguajes\n3. Potencia del alfabeto\n4. Implementación de expresión regular\n5. Ver alfabeto\n6. Salir\n-->")   
        pass
    elif opt == "5":
        print("Alfabeto: ", alphabet)
        print("\n")
        time.sleep(2)
        print("\tSelecciona la opcion a realizar:")
        opt = input("1. Comparar cadenas\n2. Generar lenguajes\n3. Potencia del alfabeto\n4. Implementación de expresión regular\n5. Ver alfabeto\n6. Salir\n-->")   
    elif opt == "6":  
        x = False
        print("Saliendo...")
    else:
        print("Invalid option. Please select a valid option.")
        opt = input("1. Comparar cadenas\n2. Generar lenguajes\n3. Potencia del alfabeto\n4. Implementación de expresión regular\n5. Ver alfabeto\n6. Salir\n-->")   