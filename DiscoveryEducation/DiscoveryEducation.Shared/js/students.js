console.log('adding device-width viewport');
var msViewportStyle = document.createElement('style');
msViewportStyle.id = 'ms-viewport';

msViewportStyle.appendChild(
  document.createTextNode(
    '@-ms-viewport{width:device-width!important;zoom-user:fixed;max-zoom:1;min-zoom:1;}'
  )
);
document.getElementsByTagName('head')[0].appendChild(msViewportStyle);

function updateDeviceWidth() {
    var width = $(window).width();
    if (width > 990) {
        width = 990;
    }

    console.log('setting #container width' + width);
    $('#container').width(width);
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
    $(window).resize(updateDeviceWidth);
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
