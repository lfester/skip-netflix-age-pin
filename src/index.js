window.checkSkipPin = () => {
    if (!isPinStillValid())
        skipPin()
}

const PIN_STORAGE_ITEM_NAME = 'NFPlaybackPin'

const getAccountName = () => JSON.parse(localStorage.getItem("MDX_REMOTE_DEVICE_MAP"))?.id;

const isPinStillValid = () => {
    const pinStorageEntry = localStorage.getItem('NFPlaybackPin')
    if (!pinStorageEntry)
        return false

    const timestamp = JSON.parse(pinStorageEntry)[getAccountName()].ts

    // If last pin entry is older than 30 minutes
    return Date.now() - timestamp < (1000 * 60 * 30)
}

const skipPin = () => {
    const accountName = getAccountName()

    // Looks like the data wasn't prepared yet. Try again later.
    if (!accountName) {
        setTimeout(skipPin, 500)
        return
    }

    // The actual magic.
    localStorage.setItem(
        PIN_STORAGE_ITEM_NAME,
        JSON.stringify({[accountName]: {ts: Date.now(), __writeTs: Date.now()}})
    );

    location.reload();
}
