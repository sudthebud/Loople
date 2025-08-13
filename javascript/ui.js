//Counter circle
var counterCircle = document.getElementById("counterCircle")
var leftHistoryButton = document.getElementById("historyBackwardButton")
var rightHistoryButton = document.getElementById("historyForwardButton")
leftHistoryButton.addEventListener("click", (event) => leftHistoryButtonOnClick())
rightHistoryButton.addEventListener("click", (event) => rightHustoryButtonOnClick())

function toggleEnabledLeftHistoryButton(on) {
    leftHistoryButton.classList.toggle("disabled", !on)
}

function toggleEnabledRightHistoryButton(on) {
    rightHistoryButton.classList.toggle("disabled", !on)
}

function leftHistoryButtonOnClick() {
    if (!loopHistoryVisible) {
        loopHistoryShow();
        toggleEnabledRightHistoryButton(true);
    }
    else {
        loopHistoryMove(-1);
    }

    if (loopHistoryIndex == 0) {
        toggleEnabledLeftHistoryButton(false);
    }
}

function rightHustoryButtonOnClick() {
    toggleEnabledLeftHistoryButton(true);

    if (loopHistoryIndex == loopHistory.length - 1) {
        loopHistoryHide();
        toggleEnabledRightHistoryButton(false);
    }
    else if (loopHistoryVisible) {
        loopHistoryMove(1);
    }
}




//Loop submission history
var loopHistoryVisible = false

function loopHistoryReset() {
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

    if (loopHistory.length == 1) {
        toggleEnabledLeftHistoryButton(true)
    }
}

function loopHistoryRotate(numRotations) {
    for (let i = 0; i < loopHistory.length; i++) {
        loopHistory[i].Rotate(numRotations)
    }
}

function loopHistoryShow() {
    if (loopHistory.length > 0) {
        loopHistory[loopHistoryIndex].Show()
        loopHistoryVisible = true
    }
}

function loopHistoryHide() {
    if (loopHistory.length > 0) {
        loopHistory[loopHistoryIndex].Hide()
        loopHistoryVisible = false
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