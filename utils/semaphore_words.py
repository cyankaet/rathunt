import re

semaphoreList = []
with open("resources/semaphore.txt") as f:
    semaphoreList = [i.strip().split() for i in f.readlines()]

print(len(semaphoreList))
alphabet = "abcdefghijklmnopqrstuvwxyz"

words = []
with open("resources/cleanwords.txt") as f:
    words = [i.strip() for i in f.readlines()]

toExp = {i: [] for i in 'abcdefghijklmnopqrstuvwxyz'}

for word in words:
    for i in range(len(semaphoreList)):
        s = semaphoreList[i]
        reg = r'\b(([^nesw]*' + s[0] + r'[^nesw]*' + s[1] + \
            r'[^nesw]*)|([^nesw]*' + s[1] + r'[^nesw]*' + \
            s[0] + r'[^nesw]*))\b'
        if re.match(reg, word):
            toExp[alphabet[i]].append(word)
            break

print({i: len(toExp[i]) for i in toExp})
print(sum([len(toExp[i]) for i in toExp]))
print(toExp['u'])

# with open("resources/semaphore_words.txt", "w") as f:
#     for i in toExp:
#         for j in toExp[i]:
#             f.write(i + " " + j + '\n')
