chrome.tabs.onUpdated.addListener((tabId, activeInfo, tab) => sendCheckPinEvent(tab));

chrome.tabs.onActivated.addListener(({tabId}) => chrome.tabs.get(tabId, sendCheckPinEvent))

const sendCheckPinEvent = (tab) => {
    if (tab?.url.startsWith("https://www.netflix.com/watch/"))
        chrome.tabs.sendMessage(tab.id, {type: 'CHECK_PIN'});
}
