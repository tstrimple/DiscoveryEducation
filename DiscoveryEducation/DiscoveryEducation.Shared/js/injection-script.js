/* 
   OBROWN : Only for Phones, the buttons for Caldar / List view are in the way.
   These buttons are moved to the Nar Bar and utilize this function to toggle views
   code modified from what Discovery Ed Dev team sent over
*/
function toggleCalendarView() {
    $('#assignments').toggle();
    $('#filters').toggle();
    $('.btn-toolbar .btn-group').toggle();
    calendarView = !calendarView;
    $('#student-assignments-calendar').toggle();

    if (!calendarView) {
        filterKey.calendarDate = "";
        $('#student-assignments-calendar').empty();
        assignmentsQryStr();
    }
    else {
        getCalendar();
    }
}
