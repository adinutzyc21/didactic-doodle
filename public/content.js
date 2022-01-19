function messagesFromReactAppListener(msg, sender, sendResponse) {
    switch (msg.method) {
        case "getSelection":
            sendResponse({ text: window.getSelection().toString() });
            break;
        case "countHeadings":
            sendResponse({
                title: document.title,
                headlines: Array.from(document.getElementsByTagName < "h1" > ("h1")).map(h1 => h1.innerText)
            });
            break;
        case "toggleExtension":
            toggle();
            break;
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
    iframe.style.height = "85%";
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

function toggle() {
    let x = document.getElementById("chromeExtension");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}