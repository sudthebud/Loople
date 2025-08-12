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



    constructor(word, wordPosition, position, loop, historical = false, letter = null) {
        if (!historical) {
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
        else {
            this.word = word
            this.wordPosition = wordPosition
            this.#position = position

            this.#InstantiateHistoricalLetter(loop, letter)
        }
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

    #InstantiateHistoricalLetter(loop, letter) {
        this.element = letter.element.cloneNode(true)
        this.element.classList.add("historical")
        loop.element.appendChild(this.element)

        this.TurnOffAllCurrentAnims()
        this.SetState(letter.GetState(), false)
        this.#text = letter.GetText()
    }

    CreateHistoricalLetter(loop) {
        return new Letter(this.word, this.wordPosition, this.#position, loop, true, this)
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

    SetState(state, anim = true, animDelay = 0) {
        this.#state = state


        setTimeout(() => {
            if (anim) { this.element.classList.toggle("flip-in-out", true); }
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
            }, anim ? (circle_AnimTime_FlipInOut / 2) : 0);
            if (anim) {
                setTimeout(() => {
                    this.element.classList.toggle("flip-in-out", false);
                }, circle_AnimTime_FlipInOut);
            }
        }, animDelay)
    }

    AnimateFlipIn() {
        this.element.classList.toggle("flip-in", true)
        // this.element.style.visibility = "visible"
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
            // this.element.style.visibility = "hidden"
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

    AnimateWin() {
        this.element.classList.toggle("win_Anim", true)
        this.element.classList.toggle("win", true)

        setTimeout(() => {
            this.element.classList.toggle("win", false)
        }, circle_AnimTime_Win)
        setTimeout(() => {
            this.element.classList.toggle("win_Anim", false)
        }, circle_AnimTime_Win)
    }

    TurnOffAllCurrentAnims() {
        this.element.classList.toggle("flip-in", false)
        this.element.classList.toggle("flip-out", false)
        this.element.classList.toggle("flip-in-out", false)
        this.element.classList.toggle("currentIndex", false)
        this.element.classList.toggle("win", false)
        this.element.classList.toggle("hoverable", false)

        this.element.getElementsByClassName("circle")[0].classList.toggle("invalid", false)

        this.element.getElementsByClassName("letterText")[0].classList.toggle("invalid", false)
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

    #historical = false

    constructor(element, historical = false, letterList = [], rotate = 0) {
        if (!historical) {
            this.element = element

            this.#CreateLoop()
        }
        else {
            this.element = element.cloneNode()
            element.parentNode.appendChild(this.element)
            this.#historical = historical

            this.#InstantiateHistoricalLoop(letterList, rotate)
        }
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
                    // letter.element.style.visibility = "hidden"
                    letter.element.classList.toggle("showOrHide", true)
                    this.letterList.push(letter)
                }
            }
        }

        this.Show(true)
        for (let i = 0; i < this.letterList.length; i++) {
            this.letterList[i].AddMouseListener()
            
            // setTimeout(() => {
            //     this.letterList[i].element.classList.toggle("showOrHide", false)
            //     this.letterList[i].AnimateFlipIn();
            // }, circleWaitUntilAppear + 35 * i)
        }
        setTimeout(() => {
            this.HighlightCurrentLetter()
        }, circle_AnimTime_DelayBtwStartOrEndFlip * this.letterList.length)
    }

    #InstantiateHistoricalLoop(letterList, rotate) {
        this.element.classList.add("historical")
        this.element.style.visibility = "hidden"

        for (let i = 0; i < letterList.length; i++) {
            this.letterList.push(letterList[i].CreateHistoricalLetter(this))
        }

        this.#rotate = rotate
    }

    CreateHistoricaLoop() {
        return new Loop(this.element, true, this.letterList, this.#rotate)
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

    Rotate(numRotations, highlight = true, highlightDelay = 0) {
        if (!highlight 
            || (numRotations > 0 || numRotations < 0) 
            || (numRotations == 0 && highlightDelay > 0)) { 
                this.UnhighlightCurrentLetter() 
                //Don't really like doing this but I've experienced a glitch so just to be sure
                setTimeout(() => {
                    this.UnhighlightCurrentLetter()
                }, loop_AnimTime_Rotate - 1)
            }

        this.letterIndex = Mod(this.letterIndex + numRotations, this.letterList.length)
        this.#rotate = ((1 / this.letterList.length) * 2 * Math.PI * numRotations) + this.#rotate

        this.element.style.rotate = `${this.#rotate}rad`

        for (let i = 0; i < this.letterList.length; i++) {
            this.letterList[i].element.style.rotate = `${-this.#rotate}rad`
        }

        if (!this.#historical && loopHistory.length > 0) {
            for (let i = 0; i < loopHistory.length; i++) {
                loopHistory[i].Rotate(numRotations)
            }
        }

        if (highlight 
            && ((numRotations > 0 || numRotations < 0) || (numRotations == 0 && highlightDelay > 0))) {
            setTimeout(() => {
                this.HighlightCurrentLetter()
            }, Math.max(loop_AnimTime_Rotate, highlightDelay))
        }
    }

    RotateToLetter(letter, highlight = true, highlightDelay = 0) {
        if (this.letterList.includes(letter)) {
            let indexOf = this.letterList.indexOf(letter)
            if (Mod(indexOf - this.letterIndex, this.letterList.length) <= Mod(this.letterIndex - indexOf, this.letterList.length)) {
                this.Rotate(Mod(indexOf - this.letterIndex, this.letterList.length), highlight, highlightDelay)
            }
            else {
                this.Rotate(-Mod(this.letterIndex - indexOf, this.letterList.length), highlight, highlightDelay)
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

        let submitWordList = this.GetTypedWords()
        //Check if same as previous guess
        if (loopHistory.length > 0) {
            let previousWordList = loopHistory[loopHistory.length - 1].GetTypedWords()[0]

            let sameAsPreviousHistory = true
            for (let i = 0; i < previousWordList.length; i++) {
                if (submitWordList[0][i] !== previousWordList[i]) {
                    sameAsPreviousHistory = false
                }
            }

            if (sameAsPreviousHistory) {
                if (!this.element.classList.contains("invalid-submit")) {
                    this.element.classList.add("invalid-submit", true)
                    setTimeout(() => {
                        this.element.classList.remove("invalid-submit", false);
                    }, 1000)
                }
                return
            }
        }

        //Check if any word is invalid
        // let invalidWords = false
        // for (let i = 0; i < submitWordList[0].length; i++) {
        //     if (!WordSetup.wordList.has(submitWordList[0][i])){
        //         invalidWords = true

        //         if (!this.element.classList.contains("invalid-submit")) {
        //             this.element.classList.add("invalid-submit", true)
        //             setTimeout(() => {
        //                 this.element.classList.remove("invalid-submit", false);
        //             }, 1000)
        //         }

        //         let wordIndex = submitWordList[1][i]
        //         for (let j = 0; j < wordIndex.length; j++) {
        //             let wordIndexOf = wordIndex[j]
        //             if (!this.letterList[wordIndexOf].element.classList.contains("invalid")
        //                 && !this.letterList[wordIndexOf].element.getElementsByClassName("circle")[0].classList.contains("invalid")) {
        //                 this.letterList[wordIndexOf].AnimateInvalid()
        //             }
        //         }
        //     }
        // }
        // if (invalidWords) return
        
        //Recreate word loop
        let submitWordLoop = []
        for (let i = 0; i < WordSetup.wordLoop.length; i++) {
            submitWordLoop.push(WordSetup.wordLoop[i])
        }

        //Check if any letters are correct
        let win = true
        for (let i = 0; i < this.letterList.length; i++) {
            let letter = this.letterList[i]

            for (let j = 0; j < letter.word.length; j++) {
                let word = submitWordLoop[letter.word[j]]
                if (word.charAt(letter.wordPosition[j]) === letter.GetText()) {
                    letter.SetState(Letter.States.SUBMITTED_CORRECT, true, circle_AnimTime_DelayBtwSubmitFlip * i)
                    submitWordLoop[letter.word[j]] = `${word.substring(0, letter.wordPosition[j])}_${word.substring(letter.wordPosition[j]+1)}`
                }
                else {
                    win = false
                }
            }
        }

        if (!win) {
            //Check if any letters are present in the word
            for (let i = 0; i < this.letterList.length; i++) {
                let letter = this.letterList[i]
                if (letter.GetState() == Letter.States.SUBMITTED_CORRECT) continue

                for (let j = 0; j < letter.word.length; j++) {
                    let word = submitWordLoop[letter.word[j]]
                    if (word.includes(letter.GetText())) {
                        letter.SetState(Letter.States.SUBMITTED_IN_WORD, true, circle_AnimTime_DelayBtwSubmitFlip * i)
                        let indexOf = word.indexOf(letter.GetText())
                        submitWordLoop[letter.word[j]] = `${word.substring(0, indexOf)}_${word.substring(indexOf+1)}`
                        break
                    }
                }
            }

            //Check if any letters are present in the loop
            for (let i = 0; i < this.letterList.length; i++) {
                let letter = this.letterList[i]
                if (letter.GetState() == Letter.States.SUBMITTED_CORRECT
                    || letter.GetState() == Letter.States.SUBMITTED_IN_WORD) continue

                for (let j = 0; j < submitWordLoop.length; j++) {
                    if (letter.word.includes(j)) continue

                    let word = submitWordLoop[j]
                    if (word.includes(letter.GetText())) {
                        letter.SetState(Letter.States.SUBMITTED_IN_LOOP, true, circle_AnimTime_DelayBtwSubmitFlip * i)
                        let indexOf = word.indexOf(letter.GetText())
                        submitWordLoop[j] = `${word.substring(0, indexOf)}_${word.substring(indexOf+1)}`
                        break
                    }
                }
            }

            //Mark any other letters
            for (let i = 0; i < this.letterList.length; i++) {
                let letter = this.letterList[i]
                if (letter.GetState() == Letter.States.SUBMITTED_CORRECT
                    || letter.GetState() == Letter.States.SUBMITTED_IN_WORD
                    || letter.GetState() == Letter.States.SUBMITTED_IN_LOOP) continue

                letter.SetState(Letter.States.SUBMITTED_NO_EXIST, true, circle_AnimTime_DelayBtwSubmitFlip * i)
            }
        }

        //Create word loop history
        setTimeout(() => {
            loopHistory.push(this.CreateHistoricaLoop());
            if (loopHistoryIndex == loopHistory.length - 2) {
                loopHistoryMove(1);
            }
        }, circle_AnimTime_DelayBtwSubmitFlip * this.letterList.length)

        this.RotateToLetter(this.letterList[0], !win, circle_AnimTime_DelayBtwSubmitFlip * this.letterList.length)

        if (win){
            this.Win()
        }
    }

    Show(delay = false) {
        if (this.element.style.visibility !== "visible") {
            this.element.style.visibility = "visible"
            for (let i = 0; i < this.letterList.length; i++) {
                if (!delay) {
                    this.letterList[i].AnimateFlipIn()
                    this.letterList[i].element.classList.toggle("showOrHide", false)
                }
                else {
                    setTimeout(() => {
                        this.letterList[i].AnimateFlipIn()
                        this.letterList[i].element.classList.toggle("showOrHide", false)
                    }, circle_AnimTime_DelayBtwStartOrEndFlip * i)
                }
            }
        }
    }

    Hide(delay = false) {
        if (this.element.style.visibility !== "hidden") {
            for (let i = 0; i < this.letterList.length; i++) {
                if (!delay) {
                    this.letterList[i].AnimateFlipOut()
                    setTimeout(() => {
                        this.letterList[i].element.classList.toggle("showOrHide", true)
                    }, circle_AnimTime_FlipOut * 0.95)
                }
                else {
                    setTimeout(() => {
                        this.letterList[i].AnimateFlipOut()
                    }, circle_AnimTime_DelayBtwStartOrEndFlip * i)
                    setTimeout(() => {
                        this.letterList[i].element.classList.toggle("showOrHide", true)
                    }, circle_AnimTime_FlipOut * 0.95 + circle_AnimTime_DelayBtwStartOrEndFlip * i)
                }
            }
            setTimeout(() => {
                this.element.style.visibility = "hidden";
            }, delay ? (circle_AnimTime_FlipOut * 0.95 + circle_AnimTime_DelayBtwStartOrEndFlip * this.letterList.length) : (circle_AnimTime_FlipOut * 0.95))
        }
    }

    Win() {
        loopHistoryHide()

        setTimeout(() => {
            for (let i = 0; i < this.letterList.length; i++) {
                setTimeout(() => {
                    this.letterList[i].AnimateWin();
                }, circle_AnimTime_DelayBtwWin * i)
            }
            setTimeout(() => {
                this.letterList[0].AnimateWin();
            }, circle_AnimTime_DelayBtwWin * this.letterList.length)

            setTimeout(() => {
                this.Hide(true);
            }, circle_AnimTime_DelayBtwWin * (this.letterList.length + 1) + 2000)
        }, circle_AnimTime_DelayBtwSubmitFlip * this.letterList.length + 2000)
    }

    HighlightCurrentLetter() {
        if (!this.#historical) {
            this.letterList[this.letterIndex].element.classList.toggle("currentIndex", true)
            this.letterList[this.letterIndex].element.classList.toggle("hoverable", false)
        }
    }

    UnhighlightCurrentLetter() {
        if (!this.#historical) {
            this.letterList[this.letterIndex].element.classList.toggle("currentIndex", false)
            this.letterList[this.letterIndex].element.classList.toggle("hoverable", true)
        }
    }

}