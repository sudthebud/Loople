using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading;
using TMPro;
using Unity.VisualScripting;
using Unity.VisualScripting.Antlr3.Runtime;
using UnityEngine;

public class Loop : MonoBehaviour
{
    public GameObject LetterCircle;
    public GameObject UIThing;

    public Color blankTextCircle;
    public Color inputTextCircle;
    public Color wrongTextCircle;
    public Color correctTextCircle;
    public Color missedTextSameWordCircle;
    public Color missedTextDifferentWordCirlce;

    int loopLength;

    public static int currentWord;
    public static int currentIndex;
    public static List<GameObject> letterCircles;
    public static List<GameObject> letterCirclesEnds;

    Boolean lastInput = false;

    // Start is called before the first frame update
    void Start()
    {
        for (int i = 0; i < WordSetup.wordLoop.Count; i++)
        {
            if (i == 0)
            {
                loopLength += WordSetup.wordLoop[i].Length;
            }
            else if (i == WordSetup.wordLoop.Count - 1)
            {
                loopLength += WordSetup.wordLoop[i].Length - 2;
            }
            else
            {
                loopLength += WordSetup.wordLoop[i].Length - 1;
            }
        }

        letterCircles = new List<GameObject>();
        letterCirclesEnds = new List<GameObject>();
        float scale = 0.6f + 0.4f * (30 - loopLength) / 24;
        int letterNumCount = 0;
        int wordCount = 0;
        int currentWordIndex = 0;
        for (int i = 0; i < loopLength; i++)
        {
            float rad = (i / (float)loopLength * 360 - 90) * Mathf.Deg2Rad;

            float x = 3.5f * Mathf.Cos(rad);
            float y = 3.5f * Mathf.Sin(rad);

            GameObject newCircle = Instantiate(LetterCircle, new Vector3(x, y, LetterCircle.transform.position.z), Quaternion.identity, gameObject.transform);
            newCircle.transform.localScale = new Vector3(newCircle.transform.localScale.x * scale, newCircle.transform.localScale.y * scale, newCircle.transform.localScale.z);
            newCircle.transform.localRotation = Quaternion.Euler(0, 0, rad * Mathf.Rad2Deg + 90);
            letterCircles.Add(newCircle);

            if (i == letterNumCount)
            {
                newCircle.GetComponent<Letter>().word = new List<int>();
                newCircle.GetComponent<Letter>().word.Add(mod(wordCount-1, WordSetup.wordLoop.Count));
                newCircle.GetComponent<Letter>().word.Add(mod(wordCount, WordSetup.wordLoop.Count));

                newCircle.GetComponent<Letter>().wordIndex = new List<int>();
                newCircle.GetComponent<Letter>().wordIndex.Add(WordSetup.wordLoop[mod(wordCount - 1, WordSetup.wordLoop.Count)].Length - 1);
                newCircle.GetComponent<Letter>().wordIndex.Add(0);
                currentWordIndex = 0;

                letterNumCount += WordSetup.wordLoop[wordCount].Length - 1;
                wordCount++;

                letterCirclesEnds.Add(newCircle);
                newCircle.transform.GetChild(0).gameObject.SetActive(true);
            }
            else
            {
                newCircle.GetComponent<Letter>().word.Add(mod(wordCount - 1, WordSetup.wordLoop.Count));

                currentWordIndex++;
                newCircle.GetComponent<Letter>().wordIndex.Add(currentWordIndex);
            }
        }

        currentIndex = 0;
        letterCircles[currentIndex].transform.GetChild(1).gameObject.SetActive(true);
    }

    // Update is called once per frame
    void Update()
    {
        if (Input.GetKeyDown(KeyCode.Return))
        {
            CheckWord();
        }

        if (Input.GetKeyDown(KeyCode.RightArrow))
        {
            currentWord = mod((currentWord + 1), WordSetup.wordLoop.Count);
            int indexOfNextWord = letterCircles.IndexOf(letterCirclesEnds[currentWord]);
            int spaces = indexOfNextWord - currentIndex;
            Rotate(spaces);

            lastInput = false;
        }
        else if (Input.GetKeyDown(KeyCode.LeftArrow))
        {
            currentWord = mod((currentWord - 1), WordSetup.wordLoop.Count);
            int indexOfNextWord = letterCircles.IndexOf(letterCirclesEnds[currentWord]);
            int spaces = indexOfNextWord - currentIndex;
            Rotate(spaces);

            lastInput = false;
        }

        else if (Input.GetKeyDown(KeyCode.A))
        {
            letterCircles[currentIndex].transform.GetChild(2).GetComponent<SpriteRenderer>().color = blankTextCircle;
            letterCircles[currentIndex].transform.GetChild(2).GetChild(0).GetComponent<TMP_Text>().text = "A";
            letterCircles[currentIndex].transform.GetChild(2).GetChild(0).GetComponent<TMP_Text>().color = Color.black;

            if (letterCirclesEnds.Contains(letterCircles[currentIndex]) && lastInput)
            {
                currentWord = mod((currentWord + 1), WordSetup.wordLoop.Count);
            }
            Rotate(1);

            lastInput = true;
        }
        else if (Input.GetKeyDown(KeyCode.B))
        {
            letterCircles[currentIndex].transform.GetChild(2).GetComponent<SpriteRenderer>().color = blankTextCircle;
            letterCircles[currentIndex].transform.GetChild(2).GetChild(0).GetComponent<TMP_Text>().text = "B";
            letterCircles[currentIndex].transform.GetChild(2).GetChild(0).GetComponent<TMP_Text>().color = Color.black;

            if (letterCirclesEnds.Contains(letterCircles[currentIndex]) && lastInput)
            {
                currentWord = mod((currentWord + 1), WordSetup.wordLoop.Count);
            }
            Rotate(1);

            lastInput = true;
        }
        else if (Input.GetKeyDown(KeyCode.C))
        {
            letterCircles[currentIndex].transform.GetChild(2).GetComponent<SpriteRenderer>().color = blankTextCircle;
            letterCircles[currentIndex].transform.GetChild(2).GetChild(0).GetComponent<TMP_Text>().text = "C";
            letterCircles[currentIndex].transform.GetChild(2).GetChild(0).GetComponent<TMP_Text>().color = Color.black;

            if (letterCirclesEnds.Contains(letterCircles[currentIndex]) && lastInput)
            {
                currentWord = mod((currentWord + 1), WordSetup.wordLoop.Count);
            }
            Rotate(1);

            lastInput = true;
        }
        else if (Input.GetKeyDown(KeyCode.D))
        {
            letterCircles[currentIndex].transform.GetChild(2).GetComponent<SpriteRenderer>().color = blankTextCircle;
            letterCircles[currentIndex].transform.GetChild(2).GetChild(0).GetComponent<TMP_Text>().text = "D";
            letterCircles[currentIndex].transform.GetChild(2).GetChild(0).GetComponent<TMP_Text>().color = Color.black;

            if (letterCirclesEnds.Contains(letterCircles[currentIndex]) && lastInput)
            {
                currentWord = mod((currentWord + 1), WordSetup.wordLoop.Count);
            }
            Rotate(1);

            lastInput = true;
        }
        else if (Input.GetKeyDown(KeyCode.E))
        {
            letterCircles[currentIndex].transform.GetChild(2).GetComponent<SpriteRenderer>().color = blankTextCircle;
            letterCircles[currentIndex].transform.GetChild(2).GetChild(0).GetComponent<TMP_Text>().text = "E";
            letterCircles[currentIndex].transform.GetChild(2).GetChild(0).GetComponent<TMP_Text>().color = Color.black;

            if (letterCirclesEnds.Contains(letterCircles[currentIndex]) && lastInput)
            {
                currentWord = mod((currentWord + 1), WordSetup.wordLoop.Count);
            }
            Rotate(1);

            lastInput = true;
        }
        else if (Input.GetKeyDown(KeyCode.F))
        {
            letterCircles[currentIndex].transform.GetChild(2).GetComponent<SpriteRenderer>().color = blankTextCircle;
            letterCircles[currentIndex].transform.GetChild(2).GetChild(0).GetComponent<TMP_Text>().text = "F";
            letterCircles[currentIndex].transform.GetChild(2).GetChild(0).GetComponent<TMP_Text>().color = Color.black;

            if (letterCirclesEnds.Contains(letterCircles[currentIndex]) && lastInput)
            {
                currentWord = mod((currentWord + 1), WordSetup.wordLoop.Count);
            }
            Rotate(1);

            lastInput = true;
        }
        else if (Input.GetKeyDown(KeyCode.G))
        {
            letterCircles[currentIndex].transform.GetChild(2).GetComponent<SpriteRenderer>().color = blankTextCircle;
            letterCircles[currentIndex].transform.GetChild(2).GetChild(0).GetComponent<TMP_Text>().text = "G";
            letterCircles[currentIndex].transform.GetChild(2).GetChild(0).GetComponent<TMP_Text>().color = Color.black;

            if (letterCirclesEnds.Contains(letterCircles[currentIndex]) && lastInput)
            {
                currentWord = mod((currentWord + 1), WordSetup.wordLoop.Count);
            }
            Rotate(1);

            lastInput = true;
        }
        else if (Input.GetKeyDown(KeyCode.H))
        {
            letterCircles[currentIndex].transform.GetChild(2).GetComponent<SpriteRenderer>().color = blankTextCircle;
            letterCircles[currentIndex].transform.GetChild(2).GetChild(0).GetComponent<TMP_Text>().text = "H";
            letterCircles[currentIndex].transform.GetChild(2).GetChild(0).GetComponent<TMP_Text>().color = Color.black;

            if (letterCirclesEnds.Contains(letterCircles[currentIndex]) && lastInput)
            {
                currentWord = mod((currentWord + 1), WordSetup.wordLoop.Count);
            }
            Rotate(1);

            lastInput = true;
        }
        else if (Input.GetKeyDown(KeyCode.I))
        {
            letterCircles[currentIndex].transform.GetChild(2).GetComponent<SpriteRenderer>().color = blankTextCircle;
            letterCircles[currentIndex].transform.GetChild(2).GetChild(0).GetComponent<TMP_Text>().text = "I";
            letterCircles[currentIndex].transform.GetChild(2).GetChild(0).GetComponent<TMP_Text>().color = Color.black;

            if (letterCirclesEnds.Contains(letterCircles[currentIndex]) && lastInput)
            {
                currentWord = mod((currentWord + 1), WordSetup.wordLoop.Count);
            }
            Rotate(1);

            lastInput = true;
        }
        else if (Input.GetKeyDown(KeyCode.J))
        {
            letterCircles[currentIndex].transform.GetChild(2).GetComponent<SpriteRenderer>().color = blankTextCircle;
            letterCircles[currentIndex].transform.GetChild(2).GetChild(0).GetComponent<TMP_Text>().text = "J";
            letterCircles[currentIndex].transform.GetChild(2).GetChild(0).GetComponent<TMP_Text>().color = Color.black;

            if (letterCirclesEnds.Contains(letterCircles[currentIndex]) && lastInput)
            {
                currentWord = mod((currentWord + 1), WordSetup.wordLoop.Count);
            }
            Rotate(1);

            lastInput = true;
        }
        else if (Input.GetKeyDown(KeyCode.K))
        {
            letterCircles[currentIndex].transform.GetChild(2).GetComponent<SpriteRenderer>().color = blankTextCircle;
            letterCircles[currentIndex].transform.GetChild(2).GetChild(0).GetComponent<TMP_Text>().text = "K";
            letterCircles[currentIndex].transform.GetChild(2).GetChild(0).GetComponent<TMP_Text>().color = Color.black;

            if (letterCirclesEnds.Contains(letterCircles[currentIndex]) && lastInput)
            {
                currentWord = mod((currentWord + 1), WordSetup.wordLoop.Count);
            }
            Rotate(1);

            lastInput = true;
        }
        else if (Input.GetKeyDown(KeyCode.L))
        {
            letterCircles[currentIndex].transform.GetChild(2).GetComponent<SpriteRenderer>().color = blankTextCircle;
            letterCircles[currentIndex].transform.GetChild(2).GetChild(0).GetComponent<TMP_Text>().text = "L";
            letterCircles[currentIndex].transform.GetChild(2).GetChild(0).GetComponent<TMP_Text>().color = Color.black;

            if (letterCirclesEnds.Contains(letterCircles[currentIndex]) && lastInput)
            {
                currentWord = mod((currentWord + 1), WordSetup.wordLoop.Count);
            }
            Rotate(1);

            lastInput = true;
        }
        else if (Input.GetKeyDown(KeyCode.M))
        {
            letterCircles[currentIndex].transform.GetChild(2).GetComponent<SpriteRenderer>().color = blankTextCircle;
            letterCircles[currentIndex].transform.GetChild(2).GetChild(0).GetComponent<TMP_Text>().text = "M";
            letterCircles[currentIndex].transform.GetChild(2).GetChild(0).GetComponent<TMP_Text>().color = Color.black;

            if (letterCirclesEnds.Contains(letterCircles[currentIndex]) && lastInput)
            {
                currentWord = mod((currentWord + 1), WordSetup.wordLoop.Count);
            }
            Rotate(1);

            lastInput = true;
        }
        else if (Input.GetKeyDown(KeyCode.N))
        {
            letterCircles[currentIndex].transform.GetChild(2).GetComponent<SpriteRenderer>().color = blankTextCircle;
            letterCircles[currentIndex].transform.GetChild(2).GetChild(0).GetComponent<TMP_Text>().text = "N";
            letterCircles[currentIndex].transform.GetChild(2).GetChild(0).GetComponent<TMP_Text>().color = Color.black;

            if (letterCirclesEnds.Contains(letterCircles[currentIndex]) && lastInput)
            {
                currentWord = mod((currentWord + 1), WordSetup.wordLoop.Count);
            }
            Rotate(1);

            lastInput = true;
        }
        else if (Input.GetKeyDown(KeyCode.O))
        {
            letterCircles[currentIndex].transform.GetChild(2).GetComponent<SpriteRenderer>().color = blankTextCircle;
            letterCircles[currentIndex].transform.GetChild(2).GetChild(0).GetComponent<TMP_Text>().text = "O";
            letterCircles[currentIndex].transform.GetChild(2).GetChild(0).GetComponent<TMP_Text>().color = Color.black;

            if (letterCirclesEnds.Contains(letterCircles[currentIndex]) && lastInput)
            {
                currentWord = mod((currentWord + 1), WordSetup.wordLoop.Count);
            }
            Rotate(1);

            lastInput = true;
        }
        else if (Input.GetKeyDown(KeyCode.P))
        {
            letterCircles[currentIndex].transform.GetChild(2).GetComponent<SpriteRenderer>().color = blankTextCircle;
            letterCircles[currentIndex].transform.GetChild(2).GetChild(0).GetComponent<TMP_Text>().text = "P";
            letterCircles[currentIndex].transform.GetChild(2).GetChild(0).GetComponent<TMP_Text>().color = Color.black;

            if (letterCirclesEnds.Contains(letterCircles[currentIndex]) && lastInput)
            {
                currentWord = mod((currentWord + 1), WordSetup.wordLoop.Count);
            }
            Rotate(1);

            lastInput = true;
        }
        else if (Input.GetKeyDown(KeyCode.Q))
        {
            letterCircles[currentIndex].transform.GetChild(2).GetComponent<SpriteRenderer>().color = blankTextCircle;
            letterCircles[currentIndex].transform.GetChild(2).GetChild(0).GetComponent<TMP_Text>().text = "Q";
            letterCircles[currentIndex].transform.GetChild(2).GetChild(0).GetComponent<TMP_Text>().color = Color.black;

            if (letterCirclesEnds.Contains(letterCircles[currentIndex]) && lastInput)
            {
                currentWord = mod((currentWord + 1), WordSetup.wordLoop.Count);
            }
            Rotate(1);

            lastInput = true;
        }
        else if (Input.GetKeyDown(KeyCode.R))
        {
            letterCircles[currentIndex].transform.GetChild(2).GetComponent<SpriteRenderer>().color = blankTextCircle;
            letterCircles[currentIndex].transform.GetChild(2).GetChild(0).GetComponent<TMP_Text>().text = "R";
            letterCircles[currentIndex].transform.GetChild(2).GetChild(0).GetComponent<TMP_Text>().color = Color.black;

            if (letterCirclesEnds.Contains(letterCircles[currentIndex]) && lastInput)
            {
                currentWord = mod((currentWord + 1), WordSetup.wordLoop.Count);
            }
            Rotate(1);

            lastInput = true;
        }
        else if (Input.GetKeyDown(KeyCode.S))
        {
            letterCircles[currentIndex].transform.GetChild(2).GetComponent<SpriteRenderer>().color = blankTextCircle;
            letterCircles[currentIndex].transform.GetChild(2).GetChild(0).GetComponent<TMP_Text>().text = "S";
            letterCircles[currentIndex].transform.GetChild(2).GetChild(0).GetComponent<TMP_Text>().color = Color.black;

            if (letterCirclesEnds.Contains(letterCircles[currentIndex]) && lastInput)
            {
                currentWord = mod((currentWord + 1), WordSetup.wordLoop.Count);
            }
            Rotate(1);

            lastInput = true;
        }
        else if (Input.GetKeyDown(KeyCode.T))
        {
            letterCircles[currentIndex].transform.GetChild(2).GetComponent<SpriteRenderer>().color = blankTextCircle;
            letterCircles[currentIndex].transform.GetChild(2).GetChild(0).GetComponent<TMP_Text>().text = "T";
            letterCircles[currentIndex].transform.GetChild(2).GetChild(0).GetComponent<TMP_Text>().color = Color.black;

            if (letterCirclesEnds.Contains(letterCircles[currentIndex]) && lastInput)
            {
                currentWord = mod((currentWord + 1), WordSetup.wordLoop.Count);
            }
            Rotate(1);

            lastInput = true;
        }
        else if (Input.GetKeyDown(KeyCode.U))
        {
            letterCircles[currentIndex].transform.GetChild(2).GetComponent<SpriteRenderer>().color = blankTextCircle;
            letterCircles[currentIndex].transform.GetChild(2).GetChild(0).GetComponent<TMP_Text>().text = "U";
            letterCircles[currentIndex].transform.GetChild(2).GetChild(0).GetComponent<TMP_Text>().color = Color.black;

            if (letterCirclesEnds.Contains(letterCircles[currentIndex]) && lastInput)
            {
                currentWord = mod((currentWord + 1), WordSetup.wordLoop.Count);
            }
            Rotate(1);

            lastInput = true;
        }
        else if (Input.GetKeyDown(KeyCode.V))
        {
            letterCircles[currentIndex].transform.GetChild(2).GetComponent<SpriteRenderer>().color = blankTextCircle;
            letterCircles[currentIndex].transform.GetChild(2).GetChild(0).GetComponent<TMP_Text>().text = "V";
            letterCircles[currentIndex].transform.GetChild(2).GetChild(0).GetComponent<TMP_Text>().color = Color.black;

            if (letterCirclesEnds.Contains(letterCircles[currentIndex]) && lastInput)
            {
                currentWord = mod((currentWord + 1), WordSetup.wordLoop.Count);
            }
            Rotate(1);

            lastInput = true;
        }
        else if (Input.GetKeyDown(KeyCode.W))
        {
            letterCircles[currentIndex].transform.GetChild(2).GetComponent<SpriteRenderer>().color = blankTextCircle;
            letterCircles[currentIndex].transform.GetChild(2).GetChild(0).GetComponent<TMP_Text>().text = "W";
            letterCircles[currentIndex].transform.GetChild(2).GetChild(0).GetComponent<TMP_Text>().color = Color.black;

            if (letterCirclesEnds.Contains(letterCircles[currentIndex]) && lastInput)
            {
                currentWord = mod((currentWord + 1), WordSetup.wordLoop.Count);
            }
            Rotate(1);

            lastInput = true;
        }
        else if (Input.GetKeyDown(KeyCode.X))
        {
            letterCircles[currentIndex].transform.GetChild(2).GetComponent<SpriteRenderer>().color = blankTextCircle;
            letterCircles[currentIndex].transform.GetChild(2).GetChild(0).GetComponent<TMP_Text>().text = "X";
            letterCircles[currentIndex].transform.GetChild(2).GetChild(0).GetComponent<TMP_Text>().color = Color.black;

            if (letterCirclesEnds.Contains(letterCircles[currentIndex]) && lastInput)
            {
                currentWord = mod((currentWord + 1), WordSetup.wordLoop.Count);
            }
            Rotate(1);

            lastInput = true;
        }
        else if (Input.GetKeyDown(KeyCode.Y))
        {
            letterCircles[currentIndex].transform.GetChild(2).GetComponent<SpriteRenderer>().color = blankTextCircle;
            letterCircles[currentIndex].transform.GetChild(2).GetChild(0).GetComponent<TMP_Text>().text = "Y";
            letterCircles[currentIndex].transform.GetChild(2).GetChild(0).GetComponent<TMP_Text>().color = Color.black;

            if (letterCirclesEnds.Contains(letterCircles[currentIndex]) && lastInput)
            {
                currentWord = mod((currentWord + 1), WordSetup.wordLoop.Count);
            }
            Rotate(1);

            lastInput = true;
        }
        else if (Input.GetKeyDown(KeyCode.Z))
        {
            letterCircles[currentIndex].transform.GetChild(2).GetComponent<SpriteRenderer>().color = blankTextCircle;
            letterCircles[currentIndex].transform.GetChild(2).GetChild(0).GetComponent<TMP_Text>().text = "Z";
            letterCircles[currentIndex].transform.GetChild(2).GetChild(0).GetComponent<TMP_Text>().color = Color.black;

            if (letterCirclesEnds.Contains(letterCircles[currentIndex]) && lastInput)
            {
                currentWord = mod((currentWord + 1), WordSetup.wordLoop.Count);
            }
            Rotate(1);

            lastInput = true;
        }
    }

    void Rotate(int spaces)
    {
        letterCircles[currentIndex].transform.GetChild(1).gameObject.SetActive(false);

        int newIndex = mod((currentIndex + spaces), loopLength);
        float deg =  -newIndex / (float)loopLength * 360;

        gameObject.transform.localRotation = Quaternion.Euler(0, 0, deg);

        currentIndex = newIndex;
        letterCircles[currentIndex].transform.GetChild(1).gameObject.SetActive(true);
    }

    void CheckWord()
    {
        Debug.Log("checked");



        List<string> wordCopy = new List<string>(WordSetup.wordLoop.Count);
        WordSetup.wordLoop.ForEach((item) =>
        {
            wordCopy.Add((string)item.Clone());
        });

        List<GameObject> letterCopy = new List<GameObject>(letterCircles);
        List<GameObject> removeThese = new List<GameObject>();

        Boolean empty = true;
        for (int i = 0; i < letterCopy.Count; i++)
        {
            String text = letterCopy[i].transform.GetChild(2).GetChild(0).GetComponent<TMP_Text>().text.ToLower();

            if (!text.Equals(""))
            {
                empty = false;
                break;
            }
        }
        if (empty)
        {
            return;
        }

            //FIRST CHECK IF CORRECT
        for (int i = 0; i < letterCopy.Count; i++)
        {
            letterCopy[i].transform.GetChild(2).GetChild(0).GetComponent<TMP_Text>().color = Color.white;

            String text = letterCopy[i].transform.GetChild(2).GetChild(0).GetComponent<TMP_Text>().text.ToLower();
            for (int j = 0; j < letterCopy[i].GetComponent<Letter>().word.Count; j++)
            {
                int jWordIndex = letterCopy[i].GetComponent<Letter>().word[j];
                string word = wordCopy[jWordIndex];

                Debug.Log(i + " " + word + " " + word[letterCopy[i].GetComponent<Letter>().wordIndex[j]] + " " + text + " " + word.Substring(letterCopy[i].GetComponent<Letter>().wordIndex[j],1).Equals(text));
                if (word.Substring(letterCopy[i].GetComponent<Letter>().wordIndex[j], 1).Equals(text))
                {
                    word = word.Substring(0, letterCopy[i].GetComponent<Letter>().wordIndex[j]) + "_" + word.Substring(letterCopy[i].GetComponent<Letter>().wordIndex[j] + 1);
                    wordCopy[jWordIndex] = word;

                    letterCopy[i].GetComponent<Letter>().correct = true;
                    letterCopy[i].transform.GetChild(2).GetComponent<SpriteRenderer>().color = correctTextCircle;
                    removeThese.Add(letterCopy[i]);

                    Debug.Log("GOT EHRE");
                }
            }
        }
        foreach (GameObject removeThis in removeThese)
        {
            if (letterCopy.Contains(removeThis))
            {
                letterCopy.Remove(removeThis);
            }
        }

        //WIN CONDITION HERE!!!
        if (letterCopy.Count == 0)
        {
            Win();
            return;
        }

        //CHECK IF SAME WORD
        removeThese.Clear();
        for (int i = 0; i < letterCopy.Count; i++)
        {
            String text = letterCopy[i].transform.GetChild(2).GetChild(0).GetComponent<TMP_Text>().text.ToLower();
            for (int j = 0; j < letterCopy[i].GetComponent<Letter>().word.Count; j++)
            {
                int jWordIndex = letterCopy[i].GetComponent<Letter>().word[j];
                string word = wordCopy[jWordIndex];

                if (!text.Equals("") && word.Contains(text))
                {

                    word = word.Substring(0, word.IndexOf(text)) + "_" + word.Substring(word.IndexOf(text) + 1);
                    wordCopy[jWordIndex] = word;

                    letterCopy[i].transform.GetChild(2).GetComponent<SpriteRenderer>().color = missedTextSameWordCircle;
                    removeThese.Add(letterCopy[i]);
                }
            }
        }
        foreach (GameObject removeThis in removeThese)
        {
            if (letterCopy.Contains(removeThis))
            {
                letterCopy.Remove(removeThis);
            }
        }

        //CHECK IF DIFFERENT WORD
        removeThese.Clear();
        for (int i = 0; i < letterCopy.Count; i++)
        {
            String text = letterCopy[i].transform.GetChild(2).GetChild(0).GetComponent<TMP_Text>().text.ToLower();
            for (int j = 0; j < wordCopy.Count; j++)
            {
                string word = wordCopy[j];

                if (!text.Equals("") && word.Contains(text))
                {
                    word = word.Substring(0, word.IndexOf(text)) + "_" + word.Substring(word.IndexOf(text) + 1);
                    wordCopy[j] = word;

                    letterCopy[i].transform.GetChild(2).GetComponent<SpriteRenderer>().color = missedTextDifferentWordCirlce;
                    removeThese.Add(letterCopy[i]);
                }
            }
        }
        foreach (GameObject removeThis in removeThese)
        {
            if (letterCopy.Contains(removeThis))
            {
                letterCopy.Remove(removeThis);
            }
        }

        //GREY OUT
        for (int i = 0; i < letterCopy.Count; i++)
        {
            String text = letterCopy[i].transform.GetChild(2).GetChild(0).GetComponent<TMP_Text>().text;

            if (!text.Equals(""))
            {
                letterCopy[i].transform.GetChild(2).GetComponent<SpriteRenderer>().color = inputTextCircle;
            }
        }

        CountDown();
    }

    void Win()
    {
        UIThing.transform.GetChild(0).gameObject.SetActive(false);
        UIThing.transform.GetChild(1).gameObject.SetActive(true);
    }

    void CountDown()
    {
        int turns = int.Parse(UIThing.transform.GetChild(0).GetChild(0).GetComponent<TMP_Text>().text);
        turns--;

        if (turns == 0)
        {
            Lose();
        }
        else
        {
            UIThing.transform.GetChild(0).GetChild(0).GetComponent<TMP_Text>().text = ""+turns;
        }
    }

    void Lose()
    {
        /*foreach (GameObject circle in letterCircles)
        {
            circle.GetComponent<Animation>().Play();
        }*/

        //StartCoroutine(ExampleCoroutine(0.15f));

        foreach (GameObject circle in letterCircles)
        {
            circle.transform.GetChild(2).GetChild(0).GetComponent<TMP_Text>().text = ""+WordSetup.wordLoop[circle.GetComponent<Letter>().word[0]][circle.GetComponent<Letter>().wordIndex[0]];
            circle.transform.GetChild(2).GetComponent<SpriteRenderer>().color = wrongTextCircle;
        }

        //StartCoroutine(ExampleCoroutine(0.15f));

        UIThing.transform.GetChild(0).gameObject.SetActive(false);
        UIThing.transform.GetChild(1).gameObject.SetActive(true);
    }

    IEnumerator ExampleCoroutine(float sec)
    {
        Time.timeScale = 0f;
        yield return new WaitForSeconds(sec);
        Time.timeScale = 1f;
    }

    /*void CheckWord()
    {
        Boolean allCorrect = true;

        List<GameObject> wordLetters = new List<GameObject>();
        for (int i = WordSetup.wordLoop[currentWord].Length - 1; i >= 0; i--)
        {
            int index = mod(currentIndex - i, letterCircles.Count);
            Debug.Log(index);
            wordLetters.Add(letterCircles[index]);
        }

        int letterIndex = -1;
        foreach (GameObject letter in wordLetters)
        {
            letterIndex++;

            String text = letter.transform.GetChild(2).GetChild(0).GetComponent<TMP_Text>().text.ToLower();
            if (WordSetup.wordLoop[currentWord].Substring(letterIndex, 1).Equals(text))
            {
                letter.GetComponent<Letter>().correct = true;
                letter.transform.GetChild(2).GetComponent<SpriteRenderer>().color = correctTextCircle;

                WordSetup.usedLetters[currentWord].Add()
            }
        }

        foreach (GameObject letter in wordLetters)
        {
            letter.transform.GetChild(2).GetChild(0).GetComponent<TMP_Text>().color = Color.white;

            if (letter.GetComponent<Letter>().correct)
            {
                continue;
            }
            else
            {
                String text = letter.transform.GetChild(2).GetChild(0).GetComponent<TMP_Text>().text.ToLower();
                allCorrect = false;

                if (WordSetup.wordLoop[currentWord].Contains(text))
                {
                    letter.transform.GetChild(2).GetComponent<SpriteRenderer>().color = missedTextSameWordCircle;
                    continue;
                }

                Boolean missedButInDifferentWord = false;
                foreach (string word in WordSetup.wordLoop)
                {
                    if (word.Contains(text))
                    {
                        missedButInDifferentWord = true;
                    }
                }
                if (missedButInDifferentWord)
                {
                    letter.transform.GetChild(2).GetComponent<SpriteRenderer>().color = missedTextDifferentWordCirlce;
                    continue;
                }

                letter.transform.GetChild(2).GetComponent<SpriteRenderer>().color = inputTextCircle;
            }
        }

        if (allCorrect)
        {

        }
    }*/

    /*void CheckWord()
    {
        List<string> wordCopy = new List<string>(WordSetup.wordLoop.Count);
        WordSetup.wordLoop.ForEach((item) =>
        {
            wordCopy.Add((string)item.Clone());
        });

        int wordCount = 0;
        for (int i = 0; i <= letterCircles.Count && wordCount < wordCopy.Count; i++)
        {
            int j = i;
            if (i == letterCircles.Count)
            {
                j = 0;
            }

            String text = letterCircles[j].transform.GetChild(2).GetChild(0).GetComponent<TMP_Text>().text.ToLower();
            if (WordSetup.wordLoop[wordCount].Substring().Equals(text))
            {
                letterCircles[j].transform.GetChild(2).GetComponent<Letter>().correct = true;
                wordCopy[wordCount] = wordCopy[wordCount].Substring(0, )
            }

            if (letterCirclesEnds.Contains(letterCircles[j]) && i != 0)
            {
                wordCount++;
                i--;
            }
        }

        int letterNumCount = 0;
        int wordCount = 0;
        for (int i = 0; i < letterCircles.Count; i++)
        {
            String text = letterCircles[i].transform.GetChild(2).GetChild(0).GetComponent<TMP_Text>().text.ToLower();
            if (WordSetup.wordLoop[i].Equals(text))
            {
                letterCircles[i].transform.GetChild(2).GetComponent<Letter>().correct = true;
            }

            if (i == letterNumCount)
            {
                letterNumCount += WordSetup.wordLoop[wordCount].Length - 1;
                wordCount++;

                i--;
            }
        }
    }*/

    //Thanks to @ShreevatsaR on StackOverflow for this
    public static int mod(int x, int m)
    {
        return (x % m + m) % m;
    }
}
