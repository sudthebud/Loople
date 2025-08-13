class Loop {

    element
    #rotate = 0

    letterList = []
    letterIndex = 0

    #historical = false

    #submit = false //Needed to guard against inputs and animations that occur after pressing submit

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

        toggleGameEventListeners(false, 0, circle_AnimTime_DelayBtwStartOrEndFlip * this.letterList.length)
        this.ToggleHoverableLetters(false, 0, circle_AnimTime_DelayBtwStartOrEndFlip * this.letterList.length)
        setTimeout(() => {
            this.ToggleHighlightCurrentLetter(true)
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

    Rotate(numRotations, submit = false, highlight = true, highlightDelay = 0) {
        if (!this.#submit || (this.#submit && submit)) {
            if (!highlight 
                || (numRotations > 0 || numRotations < 0) 
                || (numRotations == 0 && highlightDelay > 0)) { 
                    this.ToggleHighlightCurrentLetter(false)
                    //Don't really like doing this but I've experienced a glitch so just to be sure
                    setTimeout(() => {
                        this.ToggleHighlightCurrentLetter(false);
                    }, loop_AnimTime_Rotate - 1)
                }

            this.letterIndex = Mod(this.letterIndex + numRotations, this.letterList.length)
            this.#rotate = ((1 / this.letterList.length) * 2 * Math.PI * numRotations) + this.#rotate

            this.element.style.rotate = `${this.#rotate}rad`

            for (let i = 0; i < this.letterList.length; i++) {
                this.letterList[i].element.style.rotate = `${-this.#rotate}rad`
            }

            if (!this.#historical && loopHistory.length > 0) {
                loopHistoryRotate(numRotations)
            }

            if (highlight 
                && ((numRotations > 0 || numRotations < 0) || (numRotations == 0 && highlightDelay > 0))) {
                setTimeout(() => {
                    //Errors occur if you click and then immediately submit, very rare but not sure why it's happening...
                    //Also if you type letters way too fast and press submit, letters can be highlighted but not clicked on, the method in the Letter class is getting run for some reason between submitting and this part
                    if (!this.#submit || (this.#submit && submit)) {
                        this.ToggleHighlightCurrentLetter(true);
                        toggleGameEventListeners(true, 0.1);
                        this.ToggleHoverableLetters(true, 0.1, 0, submit);
                        this.#submit = false
                    }
                }, Math.max(loop_AnimTime_Rotate, highlightDelay))
            }
        }
    }

    RotateToLetter(letter, submit = false, highlight = true, highlightDelay = 0) {
        if ((!this.#submit || submit) && this.letterList.includes(letter)) {
            toggleGameEventListeners(false)
            this.ToggleHoverableLetters(false, 0, 0, submit)

            let indexOf = this.letterList.indexOf(letter)
            if (Mod(indexOf - this.letterIndex, this.letterList.length) <= Mod(this.letterIndex - indexOf, this.letterList.length)) {
                this.Rotate(Mod(indexOf - this.letterIndex, this.letterList.length), submit, highlight, highlightDelay)
            }
            else {
                this.Rotate(-Mod(this.letterIndex - indexOf, this.letterList.length), submit, highlight, highlightDelay)
            }
        }
    }

    TypeLetter(letter) {
        if (!this.#submit) {
            this.letterList[this.letterIndex].SetText(letter)
            this.Rotate(1)
        }
    }

    Submit() {
        if (this.#submit) return

        this.#submit = true
        toggleGameEventListeners(false)
        this.ToggleHoverableLetters(false, 0, 0, true)

        //Check if any spaces are blank
        for (let i = 0; i < this.letterList.length; i++) {
            if (!this.letterList[i].HasText()) {
                if (!this.element.classList.contains("invalid-submit")) {
                    this.element.classList.add("invalid-submit", true)
                    setTimeout(() => {
                        this.element.classList.remove("invalid-submit", false);
                        toggleGameEventListeners(true, 0.1);
                        this.ToggleHoverableLetters(true, 0.1, 0, true);
                        this.#submit = false;
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
                        toggleGameEventListeners(true, 0.1);
                        this.ToggleHoverableLetters(true, 0.1, 0, true);
                        this.#submit = false;
                    }, 1000)
                }
                return
            }
        }

        //Check if any word is invalid
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
        if (invalidWords) {
            toggleGameEventListeners(true, letter_AnimTime_Invalid + circle_AnimTime_FlipInOut)
            this.ToggleHoverableLetters(true, letter_AnimTime_Invalid + circle_AnimTime_FlipInOut, 0, true)
            setTimeout(() => {
                this.#submit = false;
            }, letter_AnimTime_Invalid + circle_AnimTime_FlipInOut)
            return
        }
        
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

        currentTurns++

        let lose = (WordSetup.turns - currentTurns > 0 || win) ? false : true

        //Create word loop history and do UI stuff
        setTimeout(() => {
            loopHistoryAdd(this.CreateHistoricaLoop());
            counterSetText();
        }, circle_AnimTime_DelayBtwSubmitFlip * this.letterList.length)

        this.RotateToLetter(this.letterList[0], true, (!win && !lose), circle_AnimTime_DelayBtwSubmitFlip * this.letterList.length)

        if (lose) {
            this.Lose()
        }
        else if (win){
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
        toggleGameEventListeners(false)
        this.ToggleHoverableLetters(false, 0, 0, true)
        toggleEnabledLeftHistoryButton(false)
        toggleEnabledRightHistoryButton(false)
        historyTurnPillSetText(true)
        loopHistoryHide()

        //In case of button spam
        setTimeout(() => {
            toggleEnabledLeftHistoryButton(false);
            toggleEnabledRightHistoryButton(false);
            historyTurnPillSetText(true);
            loopHistoryHide();
        }, Math.max(loop_AnimTime_Rotate, circle_AnimTime_DelayBtwSubmitFlip * this.letterList.length))

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

            setTimeout(() => {
                this.DestroyLoop()
            }, circle_AnimTime_DelayBtwWin * (this.letterList.length + 1) + 2000 + (circle_AnimTime_FlipOut * 0.95 + circle_AnimTime_DelayBtwStartOrEndFlip * this.letterList.length))
        }, Math.max(loop_AnimTime_Rotate, circle_AnimTime_DelayBtwSubmitFlip * this.letterList.length) + 2000)
    }

    Lose() {
        toggleGameEventListeners(false)
        this.ToggleHoverableLetters(false, 0, 0, true)
        toggleEnabledLeftHistoryButton(false)
        toggleEnabledRightHistoryButton(false)
        historyTurnPillSetText(true)
        loopHistoryHide()

        //In case of button spam
        setTimeout(() => {
            toggleEnabledLeftHistoryButton(false);
            toggleEnabledRightHistoryButton(false);
            historyTurnPillSetText(true);
            loopHistoryHide();
        }, Math.max(loop_AnimTime_Rotate, circle_AnimTime_DelayBtwSubmitFlip * this.letterList.length))

        setTimeout(() => {
            for (let i = 0; i < this.letterList.length; i++) {
                setTimeout(() => {
                    let word = WordSetup.wordLoop[this.letterList[i].word[0]];
                    let wordChar = word.charAt(this.letterList[i].wordPosition[0]);

                    this.letterList[i].SetText(wordChar, Letter.States.SUBMITTED_INCORRECT);
                }, circle_AnimTime_DelayBtwLose * i)
            }

            setTimeout(() => {
                this.Hide(true)
            }, Math.max(loop_AnimTime_Rotate, circle_AnimTime_DelayBtwLose * this.letterList.length) + 4000)

            setTimeout(() => {
                this.DestroyLoop()
            }, Math.max(loop_AnimTime_Rotate, circle_AnimTime_DelayBtwLose * this.letterList.length) + 4000 + (circle_AnimTime_FlipOut * 0.95 + circle_AnimTime_DelayBtwStartOrEndFlip * this.letterList.length))
        }, Math.max(loop_AnimTime_Rotate, circle_AnimTime_DelayBtwSubmitFlip * this.letterList.length) + 2000)
    }

    ToggleHighlightCurrentLetter(on) {
        if (!this.#historical) {
            this.letterList[this.letterIndex].ToggleCurrentIndex(on)
        }
    }

    ToggleHoverableLetters(on, delay = 0, resetTime = 0, submit = false) {
        for (let i = 0; i < this.letterList.length; i++) {
            if (!this.#submit || (this.#submit && submit)) {
                if (delay > 0) {
                    setTimeout(() => {
                        if (!this.#submit || (this.#submit && submit)) {
                            this.letterList[i].ToggleHoverable(on);
                        }
                    }, on ? (delay + controls_Time_DelayBeforeReactivation) : delay)
                }
                else {
                    this.letterList[i].ToggleHoverable(on)
                }

                if (resetTime > 0) {
                    setTimeout(() => {
                        if (!this.#submit || (this.#submit && submit)) {
                            this.letterList[i].ToggleHoverable(!on)
                        }
                    }, !on ? (delay + resetTime + controls_Time_DelayBeforeReactivation) : (delay + resetTime))
                }
            }
        }
    }

    DestroyLoop() {
        for (let i = 0; i < this.letterList.length; i++) {
            this.letterList[i].DestroyLetter()
        }

        this.element.remove()
        loop = null

        if (!this.#historical) {
            EndGame()
        }
    }

}