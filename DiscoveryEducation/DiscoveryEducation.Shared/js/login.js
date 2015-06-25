var msViewportStyle = document.createElement('style');
msViewportStyle.id = 'ms-viewport';

var viewPortString = '@-ms-viewport { width: device-width !important; }';

if (window.innerWidth > 990) {
    viewPortString = '@-ms-viewport { width: 1024px !important; }';
}

console.log('setting viewport: ' + viewPortString);
msViewportStyle.appendChild(document.createTextNode(viewPortString));
document.getElementsByTagName('head')[0].appendChild(msViewportStyle);

setTimeout(function () { window.external.notify('HIDESWITCHBUTTON'); }, 500);
