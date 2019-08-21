var current_time = moment().format('h:mm a');


var time_block = '<div class="time-block border-blue-400 border-l-2 my-12">' +
    '<div class="pl-2">' +
    '<input type="text" placeholder="XX:XX PM" class="time-start font-thin" />' +
    '</div>' +
    '<div class="pl-4 py-4">' +
    '<textarea placeholder="Task at hand" rows="3" class="task helvetica italic p-2 tracking-wide font-light text-gray-900"></textarea>' +
    '</div>' +
    '<div class="pl-2">' +
    '<input type="text" placeholder="XX:XX PM" class="font-thin" />' +
    '</div>' +
    '</div>';

var time_block_button = '<div class="add-time-block flex ml-8 mt-8">' +
    '<button class="bg-gray-400 h-8 relative w-8" id="time-block-button"></button>' +
    '<span class="time-block-text font-light helvetica italic ml-2 pt-1 text-white tracking-wide w-40">Add New Time Block</span>' +
    '</div>';

$(".add-time-block").on("click", "#time-block-button", function () {
    $('.add-time-block').remove();
    $('.time-column').append(time_block);
    $('.time-column').append(time_block_button);
});