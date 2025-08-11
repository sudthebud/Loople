class Letter {

    word
    wordPosition

    element
    #position
    #MouseEventFunction

    #text= ""
    #state
    

    static States = Object.freeze({
        UNSUBMITTED: 0,
        SUBMITTED_NO_EXIST: 1,
        SUBMITTED_IN_LOOP: 2,
        SUBMITTED_IN_WORD: 3,
        SUBMITTED_CORRECT: 4,
        SUBMITTED_INCORRECT: 5
    })



    constructor(word, wordPosition, position, loop) {
        this.word = word
        this.wordPosition = wordPosition
        this.#position = position

        let instance = this
        this.#MouseEventFunction = function MouseEventFunction(event) {
            if (event.repeat) return;

            loop.RotateToLetter(instance);
        }

        this.#CreateElement(loop.element)
        this.SetState(Letter.States.UNSUBMITTED, false)
        this.AddMouseListener()
    }
    

    //Temp method until we start doing custom images
    static GetCircleImage() {
        return `${assetPath}\\${imagePath}\\${circleImage}`
    }

    #CreateElement(loopElement) {
        var parent = document.createElement("div")
        parent.classList.add("letter")
        parent.classList.add("hoverable")
        loopElement.appendChild(parent)

        if (this.IsBorderLetter()) {
            var border = document.createElement("img")
            border.src = Letter.GetCircleImage()
            border.classList.add("endLetterBorder")
            parent.appendChild(border)
        }

        var body = document.createElement("img")
        body.src = Letter.GetCircleImage()
        body.classList.add("circle")
        parent.appendChild(body)

        var text = document.createElement("div")
        text.classList.add("letterText")
        parent.appendChild(text)

        this.element = parent
        this.SetPosition(this.#position)
    }

    IsBorderLetter() {
        return (this.word.length > 1) 
    }

    GetText() {
        return this.#text.toLowerCase()
    }

    HasText() {
        return (this.#text !== "")
    }

    SetText(text) {
        text = text.toUpperCase()

        this.#text = text
        this.SetState(Letter.States.UNSUBMITTED)

        this.element.classList.toggle("flip-in-out", true)
        setTimeout(() => {
            this.element.getElementsByClassName("letterText")[0].textContent = text;
        }, circle_AnimTime_FlipInOut / 2)
        setTimeout(() => {
            this.element.classList.toggle("flip-in-out", false);
        }, circle_AnimTime_FlipInOut)
    }

    SetPosition(position) {
        this.#position = position

        this.element.style.top = `${this.#position[0] + 50}%`
        this.element.style.left = `${this.#position[1] + 50}%`
    }

    GetState() {
        return this.#state
    }

    SetState(state, anim = true) {
        this.#state = state


        if (anim) { this.element.classList.toggle("flip-in-out", true) }
        setTimeout(() => {
            this.element.getElementsByClassName("letterText")[0].classList.toggle("unsubmitted", false);
            this.element.getElementsByClassName("letterText")[0].classList.toggle("submitted", false);

            if (state == Letter.States.UNSUBMITTED) {
                this.element.getElementsByClassName("letterText")[0].classList.toggle("unsubmitted", true);
            }
            else {
                this.element.getElementsByClassName("letterText")[0].classList.toggle("submitted", true);
            }


            this.element.getElementsByClassName("circle")[0].classList.toggle("unsubmitted", false);
            this.element.getElementsByClassName("circle")[0].classList.toggle("submitted", false);
            this.element.getElementsByClassName("circle")[0].classList.toggle("noExist", false);
            this.element.getElementsByClassName("circle")[0].classList.toggle("inLoop", false);
            this.element.getElementsByClassName("circle")[0].classList.toggle("inWord", false);
            this.element.getElementsByClassName("circle")[0].classList.toggle("incorrect", false);
            this.element.getElementsByClassName("circle")[0].classList.toggle("correct", false);

            switch (state) {
                case Letter.States.UNSUBMITTED:
                    this.element.getElementsByClassName("circle")[0].classList.toggle("unsubmitted", true);
                    break;
                case Letter.States.SUBMITTED_NO_EXIST:
                    this.element.getElementsByClassName("circle")[0].classList.add("submitted", true);
                    this.element.getElementsByClassName("circle")[0].classList.add("noExist", true);
                    break;
                case Letter.States.SUBMITTED_IN_LOOP:
                    this.element.getElementsByClassName("circle")[0].classList.add("submitted", true);
                    this.element.getElementsByClassName("circle")[0].classList.add("inLoop", true);
                    break;
                case Letter.States.SUBMITTED_IN_WORD:
                    this.element.getElementsByClassName("circle")[0].classList.add("submitted", true);
                    this.element.getElementsByClassName("circle")[0].classList.add("inWord", true);
                    break;
                case Letter.States.SUBMITTED_INCORRECT:
                    this.element.getElementsByClassName("circle")[0].classList.add("submitted", true);
                    this.element.getElementsByClassName("circle")[0].classList.add("incorrect", true);
                    break;
                case Letter.States.SUBMITTED_CORRECT:
                    this.element.getElementsByClassName("circle")[0].classList.add("submitted", true);
                    this.element.getElementsByClassName("circle")[0].classList.add("correct", true);
                    break;
            }
        }, anim ? (circle_AnimTime_FlipInOut / 2) : 0)
        if (anim) {
            setTimeout(() => {
                this.element.classList.toggle("flip-in-out", false)
            }, circle_AnimTime_FlipInOut)
        }
    }

    AnimateFlipIn() {
        this.element.classList.toggle("flip-in", true)
        this.element.style.visibility = "visible"
        // clickAudio.play() 
        //Disabled for now because browsers block autoplay
        setTimeout(() => {
            this.element.classList.toggle("flip-in", false);
        }, circle_AnimTime_FlipIn)
    }

    AnimateFlipOut() {
        this.element.classList.toggle("flip-out", true)
        // clickAudio.play()
        setTimeout(() => {
            this.element.style.visibility = "hidden"
            this.element.classList.toggle("flip-out", false);
        }, circle_AnimTime_FlipOut)
    }

    AnimateFlipInOut() {
        this.element.classList.toggle("flip-in-out", true)
        // clickAudio.play()
        setTimeout(() => {
            this.element.classList.toggle("flip-in-out", false);
        }, circle_AnimTime_FlipInOut)
    }

    AnimateInvalid() {
        this.element.classList.toggle("invalid", true)
        this.AnimateFlipInOut()

        setTimeout(() => {
            this.element.getElementsByClassName("circle")[0].classList.toggle("invalid", true);
            this.element.getElementsByClassName("letterText")[0].classList.toggle("invalid", true);
        }, circle_AnimTime_FlipInOut / 2)
        setTimeout(() => {
            this.element.classList.toggle("invalid", false);
            this.AnimateFlipInOut()
        }, letter_AnimTime_Invalid)
        setTimeout(() => {
            this.element.getElementsByClassName("circle")[0].classList.toggle("invalid", false);
            this.element.getElementsByClassName("letterText")[0].classList.toggle("invalid", false);
        }, letter_AnimTime_Invalid + circle_AnimTime_FlipInOut / 2)
    }

    AddMouseListener() {
        this.element.addEventListener("click", this.#MouseEventFunction)
    }

    RemoveMouseListener() {
        this.element.removeEventListener("click", this.#MouseEventFunction)
    }

}




class Loop {

    element
    #rotate = 0

    letterList = []
    letterIndex = 0

    constructor(element) {
        this.element = element

        this.#CreateLoop()
    }

    #CreateLoop() {
        let wordLoopLength = 0
        for (let i = 0; i < WordSetup.wordLoop.length; i++) {
            for (let j = 0; j < WordSetup.wordLoop[i].length; j++) {
                if (j == 0) {
                    continue
                }
                wordLoopLength++
            }
        }

        let scale = GetLoopCircleScale(wordLoopLength)

        for (let i = 0; i < WordSetup.wordLoop.length; i++) {
            let wordString = WordSetup.wordLoop[i]

            for (let j = 0; j < wordString.length; j++) {
                if (j == wordString.length - 1) {
                    continue
                }
                else {
                    let word = [i]
                    let wordPosition = [j]

                    let angle = (this.letterList.length / wordLoopLength* 360 - 180) * Math.PI / 180
                    let position = [-50 * Math.cos(angle), -50 * Math.sin(angle)]

                    if (j == 0) {
                        word.unshift(Mod((i - 1), WordSetup.wordLoop.length))
                        wordPosition.unshift(WordSetup.wordLoop[word[0]].length - 1)
                    }

                    let letter = new Letter(word, wordPosition, position, this)
                    letter.element.style.scale = scale
                    letter.element.style.visibility = "hidden"
                    this.letterList.push(letter)
                }
            }
        }

        for (let i = 0; i < this.letterList.length; i++) {
            this.letterList[i].AddMouseListener()
            
            setTimeout(() => {
                this.letterList[i].AnimateFlipIn();
            }, circleWaitUntilAppear + 35 * i)
        }
    }

    GetTypedWords() {
        let typedWordList = []
        let typedWordIndexList = []

        let typedWord = ""
        let typedWordIndex = []
        for (let i = 0; i < this.letterList.length; i++) {
            let letter = this.letterList[i]

            if (letter.IsBorderLetter() && i != 0) {
                typedWord += letter.GetText()
                typedWordList.push(typedWord)
                typedWord = ""

                typedWordIndex.push(i)
                typedWordIndexList.push(typedWordIndex)
                typedWordIndex = []
            }

            typedWord += letter.GetText()

            typedWordIndex.push(i)
        }
        typedWord += this.letterList[0].GetText()
        typedWordIndex.push(0)
        typedWordList.push(typedWord)
        typedWordIndexList.push(typedWordIndex)

        return [typedWordList, typedWordIndexList]
    }

    Rotate(numRotations) {
        this.letterIndex = Mod(this.letterIndex + numRotations, this.letterList.length)
        this.#rotate = ((1 / this.letterList.length) * 2 * Math.PI * numRotations) + this.#rotate

        this.element.style.rotate = `${this.#rotate}rad`

        for (let i = 0; i < this.letterList.length; i++) {
            this.letterList[i].element.style.rotate = `${-this.#rotate}rad`
        }
    }

    RotateToLetter(letter) {
        if (this.letterList.includes(letter)) {
            let indexOf = this.letterList.indexOf(letter)
            if (Mod(indexOf - this.letterIndex, this.letterList.length) <= Mod(this.letterIndex - indexOf, this.letterList.length)) {
                this.Rotate(Mod(indexOf - this.letterIndex, this.letterList.length))
            }
            else {
                this.Rotate(-Mod(this.letterIndex - indexOf, this.letterList.length))
            }
        }
    }

    TypeLetter(letter) {
        this.letterList[this.letterIndex].SetText(letter)
        this.Rotate(1)
    }

    Submit() {
        //Check if any spaces are blank
        for (let i = 0; i < this.letterList.length; i++) {
            if (!this.letterList[i].HasText()) {
                if (!this.element.classList.contains("invalid-submit")) {
                    this.element.classList.add("invalid-submit", true)
                    setTimeout(() => {
                        this.element.classList.remove("invalid-submit", false);
                    }, 1000)
                }
                return
            }
        }

        //Check if same as previous guess
        //DO HERE

        //Check if any word is invalid
        let submitWordList = this.GetTypedWords()
        let invalidWords = false
        for (let i = 0; i < submitWordList[0].length; i++) {
            if (!WordSetup.wordList.has(submitWordList[0][i])){
                invalidWords = true

                if (!this.element.classList.contains("invalid-submit")) {
                    this.element.classList.add("invalid-submit", true)
                    setTimeout(() => {
                        this.element.classList.remove("invalid-submit", false);
                    }, 1000)
                }

                let wordIndex = submitWordList[1][i]
                for (let j = 0; j < wordIndex.length; j++) {
                    let wordIndexOf = wordIndex[j]
                    if (!this.letterList[wordIndexOf].element.classList.contains("invalid")
                        && !this.letterList[wordIndexOf].element.getElementsByClassName("circle")[0].classList.contains("invalid")) {
                        this.letterList[wordIndexOf].AnimateInvalid()
                    }
                }
            }
        }
        if (invalidWords) return
        
        //Recreate word loop
        let submitWordLoop = []
        for (let i = 0; i < WordSetup.wordLoop.length; i++) {
            submitWordLoop.push(WordSetup.wordLoop[i])
        }

        //Check if any letters are correct
        for (let i = 0; i < this.letterList.length; i++) {
            let letter = this.letterList[i]

            for (let j = 0; j < letter.word.length; j++) {
                let word = submitWordLoop[letter.word[j]]
                if (word.charAt(letter.wordPosition[j]) === letter.GetText()) {
                    letter.SetState(Letter.States.SUBMITTED_CORRECT)
                    submitWordLoop[letter.word[j]] = `${word.substring(0, letter.wordPosition[j])}_${word.substring(letter.wordPosition[j]+1)}`
                }
            }
        }
        console.log(submitWordLoop)

        //Check if any letters are present in the word
        for (let i = 0; i < this.letterList.length; i++) {
            let letter = this.letterList[i]
            if (letter.GetState() == Letter.States.SUBMITTED_CORRECT) continue

            for (let j = 0; j < letter.word.length; j++) {
                let word = submitWordLoop[letter.word[j]]
                if (word.includes(letter.GetText())) {
                    letter.SetState(Letter.States.SUBMITTED_IN_WORD)
                    let indexOf = word.indexOf(letter.GetText())
                    submitWordLoop[letter.word[j]] = `${word.substring(0, indexOf)}_${word.substring(indexOf+1)}`
                    break
                }
            }
        }
        console.log(submitWordLoop)

        //Check if any letters are present in the loop
        for (let i = 0; i < this.letterList.length; i++) {
            let letter = this.letterList[i]
            if (letter.GetState() == Letter.States.SUBMITTED_CORRECT
                || letter.GetState() == Letter.States.SUBMITTED_IN_WORD) continue

            for (let j = 0; j < submitWordLoop.length; j++) {
                if (letter.word.includes(j)) continue

                let word = submitWordLoop[j]
                if (word.includes(letter.GetText())) {
                    letter.SetState(Letter.States.SUBMITTED_IN_LOOP)
                    let indexOf = word.indexOf(letter.GetText())
                    submitWordLoop[j] = `${word.substring(0, indexOf)}_${word.substring(indexOf+1)}`
                    break
                }
            }
        }
        console.log(submitWordLoop)

        //Mark any other letters
        for (let i = 0; i < this.letterList.length; i++) {
            let letter = this.letterList[i]
            if (letter.GetState() == Letter.States.SUBMITTED_CORRECT
                || letter.GetState() == Letter.States.SUBMITTED_IN_WORD
                || letter.GetState() == Letter.States.SUBMITTED_IN_LOOP) continue

            letter.SetState(Letter.States.SUBMITTED_NO_EXIST)
        }

        //Create word loop history

        this.RotateToLetter(this.letterList[0])
    }

}