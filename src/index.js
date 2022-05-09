const PIN_STORAGE_ITEM_NAME = 'NFPlaybackPin'

const getAccountName = () => JSON.parse(localStorage.getItem("MDX_REMOTE_DEVICE_MAP"))?.id;

const skipNetflixAgePin = () => {
    const accountName = getAccountName()

    // Looks like the data wasn't prepared yet. Try again later.
    if (!accountName) {
        setTimeout(skipNetflixAgePin, 500)
        return
    }

    // The actual magic.
    localStorage.setItem(
        PIN_STORAGE_ITEM_NAME,
        JSON.stringify({[accountName]: {ts: Date.now(), __writeTs: Date.now()}})
    );

    // Reload the page if the pin entry was visible
    if (document.querySelector('.player-pin-entry')) {
        location.reload();
    } else {
        // Netflix sometimes takes a while.
        // If the pin entry wasn't visible before make sure that it wasn't just delayed.
        setTimeout(() => {
            if (document.querySelector('.player-pin-entry'))
                location.reload();
        }, 2000)
    }
}

window.registerSkipNetflixAgePinInterval = () => {
    clearInterval(window.skipNetflixAgePinInterval)
    window.skipNetflixAgePinInterval = setInterval(skipNetflixAgePin, 1000 * 60 * 5)
    skipNetflixAgePin()
}
