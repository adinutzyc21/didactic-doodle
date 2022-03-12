/* #region Allow extension to continue functioning after an upgrade, and to make it work immediately upon installation*/
chrome.runtime.onInstalled.addListener(async () => {
    for (const cs of chrome.runtime.getManifest().content_scripts) {
        for (const tab of await chrome.tabs.query({ url: cs.matches })) {
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                files: cs.js,
            });
        }
    }
    return true;
});
/* #endregion */

// Open the extension iframe when the extension button is clicked
chrome.action.onClicked.addListener(tab => {
    chrome.tabs.sendMessage(tab.id, { method: "toggleExtension" });
    return true;
});