import { PasteTextRespType } from "../types";
import { REACT_MSG_METHODS } from "./constants";

export function pasteText(): Promise<PasteTextRespType> {
    return new Promise((resolve) => {
        chrome.tabs &&
            chrome.tabs.query(
                {
                    active: true,
                    currentWindow: true,
                },
                (tabs) => {
                    chrome.tabs.sendMessage(tabs[0].id || 0, { method: REACT_MSG_METHODS.getSelection }, (response: PasteTextRespType) => {
                        resolve(response);
                    });
                }
            );
    });
}

export function pasteBrowserURL(): Promise<string> {
    return new Promise((resolve) => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            resolve(tabs[0].url || "");
        });
    });
}
