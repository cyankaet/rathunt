words = []
with open("resources/cleanwords.txt") as f:
    words = [i.strip() for i in f.readlines()]

all_inc_but_one_dict = {i: [] for i in 'abcdefghijklmnopqrstuvwxyz'}
all_inc_strict_dict = {i: [] for i in 'abcdefghijklmnopqrstuvwxyz'}
all_dec_but_one_dict = {i: [] for i in 'abcdefghijklmnopqrstuvwxyz'}
all_dec_strict_dict = {i: [] for i in 'abcdefghijklmnopqrstuvwxyz'}

for i in words:
    all_inc_but_one = True
    all_inc_strict = True
    all_dec_but_one = True
    all_dec_strict = True
    min_so_far = i[0]
    max_so_far = i[0]
    bad_lett_inc = ''  # bad letter when increaseing
    bad_lett_inc_ind = -1
    bad_lett_dec = ''  # bad letter when decreasing
    bad_lett_dec_ind = -1
    for let in range(1, len(i)):
        if i[let] > i[let-1]:  # peak
            if bad_lett_dec:
                all_dec_but_one = False
                all_dec_strict = False
            else:
                bad_lett_dec = i[let]
                bad_lett_dec_ind = let
                min_so_far = i[let-1]
            if let - 1 == bad_lett_inc_ind and i[let] < max_so_far:
                all_inc_strict = False
        elif i[let] == i[let-1]:
            all_dec_but_one = False
            all_dec_strict = False
            all_inc_but_one = False
            all_inc_strict = False
        else:  # i[let] < i[let-1]
            if bad_lett_inc:
                all_inc_but_one = False
                all_inc_strict = False
            else:
                bad_lett_inc = i[let]
                bad_lett_inc_ind = let
                max_so_far = i[let-1]
            if let - 1 == bad_lett_dec_ind and i[let] > min_so_far:
                all_dec_strict = False
    if all_inc_but_one:
        if bad_lett_inc:
            all_inc_but_one_dict[bad_lett_inc].append(i)
            if all_inc_strict:
                all_inc_strict_dict[bad_lett_inc].append(i)
    elif all_dec_but_one:
        if bad_lett_dec:
            all_dec_but_one_dict[bad_lett_dec].append(i)
            if all_dec_strict:
                all_dec_strict_dict[bad_lett_dec].append(i)

print({i: len(all_inc_but_one_dict[i]) for i in all_inc_but_one_dict})
print(sum([len(all_inc_but_one_dict[i]) for i in all_inc_but_one_dict]))

print({i: len(all_inc_strict_dict[i]) for i in all_inc_strict_dict})
print(sum([len(all_inc_strict_dict[i]) for i in all_inc_strict_dict]))

print({i: len(all_dec_but_one_dict[i]) for i in all_dec_but_one_dict})
print(sum([len(all_dec_but_one_dict[i]) for i in all_dec_but_one_dict]))

all_dict = {i: sorted(all_inc_but_one_dict[i] + all_dec_but_one_dict[i])
            for i in 'abcdefghijklmnopqrstuvwxyz'}
strict_dict = {i: sorted(
    all_inc_strict_dict[i] + all_dec_strict_dict[i]) for i in 'abcdefghijklmnopqrstuvwxyz'}

print({i: len(all_dict[i]) for i in all_dict})
print(sum([len(all_dict[i]) for i in all_dict]))

print({i: len(strict_dict[i]) for i in strict_dict})
print(sum([len(strict_dict[i]) for i in strict_dict]))

with open("inc_dec_words.txt", "w") as f:
    for i in all_dict:
        for j in all_dict[i]:
            f.write(i + " " + j + '\n')

with open("inc_dec_strict_words.txt", "w") as f:
    for i in strict_dict:
        for j in strict_dict[i]:
            f.write(i + " " + j + '\n')
