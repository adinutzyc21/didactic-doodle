export const STATE_NAME = {
    recruiterName: "recruiterName",
    companyName: "companyName",
    contactMeWhen: "contactMeWhen",
    closingMessage: "closingMessage",
};

export const REACT_MSG_METHODS = {
    getSelection: "getSelection",
    replyToEmail: "replyToEmail",
    checkEmailPage: "checkEmailPage",
};

export const MODAL_STATES = {
    success: "success",
    failure: "failure",
    none: "none"
}

export const BUTTON_OPTIONS = {
    send: "send",
    cancel: "reset",
}

export const WHEN_OPTIONS = ["at the beginning of May", "at the end of April", "mid-May"];
export const CLOSING_MESSAGE = ["have a great day", "have a great evening", "have a great weekend", "have a great week"];
export const EMAIL_TEMPLATE = `Hi $recruiter$,<br/><br/>Thank you so much for reaching out! I am actually planning to start interviewing $when$, and I would be excited to talk to you about opportunities $atCompany$ closer to that time, if that works for you.<br/><br/>Thank you again, and $closing$!<br/>`;
