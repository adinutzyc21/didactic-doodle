async function messagesFromReactAppListener(msg, sender, sendResponse) {
    switch (msg.method) {
        case "getSelection": {
            let sel = document.getSelection();
            sendResponse({ text: sel.toString() });
            sel.removeAllRanges();
            break;
        }
        case "toggleExtension": {
            const extensionIframe = document.getElementById("chromeExtension");
            if (extensionIframe.style.display === "none") {
                extensionIframe.style.display = "block";
            } else {
                extensionIframe.style.display = "none";
            }
            sendResponse(true);
            break;
        }
            if (replyBtn) {
                replyBtn.click();

                window.setTimeout(function () {
                    writeEmailResponse(msg.emailToSend);
                }, 0);
            }
            break;
    }
    return true;
}

function writeEmailResponse(message) {
    const msgBodyDiv = document.querySelector('div.Am.aO9.Al.editable');
    if (msgBodyDiv) {
        const el = document.createElement('span'); // is a node
        el.innerHTML = message;
        msgBodyDiv.prepend(el);
    }
}

/**
 * Fired when a message is sent from either an extension process or a content script.
 */
chrome.runtime.onMessage.addListener(messagesFromReactAppListener);

/**
 * Create side panel
 */
{ // Block used to avoid setting global variables
    const iframe = document.createElement('iframe');

    iframe.style.background = "#FAF9F6";
    iframe.style.height = "80%";
    iframe.style.width = "500px";
    iframe.style.position = "fixed";
    iframe.style.top = "0px";
    iframe.style.right = "10px";
    iframe.style.zIndex = "9000000000000000000";
    iframe.style.border = "1px";
    iframe.style.boxShadow = "0 1px 3px 0 rgb(0 0 0 / 10%), 0 1px 2px 0 rgb(0 0 0 / 6%)";
    iframe.style.display = "none";

    iframe.setAttribute("id", "chromeExtension");

    iframe.src = chrome.runtime.getURL("index.html")
    document.body.appendChild(iframe);
}