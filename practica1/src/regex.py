from .suf_sub import sufijoP, sufijoI, subcadena, subsecuencia
from .languages import generate_words, generate_powerL
from .complex import validateComplex
def generate_alphabet(input_str):
    alphabet = []

    if '-' in input_str:
        indexes = [i for i, char in enumerate(input_str) if char == '-']
        for i in indexes:
                left = input_str[i-1]
                right = input_str[i+1]
                for char in range(ord(left), ord(right)+1):
                    if chr(char) not in alphabet:
                        alphabet.append(chr(char))
    else:
        for char in input_str:
            if char.isdigit() or char.isalpha():
                alphabet.append(char)

    return alphabet

def compare_strings(w1, w2, alphabet):
    if not alphabet:
        return {"success": False, "message": "El alfabeto no está definido"}
    if not w1 and not w2:
        return {"success": False, "message": "Las cadenas no están definidas"}
    if not w1:
        return {"success": False, "message": "La cadena w1 no está definida"}
    if not w2:
        return {"success": False, "message": "La cadena w2 no está definida"}
    if not stringsLength(w1, w2):
        return {"success": False, "message": "La longitud de w1 debe ser menor o igual a la longitud de w2"}
    if not validate(alphabet, w1):
        return {"success": False, "message": "La cadena w1 no es parte del alfabeto"}
    if not validate(alphabet, w2):
        return {"success": False, "message": "La cadena w2 no es parte del alfabeto"}
    
    result = {
        "sufijoP": False,
        "sufijoI": False,
        "subcadena": False,
        "subsecuencia": False
    }
    
    if len(w1) < len(w2):
        result["sufijoP"] = sufijoP(w1, w2)
        result["sufijoI"] = sufijoI(w1, w2)
        result["subcadena"] = subcadena(w1, w2)
        result["subsecuencia"] = subsecuencia(w1, w2)
    else:
        result["sufijoP"] = sufijoP(w1, w2)
        result["subcadena"] = subcadena(w1, w2)
        result["subsecuencia"] = subsecuencia(w1, w2)
    
    if not any(result.values()):
        return {"success": False, "message": "No se relacionana entre si las cadenas"}
    
    return {"success": True, "result": result}

def validate(alphabet, w1):
    return all(char in alphabet for char in w1)

def stringsLength(w1, w2):
    return len(w1) <= len(w2)

def generateLanguage(alphabet, np, l):
    if not alphabet:
        return {"success": False, "message": "El alfabeto no ha sido creado"}
    
    if not np or not l:
        return {"success": False, "message": "Los valores np y l deben estar definidos"}
    
    L1 = generate_words(alphabet, int(np), int(l))
    L2 = generate_words(alphabet, int(np), int(l))
    LD = list(set(L1) - set(L2))
    return {"success": True, "L1": L1, "L2": L2, "LD": LD}

def calculate_power(alphabet, n):
    power = list()
    if not alphabet:
        return {"success": False, "message": "El alfabeto está vacío"}
    if not n:
        return {"success": False, "message": "El valor de la potencia no está definido"}
    if int(n) < -5 or int(n) > 5:
        return {"success": False, "message": "No es posible hacer potencias mayores a 5 o menores a -5"}
    if int(n) < 0:
        return {"success": False, "message": "No es posible hacer potencias negativas"}
    else:    
        power = generate_powerL(alphabet, int(n))
        return {"success": True, "power": power}

def validComplex(complexN):
    valid = validateComplex(complexN)

    if(valid):
        return {"success": True, "message": "Tu número es válido"}
    else:
        return {"success": False, "message": "Tu número no es válido"}