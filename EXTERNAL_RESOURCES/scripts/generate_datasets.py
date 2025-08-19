# Imports
import os
import json
import string
import copy

import consts



# Code
consts.DetectOrGenerateWordList(detectOverride=True)
words = consts.ReadListFromFile(os.path.join(consts.raw_datasets_path, f'{consts.raw_words_list_filePath}.txt'))

dictBase = {}
for c in string.ascii_lowercase:
    for d in string.ascii_lowercase:
        dictBase[f'{c}{d}'] = []

dictThreeLetter = copy.deepcopy(dictBase)
dictFourLetter = copy.deepcopy(dictBase)
dictFiveLetter = copy.deepcopy(dictBase)
dictSixLetter = copy.deepcopy(dictBase)
dictSevenLetter = copy.deepcopy(dictBase)

for word in words:
    key = f'{word[0]}{word[-1]}'
    if len(word) == 3: dictThreeLetter[key].append(word)
    elif len(word) == 4: dictFourLetter[key].append(word)
    elif len(word) == 5: dictFiveLetter[key].append(word)
    elif len(word) == 6: dictSixLetter[key].append(word)
    elif len(word) == 7: dictSevenLetter[key].append(word)

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

with open(os.path.join(consts.assets_path, consts.datasets_path, 'threeLetter.json'), 'w') as file:
    json.dump(dictThreeLetter, file, indent=2)
with open(os.path.join(consts.assets_path, consts.datasets_path, 'fourLetter.json'), 'w') as file:
    json.dump(dictFourLetter, file, indent=2)
with open(os.path.join(consts.assets_path, consts.datasets_path, 'fiveLetter.json'), 'w') as file:
    json.dump(dictFiveLetter, file, indent=2)
with open(os.path.join(consts.assets_path, consts.datasets_path, 'sixLetter.json'), 'w') as file:
    json.dump(dictSixLetter, file, indent=2)
with open(os.path.join(consts.assets_path, consts.datasets_path, 'sevenLetter.json'), 'w') as file:
    json.dump(dictSevenLetter, file, indent=2)