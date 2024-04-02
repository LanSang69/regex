import random
from itertools import product

def generate_L(alphabet):
    language = list()
    length = random.randint(1, len(alphabet))  # Choose a random length for the language

    for _ in range(length):
        language.append(random.choice(alphabet))  # Choose a random character from the alphabet

    return language

def generate_words(alphabet, np, l):
            words = []
            for _ in range(np):
                word = ""
                for _ in range(l):
                    word += random.choice(alphabet)
                words.append(word)
            return words

def generate_powerL(alfabeto, longitud_combinaciones):
    return list(product(alfabeto, repeat=longitud_combinaciones)) #Genra un producto cartesiano (alfabeto x alfabeto x alfabeto ...)
