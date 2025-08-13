async function SetupGame() {
    await WordSetup.GenerateWordDatabase()

    StartGame()
}

function StartGame() {
    loopHistoryReset()

    WordSetup.GenerateWordLoop()
    currentTurns = 0
    //console.log(WordSetup.wordLoop)

    clearGameEventListeners()
    addGameEventListener(document, "keydown", gameKeyboardControlsFunc)

    let loopElem = document.createElement("div")
    document.body.appendChild(loopElem)
    loopElem.classList.add("loop")
    loop = new Loop(loopElem)

    counterSetText();
}

function EndGame() {
    StartGame()
}

SetupGame()