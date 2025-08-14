//----------File path consts----------
const assetPath = "assets"
const datasetPath = "datasets"
const imagePath = "images"
// const soundPath = "sounds"

//----------Game consts----------
const minNumWords = 3
const maxNumWords = 5

const minLetters = 3 * minNumWords - 1 * minNumWords
const maxLetters = 7 * maxNumWords - 1 * maxNumWords

const controls_Time_DelayBeforeReactivation = 10

//----------Visual and audio consts----------
const circleScaleMin = 0.6
const circleImage = "circle.svg"
const circleWaitUntilAppear = 0

// const clickAudioFile = "click.mp3"
// const clickAudio = new Audio(`${assetPath}/${soundPath}/${clickAudioFile}`)

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

const ui_historyTurn_AnimTime_FlipPart1 = 100
const ui_historyTurn_AnimTime_FlipPart2 = 500
const ui_historyTurn_AnimTime_FlipAppear = 400
const ui_historyTurn_AnimTime_FlipDisappear = 500

const ui_counter_AnimTime_FlipPart1 = 200
const ui_counter_AnimTime_FlipPart2 = 1000



//----------Vars----------
var randomNumberGenerator

var loop

var loopHistory
var loopHistoryIndex

var currentTurns




//----------Helper functions----------
function CreateRandomNumberGenerator(seedStr) {
    //Major thanks to @bryc on StackOverflow for this (https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript)

    function cyrb128(str) {
        let h1 = 1779033703, h2 = 3144134277,
            h3 = 1013904242, h4 = 2773480762;
        for (let i = 0, k; i < str.length; i++) {
            k = str.charCodeAt(i);
            h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
            h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
            h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
            h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
        }
        h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
        h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
        h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
        h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
        h1 ^= (h2 ^ h3 ^ h4), h2 ^= h1, h3 ^= h1, h4 ^= h1;
        return [h1>>>0, h2>>>0, h3>>>0, h4>>>0];
    }

    function splitmix32(a) {
        return function() {
            a |= 0
            a = a + 0x9e3779b9 | 0
            let t = a ^ a >>> 16
            t = Math.imul(t, 0x21f0aaad)
            t = t ^ t >>> 15
            t = Math.imul(t, 0x735a2d97)
            return ((t = t ^ t >>> 15) >>> 0) / 4294967296
        }
    }

    let seed = cyrb128(seedStr)

    return splitmix32(seed[0])
}

function RandomNum(max = 1, min = 0, seeded = false) {
    if (seeded) return randomNumberGenerator() * (max - min) + min
    return Math.random() * (max - min) + min
}

function RandomInt(max, min = 0, seed = null) {
    return Math.floor(RandomNum(max, min, seed))
}

function Mod(num, modulo) {
    //Thanks to @ShreevatsaR on StackOverflow for this (https://stackoverflow.com/questions/1082917/mod-of-negative-number-is-melting-my-brain)
    return (num % modulo + modulo) % modulo
}

function GetLoopCircleScale(numLetters) {
    return circleScaleMin + (1 - circleScaleMin) * (maxLetters - numLetters) / (maxLetters - minLetters)
}