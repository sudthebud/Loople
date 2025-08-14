var eventListeners = []

function addGameEventListener(element, input, func) {
    element.addEventListener(input, func)
    let listener = [element, input, func, true]
    eventListeners.push(listener)

    return listener
}

function removeGameEventListener(element, input, func) {
    for (let i = 0; i < eventListeners.length; i++) {
        if (eventListeners[i][0] === element
            && eventListeners[i][1] === input
            && eventListeners[i][2] === func
        ) {
            let listener = eventListeners[i]

            if (!listener[3]) {
                let element = listener[0]
                let input = listener[1]
                let func = listener[2]

                element.removeEventListener(input, func)

                listener[3] = false
            }

            eventListeners.splice(i, 1)
            return listener
        }
    }
}

function toggleGameEventListeners(on, delay = 0, resetTime = 0, listeners = []) {

    function toggleGameEventHelper(eventListener, bool) {
        let element = eventListener[0]
        let input = eventListener[1]
        let func = eventListener[2]

        if (bool) {
            element.addEventListener(input, func);
            eventListener[3] = true;
        }
        else {
            element.removeEventListener(input, func);
            eventListener[3] = false;
        }
    }

    function toggleGameEventListener(eventListener) {
            if (delay > 0) {
                setTimeout(() => {
                    toggleGameEventHelper(eventListener, on);
                }, on ? (delay + controls_Time_DelayBeforeReactivation) : delay)
            }
            else {
                toggleGameEventHelper(eventListener, on)
            }

            if (resetTime > 0) {
                setTimeout(() => {
                    toggleGameEventHelper(eventListener, !on);
                }, !on ? (delay + resetTime + controls_Time_DelayBeforeReactivation) : (delay + resetTime));
            }
    }

    if (listeners.length > 0) {
        for (let i = 0; i < eventListeners.length; i++) {
            if (listeners.length == 0) return
            if (eventListeners[3] === on) continue

            for (let j = listeners.length - 1; j >= 0; j--) {
                if (eventListeners[i][0] === listeners[j][0]
                    && eventListeners[i][1] === listeners[j][1]
                    && eventListeners[i][2] === listeners[j][2]
                ) {
                    toggleGameEventListener(eventListeners[i])

                    listeners.splice(j, 1)
                }
            }
        }
    }
    else {
        for (let i = 0; i < eventListeners.length; i++) {
            if (eventListeners[i][3] === on) continue

            toggleGameEventListener(eventListeners[i])
        }
    }
}

function clearGameEventListeners() {
    toggleGameEventListeners(false)
    eventListeners = []
}





var gameKeyboardControlsFunc = function GameKeyboardControls(event) {
    if (!event.repeat) {
        //Move between the loop
        if (event.key === 'ArrowLeft' || event.key === '1') {
            loop.Rotate(-1);
        }
        else if (event.key === 'ArrowRight' || event.key === '2') {
            loop.Rotate(1);
        }

        //Move between historical loops (shortcut)
        else if ((event.key === ',' || event.key === '3') && !(leftHistoryButton.classList.contains("disabled") || leftHistoryButton.classList.contains("cooldown"))) {
            leftHistoryButtonOnClick()
        }
        else if (event.key === '.' || event.key === '4' && !(rightHistoryButton.classList.contains("disabled") || rightHistoryButton.classList.contains("cooldown"))) {
            rightHistoryButtonOnClick()
        }

        else if (event.key === 'Enter') {
            loop.Submit();
        }

        //Enter letters
        else if (event.code === `Key${event.key.toUpperCase()}`) { //Thanks to @internetdrew on Medium for this (https://internetdrew.medium.com/how-to-detect-a-letter-key-on-key-events-with-javascript-c749820dcd27)
            loop.TypeLetter(event.key);
        }
    }
}