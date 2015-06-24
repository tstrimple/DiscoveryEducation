
function toggleCalendarView() {
    if ($('#assignments').is(':visible')) {
        $('.view-switcher-inner .btn[data-view="calendar"]').click();
    }
    else {
        $('.view-switcher-inner .btn[data-view="list"]').click();
    }
}
