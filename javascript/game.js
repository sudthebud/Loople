// const canvas = document.querySelector("canvas")
// const context = canvas.getContext("2d")

// canvas.width = 960
// canvas.height = 540

// context.fillStyle = "#ececec"
// context.fillRect(0, 0, canvas.width, canvas.height)

// test = document.getElementById("test")
// test.textContent = "hi"

WordSetup.GenerateWordDatabase()
WordSetup.GenerateWordLoop()
console.log(WordSetup.wordLoop)

loopElem = document.createElement("div")
document.body.appendChild(loopElem)
loopElem.classList.add("loop")
var loop = new Loop(loopElem)
var loopHistory = []
var loopHistoryIndex = 0 //Change this to stay on last element at first but then save point once player first clicks on button

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
            loopHistory[loopHistoryIndex].Show()
        }
        else if (event.key === '2') {
            loopHistory[loopHistoryIndex].Hide()
        }
        else if (event.key === '4' && loopHistoryIndex + 1 < loopHistory.length) {
            loopHistory[loopHistoryIndex].Hide()
            loopHistoryIndex++
            setTimeout(() => {
                loopHistory[loopHistoryIndex].Show();
            }, circle_AnimTime_FlipOut)
        }
        else if (event.key === '3' && loopHistoryIndex - 1 >= 0) {
            loopHistory[loopHistoryIndex].Hide()
            loopHistoryIndex--
            setTimeout(() => {
                loopHistory[loopHistoryIndex].Show();
            }, circle_AnimTime_FlipOut)
        }
    }
})