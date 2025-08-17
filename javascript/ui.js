//Counter circle
var counterCircle = document.getElementById("counterCircle")
var leftHistoryButton = document.getElementById("historyBackwardButton")
var rightHistoryButton = document.getElementById("historyForwardButton")
var historyTurnPill = document.getElementById("historyTurn")
var counter = document.getElementById("counter")

leftHistoryButton.addEventListener("click", (event) => leftHistoryButtonOnClick())
rightHistoryButton.addEventListener("click", (event) => {
    rightHistoryButtonOnClick()
})
historyTurnPill.classList.toggle("disabled", true)



function toggleEnabledLeftHistoryButton(on) {
    leftHistoryButton.classList.toggle("disabled", !on)
}

function toggleEnabledRightHistoryButton(on) {
    rightHistoryButton.classList.toggle("disabled", !on)
}

function leftHistoryButtonOnClick() {
    leftHistoryButton.classList.toggle("cooldown", true); //In case of button spam

    if (!loopHistoryVisible) {
        loopHistoryShow();
        toggleEnabledRightHistoryButton(true);
        historyTurnPillSetText(true);
    }
    else {
        loopHistoryMove(-1);
        historyTurnPillSetText(false);
    }

    if (loopHistoryIndex == 0) {
        toggleEnabledLeftHistoryButton(false);
    }

    historyTurnPillSetText();

    leftHistoryButton.classList.toggle("cooldown", false);
}

function rightHistoryButtonOnClick() {
    rightHistoryButton.classList.toggle("cooldown", true); //In case of button spam

    toggleEnabledLeftHistoryButton(true);

    if (loopHistoryIndex == loopHistory.length - 1) {
        loopHistoryHide();
        toggleEnabledRightHistoryButton(false);
        historyTurnPillSetText(true);
    }
    else if (loopHistoryVisible) {
        loopHistoryMove(1);
        historyTurnPillSetText(false);
    }

    rightHistoryButton.classList.toggle("cooldown", false);
}


function historyTurnPillSetText(disabled = false) {
    let turnText = `${loopHistoryIndex + 1}`;
    if (turnText.endsWith(1) && turnText !== "11") turnText += "st";
    else if (turnText.endsWith(2) && turnText !== "12") turnText += "nd";
    else if (turnText.endsWith(3) && turnText !== "13") turnText += "rd";
    else turnText += "th";
    turnText += " Turn";

    historyTurnPill.classList.toggle("flip_Anim", true);

    setTimeout(() => {
        if ((!loopHistoryVisible && disabled) || (loopHistoryVisible && !disabled)) historyTurnPill.classList.toggle("disabled", disabled);
        historyTurnPill.textContent = turnText;
    }, ui_historyTurn_AnimTime_FlipPart1);

    setTimeout(() => {
        historyTurnPill.classList.toggle("flip_Anim", false);
    }, ui_historyTurn_AnimTime_FlipPart1 + ui_historyTurn_AnimTime_FlipPart2);
}


function counterSetText() {
    let counterText = `${WordSetup.turns - currentTurns}`
    counter.classList.toggle("flipAnim", true)

    setTimeout(() => {
        counter.textContent = counterText;
    }, ui_counter_AnimTime_FlipPart1)

    setTimeout(() => {
        counter.classList.toggle("flipAnim", false);
    }, ui_counter_AnimTime_FlipPart1 + ui_counter_AnimTime_FlipPart2)
}


function toggleCounterCircleVisibility(on) {
    counterCircle.classList.toggle("visible", on)
}




//Loop submission history
var loopHistoryVisible = false

function loopHistoryReset() {
    if (typeof loopHistory !== 'undefined' && loopHistory !== null) {
        loopHistoryHide()
        for (let i = 0; i < loopHistory.length; i++) {
            loopHistory[i].DestroyLoop()
        }
    }

    loopHistory = []
    loopHistoryIndex = -1

    toggleEnabledLeftHistoryButton(false)
    toggleEnabledRightHistoryButton(false)
}

function loopHistoryAdd(newLoopHistory) {
    loopHistory.push(newLoopHistory);
    if (loopHistoryIndex == loopHistory.length - 2) {
        loopHistoryMove(1);
    }

    if (loopHistory.length - 1 == loopHistoryIndex) {
        toggleEnabledLeftHistoryButton(true)
        historyTurnPillSetText(!loopHistoryVisible)
    }
}

function loopHistoryRotate(numRotations) {
    for (let i = 0; i < loopHistory.length; i++) {
        loopHistory[i].Rotate(numRotations)
    }
}

function loopHistoryShow() {
    if (loopHistory.length > 0 && !loopHistoryVisible) {
        loopHistoryVisible = true
        loopHistory[loopHistoryIndex].Show()
    }
}

function loopHistoryHide() {
    if (loopHistory.length > 0 && loopHistoryVisible) {
        loopHistoryVisible = false
        loopHistory[loopHistoryIndex].Hide()
    }
}

function loopHistoryMove(numMoves) {
    if (loopHistory.length > 0) {
        let oldLoopHistoryIndex = loopHistoryIndex
        if (numMoves < 0) {
            loopHistoryIndex = Math.max(loopHistoryIndex + numMoves, 0)
        }
        else {
            loopHistoryIndex = Math.min(loopHistoryIndex + numMoves, loopHistory.length - 1)
        }

        if (oldLoopHistoryIndex != loopHistoryIndex && loopHistoryVisible) {
            loopHistory[oldLoopHistoryIndex].Hide()
            setTimeout(() => {
                if (loopHistoryVisible) {
                    loopHistory[loopHistoryIndex].Show();
                }
            }, circle_AnimTime_FlipOut)
        }
    }
}




//Toast
var toast = document.getElementById("toastTemplate").content.querySelector("div")

function createToast(text) {
    let existingToast = document.getElementById("toast")

    if (!!existingToast) {
        existingToast.remove()
    }

    existingToast = toast.cloneNode(true)
    existingToast.firstElementChild.firstElementChild.textContent = text
    document.body.appendChild(existingToast)
}




//Informational buttons and dialogs
var howToPlayButton = document.getElementById("howToPlayButton")
var controlsButton = document.getElementById("controlsButton")
var infoButton = document.getElementById("infoButton")

var howToPlayDialog = document.getElementById("howToPlayDialog")
var controlsDialog = document.getElementById("controlsDialog")
var infoDialog = document.getElementById("infoDialog")

function openInformationalDialog(dialog) {
    dialog.showModal()
    dialog.classList.toggle("visible", true)
}

function closeInformationalDialog(dialog) {
    dialog.classList.toggle("visible", false)

    dialog.addEventListener("transitionend", function dialogClose(event) {
        if (event.target === dialog) {
            dialog.close()
            dialog.removeEventListener("transitionend", dialogClose)
        }
    })
}

howToPlayButton.addEventListener("click", function(){openInformationalDialog(howToPlayDialog)})
controlsButton.addEventListener("click", function(){openInformationalDialog(controlsDialog)})
infoButton.addEventListener("click", function(){openInformationalDialog(infoDialog)})

howToPlayDialog.getElementsByClassName("exitButton")[0].addEventListener("click", function(){closeInformationalDialog(howToPlayDialog)})
controlsDialog.getElementsByClassName("exitButton")[0].addEventListener("click", function(){closeInformationalDialog(controlsDialog)})
infoDialog.getElementsByClassName("exitButton")[0].addEventListener("click", function(){closeInformationalDialog(infoDialog)})