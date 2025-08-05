import json
import string

dictThreeLetter = {}
for c in string.ascii_lowercase:
    for d in string.ascii_lowercase:
        dictThreeLetter["" + c + d] = []

dictFourLetter = {}
for c in string.ascii_lowercase:
    for d in string.ascii_lowercase:
        dictFourLetter["" + c + d] = []

dictFiveLetter = {}
for c in string.ascii_lowercase:
    for d in string.ascii_lowercase:
        dictFiveLetter["" + c + d] = []

dictSixLetter = {}
for c in string.ascii_lowercase:
    for d in string.ascii_lowercase:
        dictSixLetter["" + c + d] = []

dictSevenLetter = {}
for c in string.ascii_lowercase:
    for d in string.ascii_lowercase:
        dictSevenLetter["" + c + d] = []

with open("..\\texts\\eff_words.txt", "r") as file:
    for line in file:
        line = line.lower()[:-1]
        key = "" + line[0] + line[-1]
        
        if (len(line) == 3):
            dictThreeLetter[key].append(line)
        
        elif (len(line) == 4):
            dictFourLetter[key].append(line)

        elif (len(line) == 5):
            dictFiveLetter[key].append(line)

        elif (len(line) == 6):
            dictSixLetter[key].append(line)

        elif (len(line) == 7):
            dictSevenLetter[key].append(line)

for key in tuple(dictThreeLetter): 
    if dictThreeLetter[key] == []: 
        dictThreeLetter.pop(key)

for key in tuple(dictFourLetter): 
    if dictFourLetter[key] == []: 
        dictFourLetter.pop(key)

for key in tuple(dictFiveLetter): 
    if dictFiveLetter[key] == []: 
        dictFiveLetter.pop(key)

for key in tuple(dictSixLetter): 
    if dictSixLetter[key] == []: 
        dictSixLetter.pop(key)

for key in tuple(dictSevenLetter): 
    if dictSevenLetter[key] == []: 
        dictSevenLetter.pop(key)

with open("..\\threeLetter.json", "w") as file:
    json.dump(dictThreeLetter, file)

with open("..\\fourLetter.json", "w") as file:
    json.dump(dictFourLetter, file)

with open("..\\fiveLetter.json", "w") as file:
    json.dump(dictFiveLetter, file)

with open("..\\sixLetter.json", "w") as file:
    json.dump(dictSixLetter, file)

with open("..\\sevenLetter.json", "w") as file:
    json.dump(dictSevenLetter, file)