
function updateViewport() {
    var width = $(window).width();
    
    $('meta[name=viewport]').attr('content', 'width=device-width, initial-scale=1, user-scalable=no');

    if (width > 990) {
        width = 990;
    }

    $('.container').width(width);
    $('#tb-content').width(width);
}


$(document).ready(function () {
    updateViewport();
    if (window.location.hash.substr(1) == 'v=tab2') {
        window.external.notify('SHOWSWITCHBUTTON');
    } else {
        window.external.notify('HIDESWITCHBUTTON');
    }
});

$(window).resize(updateViewport);

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

function showWelcome() {
    window.external.notify('HIDESWITCHBUTTON');
    document.title = 'Welcome';
    $('a.tabnav.tab1')[0].click();
}

function showAssignments() {
    window.external.notify('SHOWSWITCHBUTTON');
    document.title = 'Assignments';
    $('a.tabnav.tab2')[0].click();
}
