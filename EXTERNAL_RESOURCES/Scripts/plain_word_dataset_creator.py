import json
import re

words = set()

with open("..\\texts\\eff_large_wordlist.txt", "r") as file:
    for line in file:
        words.add(line[6:-1])

with open("..\\texts\\eff_short_wordlist_1.txt", "r") as file:
    for line in file:
        words.add(line[5:-1])

with open("..\\texts\\eff_short_wordlist_2_0.txt", "r") as file:
    for line in file:
        words.add(line[5:-1])

with open("..\\texts\\basic_english_2000.txt", "r") as file:
    for line in file:
        words.add(line[:-1])

with open("..\\texts\\eff_words.txt", "w") as file:
    for line in words:
        file.write(""+line.lower()+"\n")