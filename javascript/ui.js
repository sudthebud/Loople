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
    if (loopHistoryIndex + 1 == 1) turnText += "st";
    else if (loopHistoryIndex + 1 == 2) turnText += "nd";
    else if (loopHistoryIndex + 1 == 3) turnText += "rd";
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