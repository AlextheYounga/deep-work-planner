var current_time = moment().format('h:mm:ss a');
$(document).ready(function () {
    $('.time-start').html(current_time);
});