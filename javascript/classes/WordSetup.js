class WordSetup {

    static #wordDictThreeLetter
    static #wordDictFourLetter
    static #wordDictFiveLetter
    static #wordDictSixLetter
    static #wordDictSevenLetter

    static wordList = new Set()

    static wordLoop = []

    static turns


    //Function to read JSON files
    static async #ReadFile(fileName) {
        return await fetch(`${assetPath}/${datasetPath}/${fileName}.json`)
            .then((r) => r.json())
            .then((j) => { return j })
    }

    //Function to obtain word database objects
    static async GenerateWordDatabase() {
        this.#wordDictThreeLetter = await this.#ReadFile("threeLetter")
        this.#wordDictFourLetter = await this.#ReadFile("fourLetter")
        this.#wordDictFiveLetter = await this.#ReadFile("fiveLetter")
        this.#wordDictSixLetter = await this.#ReadFile("sixLetter")
        this.#wordDictSevenLetter = await this.#ReadFile("sevenLetter")

        let wordDictList = [
            this.#wordDictThreeLetter,
            this.#wordDictFourLetter,
            this.#wordDictFiveLetter,
            this.#wordDictSixLetter,
            this.#wordDictSevenLetter
        ]
        for (let i = 0; i < wordDictList.length; i++) {
            let wordDict = wordDictList[i]
            let keys = Object.keys(wordDict)

            for (let j = 0; j < keys.length; j++) {
                let words = wordDict[keys[j]]

                for (let k = 0; k < words.length; k++) {
                    this.wordList.add(words[k])
                }
            }
        }
    }

    //Function with algorithm to create word loop array
    static GenerateWordLoop() {
        this.turns = currentDifficulty.numTurns
        var numWords = currentDifficulty.numWords

        var wordDictListFull = [
            this.#wordDictThreeLetter,
            this.#wordDictFourLetter,
            this.#wordDictFiveLetter,
            this.#wordDictSixLetter,
            this.#wordDictSevenLetter
        ]
        var wordDictList = []
        for (let i = 0; i < currentDifficulty.wordDictListIndices.length; i++) {
            wordDictList.push(wordDictListFull[currentDifficulty.wordDictListIndices[i]])
        }

        this.wordLoop = []
        while (this.wordLoop.length < numWords) {
            var randomWordDict = wordDictList[RandomInt(wordDictList.length)]


            //Finds first word
            if (this.wordLoop.length == 0) {
                var key = Object.keys(randomWordDict)[RandomInt(Object.keys(randomWordDict).length)]
                var randomWord = randomWordDict[key][RandomInt(randomWordDict[key].length)]
            }

            //Finds last word, which must start with last letter of previous word and end with first letter of beginning word
            else if (this.wordLoop.length == numWords - 1) {
                var firstLetter = this.wordLoop[this.wordLoop.length - 1].charAt(this.wordLoop[this.wordLoop.length - 1].length -1)
                var lastLetter = this.wordLoop[0].charAt(0)

                var key = `${firstLetter}${lastLetter}`
                if (!(key in randomWordDict)) {
                    this.wordLoop = []
                    continue
                }
                else {
                    var randomWord = randomWordDict[key][RandomInt(randomWordDict[key].length)]
                }
            }

            //Finds a word that starts with last letter of the previous word
            else {
                var firstLetter = this.wordLoop[this.wordLoop.length - 1].charAt(this.wordLoop[this.wordLoop.length - 1].length - 1)

                var validKeys = []
                Object.keys(randomWordDict).forEach((key) => {
                    if (key.charAt(0) === firstLetter) {
                        validKeys.push(key)
                    }
                })

                if (validKeys.length == 0) {
                    this.wordLoop = []
                    continue
                }
                else {
                    var key = validKeys[RandomInt(validKeys.length)]
                    var randomWord = randomWordDict[key][RandomInt(randomWordDict[key].length)]
                }
            }


            if (this.wordLoop.includes(randomWord)) {
                this.wordLoop = []
                continue
            }
            this.wordLoop.push(randomWord)
        }
    }

}