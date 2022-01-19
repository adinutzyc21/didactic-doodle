chrome.action.onClicked.addListener(tab => {
    chrome.tabs.sendMessage(tab.id, { method: "toggleExtension" });
});