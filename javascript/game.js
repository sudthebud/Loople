WordSetup.GenerateWordDatabase()

function StartGame() {
    WordSetup.GenerateWordLoop()
    currentTurns = 0
    console.log(WordSetup.wordLoop)

    let loopElem = document.createElement("div")
    document.body.appendChild(loopElem)
    loopElem.classList.add("loop")
    loop = new Loop(loopElem)

    loopHistoryReset()
}

StartGame()

document.addEventListener('keydown', (event) => {
    if (!event.repeat) {
        if (event.key === 'ArrowLeft') {
            loop.Rotate(-1);
        }
        else if (event.key === 'ArrowRight') {
            loop.Rotate(1);
        }
        else if (event.key === 'Enter') {
            loop.Submit();
        }
        else if (event.code === `Key${event.key.toUpperCase()}`) { //Thanks to internetdrew on Medium for this
            loop.TypeLetter(event.key);
        }

        //TEMP (include these as shortcut keys maybe?)
        else if (event.key === '1') {
            loopHistoryShow()
        }
        else if (event.key === '2') {
            loopHistoryHide()
        }
        else if (event.key === '4') {
            loopHistoryMove(1)
        }
        else if (event.key === '3') {
            loopHistoryMove(-1)
        }
    }
})