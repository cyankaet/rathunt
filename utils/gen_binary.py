# 1 = i, 0 = o

import re
binaryList = []
with open("resources/binary.txt") as f:
    binaryList = [list(i.strip()) for i in f.readlines()]

alphabet = "abcdefghijklmnopqrstuvwxyz"

words = []
with open("resources/cleanwords.txt") as f:
    words = [i.strip() for i in f.readlines()]

toExp = {i: [] for i in 'abcdefghijklmnopqrstuvwxyz'}

for word in words:
    for i in range(len(binaryList)):
        s = binaryList[i]
        reg = r'\b([^oi]*'
        for j in s:
            if j == '0':
                reg += 'o'
                reg += r'[^oi]*'
            else:
                reg += 'i'
                reg += r'[^oi]*'
        reg += r')\b'
        # print(reg)
        if re.match(reg, word):
            toExp[alphabet[i]].append(word)
            break
print({i: len(toExp[i]) for i in toExp})
print(sum([len(toExp[i]) for i in toExp]))
print(toExp['x'])

with open("binary_words.txt", "w") as f:
    for i in toExp:
        for j in toExp[i]:
            f.write(i + " " + j + '\n')
