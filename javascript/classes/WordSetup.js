class WordSetup {

    static #wordDictThreeLetter
    static #wordDictFourLetter
    static #wordDictFiveLetter
    static #wordDictSixLetter
    static #wordDictSevenLetter

    static wordList

    static wordLoop


    static #ReadFile(fileName) {
        var request = new XMLHttpRequest()
        request.open("GET", `..\\..\\${assetPath}\\${datasetPath}\\${fileName}.json`, false)
        request.send(null)
        var jsonResult = JSON.parse(request.responseText)
        console.log(jsonResult)
        return jsonResult
    }

    static GetWordDatabase() {
        console.log(this.#ReadFile("threeLetter"))
        this.#wordDictThreeLetter = this.#ReadFile("threeLetter")
        this.#wordDictFourLetter = this.#ReadFile("fourLetter")
        this.#wordDictFiveLetter = this.#ReadFile("fiveLetter")
        this.#wordDictSixLetter = this.#ReadFile("sixLetter")
        this.#wordDictSevenLetter = this.#ReadFile("sevenLetter")
        
        return Object.keys(this.#wordDictThreeLetter).length
    }

    static GetWordLoop() {
        var numWords = maxNumWords

        this.wordLoop = []

        var wordDictList = [
            this.#wordDictThreeLetter,
            this.#wordDictFourLetter,
            this.#wordDictFiveLetter,
            this.#wordDictSixLetter,
            this.#wordDictSevenLetter
        ]

        while (this.wordLoop.length < numWords) {
            var randomWordDict = wordDictList[RandomInt(wordDictList.length)]


            if (this.wordLoop.length == 0) {
                var key = Object.keys(randomWordDict)[RandomInt(Object.keys(randomWordDict).length)]
                var randomWord = randomWordDict[key][RandomInt(randomWordDict[key].length)]
            }

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