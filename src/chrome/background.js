chrome.tabs.onUpdated.addListener((tabId, activeInfo, tab) => sendCheckPinEvent(tab));

chrome.tabs.onActivated.addListener(({tabId}) => chrome.tabs.get(tabId, sendCheckPinEvent))

const sendCheckPinEvent = (tab) => {
    if (tab?.url.startsWith("https://www.netflix.com/"))
        chrome.tabs.sendMessage(tab.id, {type: 'SKIP_PIN'});
}
