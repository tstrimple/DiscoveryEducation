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

$(document).ready(updateViewport);
$(window).resize(updateViewport);

function toggleCalendarView() {
    if ($('#assignments').is(':visible')) {
        $('.view-switcher-inner .btn[data-view="calendar"]').click();
    }
    else {
        $('.view-switcher-inner .btn[data-view="list"]').click();
    }
}

function showWelcome() {
    $('a.tabnav.tab1')[0].click();
}

function showAssignments() {
    $('a.tabnav.tab2')[0].click();
}
