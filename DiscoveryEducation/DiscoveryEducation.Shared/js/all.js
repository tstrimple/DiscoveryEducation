var msViewport = document.getElementById('ms-viewport');

if (!msViewport) {
    var msViewportStyle = document.createElement('style');
    msViewportStyle.id = 'ms-viewport';
    
    var viewPortString = '@-ms-viewport { width: 990px !important; }';

    if (window.innerWidth > 990) {
        viewPortString = '@-ms-viewport { width: 1024px !important; }';
    }

    console.log('setting viewport: ' + viewPortString);
    msViewportStyle.appendChild(document.createTextNode(viewPortString));
    document.getElementsByTagName('head')[0].appendChild(msViewportStyle);
}

var hash = window.location.hash.substr(1);
if (hash === 'v=tab2') {
    window.external.notify('SHOWSWITCHBUTTON');
} else {
    window.external.notify('HIDESWITCHBUTTON');
}