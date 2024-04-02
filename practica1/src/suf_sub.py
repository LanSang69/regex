def sufijoI(w1, w2):
    if w1 == w2:
        return False
    for x in range(len(w1)):
        if w2[x] != w1[x]:
            return False
    return True

def sufijoP(w1, w2):
    if w1 == w2:
        return True
    return False

def subcadena(w1, w2):
    if w1 in w2:
        return True
    return False

def subsecuencia(w1, w2):
    i = 0
    for x in range(len(w2)):
        if w1[i] == w2[x]:
            i += 1
        if i == len(w1):
            return True
    return False
