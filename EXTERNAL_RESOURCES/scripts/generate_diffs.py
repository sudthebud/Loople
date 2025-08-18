# Imports
import argparse
import os
import string
import copy

import consts



# Code
parser = argparse.ArgumentParser()
parser.add_argument('fileName', help="The name of the file to gather diffs from")
fileName = parser.parse_args().fileName
if not fileName.endswith('.txt'): fileName = f'{fileName}.txt'
if not os.path.isfile(os.path.join(consts.raw_datasets_path, fileName)):
    parser.error(f"File name {fileName} was not found!")


raw_dataset_files = consts.GetRawDatasetFiles()

otherFilesWordList = set()
fileDiffWordList = set()

for filePath in raw_dataset_files:
    with open(os.path.join(consts.raw_datasets_path, filePath), 'r') as file:
        for line in file:
            lineAdjusted = (line[:-1] if line.endswith('\n') else line).lower()
            if (lineAdjusted.isalpha() and len(lineAdjusted) >= 3 and len(lineAdjusted) <= 7):
                if (filePath == fileName): fileDiffWordList.add(lineAdjusted)
                else: otherFilesWordList.add(lineAdjusted)

wordsDiff = list(fileDiffWordList - otherFilesWordList)
wordsDiff.sort()
consts.WriteListToFile(filePath=os.path.join(consts.diffs_path, fileName[:-4] + "-DIFF" + fileName[-4:]), list=wordsDiff)