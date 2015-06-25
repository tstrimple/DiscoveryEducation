function updateViewport() {
    var viewportWidth = $(window).width();
    var viewportHeight = $(window).height();

    setContainerWidth(viewportWidth);
    setVideoSize(viewportWidth, viewportHeight);
}

function setContainerWidth(width) {
    $('.container').width(width);
}

function setVideoSize(width, height) {
   // $('.container').width(400);
   // $('.container').height(300);
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
    $('a.tabnav.tab1')[0].click();
}

function showAssignments() {
    window.external.notify('SHOWSWITCHBUTTON');
    $('a.tabnav.tab2')[0].click();
}
