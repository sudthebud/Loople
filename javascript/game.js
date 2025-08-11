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
let loop = new Loop(loopElem)

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
    }
})