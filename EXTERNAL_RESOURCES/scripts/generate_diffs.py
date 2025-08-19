#############################
# This script allows me to look at words unique to a raw dataset and review them in case I need to take out some
#############################

# Imports
import argparse
import os

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
    fileWordList = consts.ReadListFromFile(os.path.join(consts.raw_datasets_path, filePath), listAsSet=True)
    if (filePath == fileName): fileDiffWordList.update(fileWordList)
    else: otherFilesWordList.update(fileWordList)

wordsDiff = list(fileDiffWordList - otherFilesWordList)
wordsDiff.sort()
consts.WriteListToFile(filePath=os.path.join(consts.diffs_path, fileName[:-4] + "-DIFF" + fileName[-4:]), list=wordsDiff)