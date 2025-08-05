using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Newtonsoft.Json;
using System.IO;
using System.Linq;

public class WordSetup : MonoBehaviour
{

    public TextAsset threeLetterFile;
    public TextAsset fourLetterFile;
    public TextAsset fiveLetterFile;
    public TextAsset sixLetterFile;
    public TextAsset sevenLetterFile;

    public static Dictionary<string, List<string>> threeLetterWords;
    public static Dictionary<string, List<string>> fourLetterWords;
    public static Dictionary<string, List<string>> fiveLetterWords;
    public static Dictionary<string, List<string>> sixLetterWords;
    public static Dictionary<string, List<string>> sevenLetterWords;

    public static int numWords;

    public static List<string> wordLoop;

    private string ReadFile(string fileName)
    {
        /*Debug.Log(fileName);
        return Resources.Load<TextAsset>("JSON Files/" + fileName).text;*/

        if (fileName.Equals("threeLetter"))
        {
            return threeLetterFile.text;
        }
        if (fileName.Equals("fourLetter"))
        {
            return fourLetterFile.text;
        }
        if (fileName.Equals("fiveLetter"))
        {
            return fiveLetterFile.text;
        }
        if (fileName.Equals("sixLetter"))
        {
            return sixLetterFile.text;
        }
        if (fileName.Equals("sevenLetter"))
        {
            return sevenLetterFile.text;
        }

        return "";
    }

    private List<string> GetWordLoop()
    {
        List<Dictionary<string, List<string>>> listOfWords = new List<Dictionary<string, List<string>>>();
        listOfWords.Add(threeLetterWords);
        listOfWords.Add(fourLetterWords);
        listOfWords.Add(fiveLetterWords);
        listOfWords.Add(sixLetterWords);
        listOfWords.Add(sevenLetterWords);

        List<string> wordLoop = new List<string>();

        while (wordLoop.Count < numWords)
        {
            Dictionary<string, List<string>> dictToUse = listOfWords[Random.Range(0, listOfWords.Count)];

            if (wordLoop.Count == 0)
            {
                string key = dictToUse.Keys.ToList<string>()[Random.Range(0,dictToUse.Keys.Count)];
                List<string> wordsFromDictToUse = dictToUse[key];
                wordLoop.Add(wordsFromDictToUse[Random.Range(0, wordsFromDictToUse.Count)]);
            }
            else if (wordLoop.Count == numWords - 1) 
            { 
                string firstLetterWord = wordLoop[wordLoop.Count - 1];
                string lastLetterWord = wordLoop[0];

                string firstLetter = firstLetterWord.Substring(firstLetterWord.Length - 1);
                string lastLetter = lastLetterWord.Substring(0, 1);
                string key = "" + firstLetter + "" + lastLetter;

                List<string> keysFromDictToUse = dictToUse.Keys.ToList<string>();
                if (!keysFromDictToUse.Contains(key))
                {
                    wordLoop.Clear();
                    continue;
                }
                else
                {
                    List<string> wordsFromDictToUse = dictToUse[key];
                    wordLoop.Add(wordsFromDictToUse[Random.Range(0, wordsFromDictToUse.Count)]);
                    return wordLoop;
                }
            }
            else
            {
                string firstLetterWord = wordLoop[wordLoop.Count - 1];
                string firstLetter = firstLetterWord.Substring(firstLetterWord.Length - 1);

                List<string> keysFromDictToUse = dictToUse.Keys.ToList<string>();
                List<string> keysFromDictToUseValid = new List<string>();

                foreach (string key in keysFromDictToUse)
                {
                    if (key.StartsWith(firstLetter))
                    {
                        keysFromDictToUseValid.Add(key);
                    }
                }

                if (keysFromDictToUseValid.Count == 0)
                {
                    wordLoop.Clear();
                }
                else
                {
                    string key = keysFromDictToUseValid[Random.Range(0, keysFromDictToUseValid.Count)];
                    List<string> wordsFromDictToUse = dictToUse[key];
                    wordLoop.Add(wordsFromDictToUse[Random.Range(0, wordsFromDictToUse.Count)]);
                }
            }
        }

        throw new System.Exception("Could not find loop!");
        return null;
    }

    private void Awake()
    {
        numWords = Random.Range(3, 5);

        string threeLetterJSON = ReadFile("threeLetter");
        string fourLetterJSON = ReadFile("fourLetter");
        string fiveLetterJSON = ReadFile("fiveLetter");
        string sixLetterJSON = ReadFile("sixLetter");
        string sevenLetterJSON = ReadFile("sevenLetter");


        threeLetterWords = JsonConvert.DeserializeObject<Dictionary<string, List<string>>>(threeLetterJSON);
        fourLetterWords = JsonConvert.DeserializeObject<Dictionary<string, List<string>>>(fourLetterJSON);
        fiveLetterWords = JsonConvert.DeserializeObject<Dictionary<string, List<string>>>(fiveLetterJSON);
        sixLetterWords = JsonConvert.DeserializeObject<Dictionary<string, List<string>>>(sixLetterJSON);
        sevenLetterWords = JsonConvert.DeserializeObject<Dictionary<string, List<string>>>(sevenLetterJSON);

        wordLoop = GetWordLoop();
        string wordloopstring = "";
        foreach (string word in wordLoop)
        {
            wordloopstring += word + " -> ";
        }
        Debug.Log(wordloopstring);
    }

}
