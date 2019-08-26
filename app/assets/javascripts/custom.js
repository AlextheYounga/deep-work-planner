var current_time = moment().format('h:mm a');
var am_pm = moment().format('a');
var time_block_end = $('.time-block #time-last').last().val();
var time_block_button = '<div class="add-time-block flex ml-8 mt-8">' +
    '<button class="bg-gray-400 h-8 relative w-8" id="time-block-button"></button>' +
    '<span class="time-block-text font-light helvetica italic ml-2 pt-1 text-white tracking-wide w-40">Add New Time Block</span>' +
    '</div>';

$(document).ready(function () {
    $('.time-block #time-init').attr("placeholder", "" + current_time + "");
    $('.time-block #time-last-init').attr("placeholder", "XX:XX " + am_pm + "");

    var time_block = '<div class="time-block border-blue-400 border-l-2 my-12">' +
        '<div class="pl-2">' +
        '<input type="text" placeholder="" class="font-thin" id="time-start" />' +
        '</div>' +
        '<div class="pl-4 py-4">' +
        '<textarea placeholder="Task at hand" rows="3" class="task helvetica italic p-2 tracking-wide font-light text-gray-900"></textarea>' +
        '</div>' +
        '<div class="pl-2">' +
        '<input type="text" placeholder="XX:XX "' + am_pm + '" class="font-thin" id="time-last" />' +
        '</div>' +
        '</div>';

    $(".add-time-block").on("click", "#time-block-button", function () {
        $('.time-block #time-start').removeClass(".time-start");
        $('.time-block #time-last').removeClass(".time-last");
        $('.time-column').append(time_block);
        // $('.time-block #time-start').last().addClass(".time-start");
        // $('.time-block #time-last').last().addClass(".time-last");
        if (time_block_end != '') {
            $('.time-block #time-start').last().attr("placeholder", "" + time_block_end + "");
        } else {
            $('.time-block #time-last').last().attr("placeholder", "XX:XX " + am_pm + "");
        }
    });
});