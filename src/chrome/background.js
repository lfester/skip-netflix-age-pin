chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    chrome.tabs.sendMessage(tab.id, { type: 'TAB_CHANGE' });
});
