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

    SetText(text, state = Letter.States.UNSUBMITTED) {
        text = text.toUpperCase()

        this.#text = text
        this.SetState(state)

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

    DestroyLetter() {
        this.element.remove()
    }

}