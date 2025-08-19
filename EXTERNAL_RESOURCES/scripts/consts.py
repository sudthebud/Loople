# Imports
import os
import json




# Game consts
min_letter_count = 3
max_letter_count = 7

# File Paths
raw_datasets_path = './../raw_datasets'
diffs_path = './../diffs'
assets_path = './../../assets'
datasets_path = 'datasets'

# File Names
raw_words_list_filePath = 'RAW_WORDS_LIST'



# Functions
def GetRawDatasetFiles():
    raw_dataset_files = [f for f in os.listdir(raw_datasets_path) if os.path.isfile(os.path.join(raw_datasets_path, f))]
    raw_dataset_files = [f for f in raw_dataset_files if (f != '.gitignore' and f != f'{raw_words_list_filePath}.txt')]
    return raw_dataset_files

def ReadListFromFile(filePath, listAsSet = False):
    words = [] if not listAsSet else set()

    with open(filePath, 'r') as file:
        for line in file:
            lineAdjusted = (line[:-1] if line.endswith('\n') else line).lower()
            if (lineAdjusted.isalpha() and len(lineAdjusted) >= min_letter_count and len(lineAdjusted) <= max_letter_count):
                if not listAsSet: words.append(lineAdjusted)
                else: words.add(lineAdjusted)

    return words

def WriteListToFile(filePath, list):
    with open(filePath, 'w') as file:
        for item in list:
            file.write(f'{item}\n')

def DetectOrGenerateWordList(detectOverride = False):
    if (not detectOverride and os.path.isfile(os.path.join(raw_datasets_path, raw_words_list_filePath))): return
    
    else:
        raw_dataset_files = GetRawDatasetFiles()
        words = set()

        if len(raw_dataset_files) > 0: 
            for filePath in raw_dataset_files:
                words.update(ReadListFromFile(os.path.join(raw_datasets_path, filePath), listAsSet=True))

        full_datasets_path = os.path.join(assets_path, datasets_path)
        dataset_files = os.listdir(full_datasets_path)

        for filePath in dataset_files:
            with open(os.path.join(full_datasets_path, filePath), 'r') as file:
                json_data = json.load(file)

                for key in json_data.keys():
                    words.update(json_data[key])

        WriteListToFile(filePath=os.path.join(raw_datasets_path, f'{raw_words_list_filePath}.txt'), list=sorted(words)) # Gives me the ability to check the entire list of words after