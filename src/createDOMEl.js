export function createDOMElement(tag, textContent, att1, attVal1, att2, attVal2){
    let element = document.createElement(tag);
    if (textContent) { element.textContent = textContent };
    if (att1) { element.setAttribute(att1, attVal1) };
    if (att2) { element.setAttribute(att2, attVal2) };
    return element;
}

export const test = 'DOM Content Loaded! :)';