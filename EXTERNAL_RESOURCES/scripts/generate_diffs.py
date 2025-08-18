# Imports
import argparse
import os
import string
import copy



# Consts
raw_datasets_path = './../raw_datasets'
raw_words_list_filePath = 'raw_words_list'
diffs_path = './../diffs'


# Code
parser = argparse.ArgumentParser()
parser.add_argument('fileName', help="The name of the file to gather diffs from")
fileName = parser.parse_args().fileName
if not fileName.endswith('.txt'): fileName = f'{fileName}.txt'
if not os.path.isfile(os.path.join(raw_datasets_path, fileName)):
    parser.error(f"File name {fileName} was not found!")


raw_dataset_files = [f for f in os.listdir(raw_datasets_path) if os.path.isfile(os.path.join(raw_datasets_path, f))]
raw_dataset_files = [f for f in raw_dataset_files if (f != '.gitignore' and f != f'{raw_words_list_filePath}.txt')]

otherFilesWordList = set()
fileDiffWordList = set()

for filePath in raw_dataset_files:
    with open(os.path.join(raw_datasets_path, filePath), 'r') as file:
        for line in file:
            lineAdjusted = (line[:-1] if line.endswith('\n') else line).lower()
            if (lineAdjusted.isalpha() and len(lineAdjusted) >= 3 and len(lineAdjusted) <= 7):
                if (filePath == fileName): fileDiffWordList.add(lineAdjusted)
                else: otherFilesWordList.add(lineAdjusted)

wordsDiff = list(fileDiffWordList - otherFilesWordList)
wordsDiff.sort()
with open(os.path.join(diffs_path, fileName[:-4] + "-DIFF" + fileName[-4:]), 'w') as file:
    for word in wordsDiff:
        file.write(f'{word}\n')