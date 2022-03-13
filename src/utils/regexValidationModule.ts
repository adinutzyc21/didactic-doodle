export function validateEmail(emailAddress: string) {
    const emailRegex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(emailAddress);
}

export function validateName(name: string) {
    const nameRegex = /^([-A-Z. ])+$/i;
    return nameRegex.test(name);
}

export function validateURL(url: string) {
    const urlRegex = /((ftp|https?):\/\/)?(www\.)?[a-z0-9\-.]{3,}\.[a-z]{3}.*$/;
    return urlRegex.test(url);
}

export function validateId(id: string) {
    const urlRegex = /^([1-9][0-9]*)|([0])$/;
    return urlRegex.test(id);
}
