class Letter {

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
        this.SetState(Letter.States.UNSUBMITTED)
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
        return this.#text
    }

    SetText(text) {
        text = text.toUpperCase()

        this.#text = text
        this.element.getElementsByClassName("letterText")[0].textContent = text
        this.SetState(Letter.States.UNSUBMITTED)
    }

    SetPosition(position) {
        this.#position = position

        this.element.style.top = `${this.#position[0] + 50}%`
        this.element.style.left = `${this.#position[1] + 50}%`
    }

    GetState() {
        return this.#state
    }

    SetState(state) {
        this.#state = state


        this.element.getElementsByClassName("letterText")[0].classList.toggle("unsubmitted", false)
        this.element.getElementsByClassName("letterText")[0].classList.toggle("submitted", false)

        if (state == Letter.States.UNSUBMITTED) {
            this.element.getElementsByClassName("letterText")[0].classList.add("unsubmitted")
        }
        else {
            this.element.getElementsByClassName("letterText")[0].classList.add("submitted")
        }


        this.element.getElementsByClassName("circle")[0].classList.toggle("unsubmitted", false)
        this.element.getElementsByClassName("circle")[0].classList.toggle("submitted", false)
        this.element.getElementsByClassName("circle")[0].classList.toggle("noExist", false)
        this.element.getElementsByClassName("circle")[0].classList.toggle("inLoop", false)
        this.element.getElementsByClassName("circle")[0].classList.toggle("inWord", false)
        this.element.getElementsByClassName("circle")[0].classList.toggle("incorrect", false)
        this.element.getElementsByClassName("circle")[0].classList.toggle("correct", false)

        switch (state) {
            case Letter.States.UNSUBMITTED:
                this.element.getElementsByClassName("circle")[0].classList.add("unsubmitted")
                break;
            case Letter.States.SUBMITTED_NO_EXIST:
                this.element.getElementsByClassName("circle")[0].classList.add("submitted", "noExist")
                break;
            case Letter.States.SUBMITTED_IN_LOOP:
                this.element.getElementsByClassName("circle")[0].classList.add("submitted", "inLoop")
                break;
            case Letter.States.SUBMITTED_IN_WORD:
                this.element.getElementsByClassName("circle")[0].classList.add("submitted", "inWord")
                break;
            case Letter.States.SUBMITTED_INCORRECT:
                this.element.getElementsByClassName("circle")[0].classList.add("submitted", "incorrect")
                break;
            case Letter.States.SUBMITTED_CORRECT:
                this.element.getElementsByClassName("circle")[0].classList.add("submitted", "correct")
                break;
        }
    }

    AnimateFlipIn() {
        this.element.classList.add("flip-in")
        this.element.style.visibility = "visible"
        // clickAudio.play() 
        //Disabled for now because browsers block autoplay
        setTimeout(() => {
            this.element.classList.remove("flip-in");
        }, 250)
    }

    AnimateFlipOut() {
        this.element.classList.add("flip-out")
        // clickAudio.play()
        setTimeout(() => {
            this.element.style.visibility = "hidden"
            this.element.classList.remove("flip-out");
        }, 250)
    }

    AnimateFlipInOut() {
        this.element.classList.add("flip-in-out")
        // clickAudio.play()
        setTimeout(() => {
            this.element.classList.remove("flip-in-out");
        }, 500)
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
                        wordPosition.push(WordSetup.wordLoop[word[0]].length - 1)
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
                this.letterList[i].SetText("A");
                this.letterList[i].AnimateFlipIn();
            }, circleWaitUntilAppear + 35 * i)
        }
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
            if (Mod(indexOf - this.letterIndex, this.letterList.length) < Mod(this.letterIndex - indexOf, this.letterList.length)) {
                this.Rotate(Mod(indexOf - this.letterIndex, this.letterList.length))
            }
            else {
                this.Rotate(-Mod(this.letterIndex - indexOf, this.letterList.length))
            }
        }
    }

}