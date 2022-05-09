// -- Injection funcs --

const injectFile = (fileName) => {
    const script = document.createElement('script');
    script.src = chrome.extension.getURL(fileName);

    (document.head || document.documentElement).appendChild(script);

    script.onload = () => {
        script.parentNode.removeChild(script);
    };
};

const injectFunc = (fn) => {
    const script = document.createElement('script');
    script.text = `(${fn.toString()})();`;

    (document.head || document.documentElement).appendChild(script);

    script.parentNode.removeChild(script);
};

// -- End of injection funcs --

injectFile('plugin.js');

chrome.runtime.onMessage.addListener((payload) => {
    if (payload.type === 'SKIP_PIN')
        injectFunc(() => window.registerSkipNetflixAgePinInterval());
});
