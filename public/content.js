function messagesFromReactAppListener(msg, sender, sendResponse) {
    console.log('[content.js]. Message received', msg);

    let response = {};

    switch (msg.method) {
        case "getSelection":
            response = { text: window.getSelection().toString() };
            break;
        case "countHeadings":
            response = {
                title: document.title,
                headlines: Array.from(document.getElementsByTagName < "h1" > ("h1")).map(h1 => h1.innerText)
            };
            break;

    }

    console.log('[content.js]. Message response', response);

    sendResponse(response);
}

/**
 * Fired when a message is sent from either an extension process or a content script.
 */
chrome.runtime.onMessage.addListener(messagesFromReactAppListener);
