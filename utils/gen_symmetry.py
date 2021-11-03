import collections
import os


def only_one_wrong(counts, symmetry_type, ltrs, word):
    with open(symmetry_type + "_sym.txt", "a") as f:
        num_wrong = 0
        wrong_ltr = ''
        for ltr in word:
            if ltr not in ltrs:
                # print(
                #     f"in loop for word {word} at letter {ltr}, num wrong is {num_wrong}")
                num_wrong += 1
                wrong_ltr = ltr
        if num_wrong == 1:
            # print("writing")
            f.write(wrong_ltr + " " + word + "\n")
            counts[wrong_ltr] += 1
    return counts


def sort_words(symmetry_type, words):
    os.remove(symmetry_type + "_sym.txt")

    vert_ltrs = "ahimotuvwxy"
    horiz_ltrs = "bcdehikox"
    rot_ltrs = "hinosxz"
    none_ltrs = "fgjlpqr"

    ltrs = ""
    if symmetry_type == "vertical":
        ltrs = vert_ltrs
    elif symmetry_type == "horizontal":
        ltrs = horiz_ltrs
    elif symmetry_type == "rotational":
        ltrs = rot_ltrs
    else:
        ltrs = none_ltrs

    counts = collections.defaultdict(int)
    for word in words:
        counts = only_one_wrong(counts, symmetry_type, ltrs, word)
    with open(symmetry_type + "_sym.txt", "r") as f:
        sorted_lines = sorted(f)
    with open(symmetry_type + "_sym.txt", "w") as f:
        f.writelines(sorted_lines)
    return counts


if __name__ == "__main__":
    words = []
    with open("resources/cleanwords.txt") as f:
        words = [i.strip() for i in f.readlines()]

    print("please first delete the vertical_sym.txt, etc files as this program taking advantage of appending to existing files")
    # specify symmetry, which can be either "vertical", "horizontal", "rotational", or "none"
    print(sort_words("vertical", words))
    print(sort_words("horizontal", words))
    print(sort_words("rotational", words))
    print(sort_words("none", words))
