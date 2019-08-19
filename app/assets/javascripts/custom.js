var current_time = moment().format('h:mm a');

$('.plus-button').hover(function () {
    $('.button-clarify').removeClass('hidden');
    $('.button-clarify').addClass('inline-block');
    $('.add-new-button').addClass('rounded-lg');
    $('.add-new-button').addClass('bg-blue-400');

}, function () {
    $('.button-clarify').removeClass('inline-block');
    $('.button-clarify').addClass('hidden');
    $('.add-new-button').removeClass('rounded-lg');
    $('.add-new-button').removeClass('bg-blue-400');
});
