var msViewport = document.getElementById('ms-viewport');

if (!msViewport) {
    console.log('no ms-viewport using auto');
    var msViewportStyle = document.createElement('style');
    msViewportStyle.id = 'ms-viewport';

    msViewportStyle.appendChild(
      document.createTextNode('@-ms-viewport { width: 990px !important; }')
    );
    document.getElementsByTagName('head')[0].appendChild(msViewportStyle);
}

var hash = window.location.hash.substr(1);
if (hash === 'v=tab2') {
    window.external.notify('SHOWSWITCHBUTTON');
} else {
    window.external.notify('HIDESWITCHBUTTON');
}