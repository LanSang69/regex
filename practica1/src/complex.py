import re

#What does a complex number has?
    #1. Starts with a number
    #2. Followed by an operator
    #3. Followed by a number
    #4. Ends with 'i'
    #5. The operator can be '+' or '-'
    #6. It doesn't neccessarily has to include both imaginary and real parts
    #7. Both parts can be part of the naturals, integers and reals 

#STRUCTURE
    # [0-9](i|"")(+|-)[0-9](i|"")

def validateComplex(cadena):
    patron = r'^-?(((\d+(\.\d*)?)|e(\^\d*)?))?[+-]?((\d+(\.\d*)?)|e(\^\d*)+i$)?'
    return bool(re.match(patron, cadena))


    
