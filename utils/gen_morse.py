# . = o, - = i
import re
morseList = []
with open("resources/morse.txt") as f:
    morseList = [list(i.strip()) for i in f.readlines()]

alphabet = "abcdefghijklmnopqrstuvwxyz"

words = []
with open("resources/cleanwords.txt") as f:
    words = [i.strip() for i in f.readlines()]

toExp = {i: [] for i in 'abcdefghijklmnopqrstuvwxyz'}

for word in words:
    for i in range(len(morseList)):
        s = morseList[i]
        reg = r'\b([^oi]*'
        for j in s:
            if j == '.':
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
# print(toExp['u'])
