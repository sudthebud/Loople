//File path consts
const assetPath = "assets"
const datasetPath = "datasets"
const imagePath = "images"

//Game consts
const minNumWords = 3
const maxNumWords = 5

const minLetters = 3 * minNumWords - 1 * minNumWords
const maxLetters = 7 * maxNumWords - 1 * maxNumWords

//Visual consts
const circleScaleMin = 0.6
const circleImage = "circle.svg"
const circleWaitUntilAppear = 0

//Helper functions
function RandomInt(max, min = 0) {
    return Math.floor(Math.random() * (max - min) + min)
}

function Mod(num, modulo) {
    //Thanks to @ShreevatsaR on StackOverflow for this
    return (num % modulo + modulo) % modulo
}

function GetLoopCircleScale(numLetters) {
    return circleScaleMin + (1 - circleScaleMin) * (maxLetters - numLetters) / (maxLetters - minLetters)
}