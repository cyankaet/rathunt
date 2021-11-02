import re


def only_one_wrong(ltrs, word):
    num_wrong = 0
    for ltr in word:
        if ltr not in ltrs:
            num_wrong += 1
    return num_wrong == 1


def sort_words(symmetry_type, words):
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

    correct_words = [word for word in words if only_one_wrong(ltrs, word)]
    with open(symmetry_type + "_sym.txt", "w") as f:
        for word in correct_words:
            f.write(word + "\n")


if __name__ == "__main__":
    words = []
    with open("resources/cleanwords.txt") as f:
        words = [i.strip() for i in f.readlines()]

    # specify symmetry, which can be either "vertical", "horizontal", "rotational", or "none"
    sort_words("vertical", words)
    sort_words("horizontal", words)
    sort_words("rotational", words)
    sort_words("none", words)
