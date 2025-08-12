//Loop submission history
var loopHistoryVisible = false

function loopHistoryReset() {
    loopHistory = []
    loopHistoryIndex = -1
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