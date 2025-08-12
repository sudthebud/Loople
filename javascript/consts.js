//File path consts
const assetPath = "assets"
const datasetPath = "datasets"
const imagePath = "images"
const soundPath = "sounds"

//Game consts
const minNumWords = 3
const maxNumWords = 5

const minLetters = 3 * minNumWords - 1 * minNumWords
const maxLetters = 7 * maxNumWords - 1 * maxNumWords

//Visual and audio consts
const circleScaleMin = 0.6
const circleImage = "circle.svg"
const circleWaitUntilAppear = 0

const clickAudioFile = "click.mp3"
const clickAudio = new Audio(`..\\${assetPath}\\${soundPath}\\${clickAudioFile}`)

const circle_AnimTime_DelayBtwStartOrEndFlip = 35
const circle_AnimTime_DelayBtwSubmitFlip = 150

const circle_AnimTime_FlipIn = 150
const circle_AnimTime_FlipOut = 150
const circle_AnimTime_FlipInOut = 200

const circle_AnimTime_Win = 700
const circle_AnimTime_DelayBtwWin = 150

const circle_AnimTime_DelayBtwLose = 750

const letter_AnimTime_Invalid = 2500

const loop_AnimTime_Rotate = 300



//Vars
var loop

var loopHistory
var loopHistoryIndex

var currentTurns




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