console.log('adding device-width viewport');
var msViewportStyle = document.createElement('style');
msViewportStyle.id = 'ms-viewport';

var viewPortString = '@-ms-viewport { width: device-width !important; }';
if (window.innerWidth > 990) {
    viewPortString = '@-ms-viewport { width: 1024px !important; }';
}

console.log('setting viewport ' + viewPortString);
msViewportStyle.appendChild(document.createTextNode(viewPortString));
document.getElementsByTagName('head')[0].appendChild(msViewportStyle);

function updateDeviceWidth() {
    var width = window.innerWidth;
    console.log('setting #container width ' + width);
    $('#container').width(width);

    if (width > 990) {
        width = 990;
    }

    console.log('setting .bootstrapped .container width ' + width);
    $('.bootstrapped .container').width(width);
}

function toggleCalendarView() {
    if ($('#assignments').is(':visible')) {
        window.external.notify('SHOWLISTICON');
        $('.view-switcher-inner .btn[data-view="calendar"]').click();
    }
    else {
        window.external.notify('SHOWCALENDARICON');
        $('.view-switcher-inner .btn[data-view="list"]').click();
    }
}

$(document).ready(function () {
    var resizeTimeout = null;
    $(window).resize(function () {
        if (resizeTimeout) {
            clearTimeout(resizeTimeout);
        }
        resizeTimeout = setTimeout(updateDeviceWidth, 500);
    });
    updateDeviceWidth();

    $(window).bind('hashchange', function (e) {
        var hash = window.location.hash.substr(1);
        if (hash === 'v=tab2') {
            window.external.notify('SHOWSWITCHBUTTON');
        } else {
            window.external.notify('HIDESWITCHBUTTON');
        }
    });
});
