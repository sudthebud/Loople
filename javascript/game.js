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

loopElem = document.createElement("div")
document.body.appendChild(loopElem)
loopElem.classList.add("loop")
let loop = new Loop(loopElem)