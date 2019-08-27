var time_block_button = '<div class="add-time-block flex ml-8 mt-8">' +
    '<button class="bg-gray-400 h-8 relative w-8" id="time-block-button"></button>' +
    '<span class="time-block-text font-light helvetica italic ml-2 pt-1 text-white tracking-wide w-40">Add New Time Block</span>' +
    '</div>';
var current_time = moment().format('h:mm a');
var am_pm = moment().format('a');
// var time_block_end = $('body input[name="time-last"]').last().val();
// var time_block_start = $('body input[name="time-start"]').last().val();


$(document).ready(function () {
    $('.time-block .time-init').val('' + current_time + '');
    $('.time-block .time-last-init').attr("placeholder", "XX:XX " + am_pm + "");

    var time_block = '<div class="time-block border-blue-400 border-l-2 my-12">' +
        '<div class="pl-2">' +
        '<input type="text" name="time-start" id="time-start" placeholder="" class="font-thin"></input>' +
        '</div>' +
        '<div class="pl-4 py-4">' +
        '<textarea placeholder="Task at hand" rows="3" class="task helvetica italic p-2 tracking-wide font-light text-gray-900"></textarea>' +
        '</div>' +
        '<div class="pl-2">' +
        '<input type="text" name="time-last" id="time-last" placeholder="XX:XX ' + am_pm + '" class="font-thin"></input>' +
        '</div>' +
        '</div>';

    $(".add-time-block").on("click", "#time-block-button", function () {
        var time_block_end = $('body').find('#time-last').val();
        var time_block_start = $('body').find('#time-start').val();
        console.log(time_block_start);
        console.log(time_block_end);
        $('.time-column').append(time_block);
        if (time_block_end != '') {
            $('.time-block #time-start').last().val('' + time_block_end + '');
        } else {
            $('.time-block #time-start').last().attr("placeholder", "XX:XX " + am_pm + "");
        }
    });

    //Functions for automatically inserting colon and am/pm
    $('input #time-start , #time-last').keydown(function (e) {
    }).keyup(function (e) {
        var $this = $(this);

        if (e.ctrlKey || e.metaKey || e.which === 8 || e.which === 0 || (e.which >= 37 && e.which <= 40)) {
            return true;
        }

        var selection_start = parseInt(this.selectionStart);

        var val = $this.val();
        var t = val.replace(/[^0-9]/g, '');
        var h = Math.max(0, Math.min(23, parseInt(t.substr(0, 2))));
        var m = Math.max(0, Math.min(59, parseInt(t.substr(2))));

        if (t.length < 3) {
            m = '';
        }

        var r;

        if (val.length === 2) {
            r = String('0' + h).substr(String(h).length - 1) + ':';
            selection_start++;
        } else if (val.length >= 3 && val.length < 5) {
            r = String('0' + h).substr(String(h).length - 1) + ':' + m;
            selection_start++;
        } else if (val.length === 5) {
            r = String('0' + h).substr(String(h).length - 1) + ':' + String('0' + m).substr(String(m).length - 1);
        }

        if (r && r !== $this.val()) {
            $this.val(r);
            this.selectionStart = this.selectionEnd = selection_start;
        }
    }).blur(function (e) {
        var $this = $(this);

        var v = $this.val();
        var t = val.replace(/[^0-9]/g, '');
        var h = Math.max(0, Math.min(23, parseInt(t.substr(0, 2))));
        var m = Math.max(0, Math.min(59, parseInt(t.substr(2)))) || 0;
        var r = '';

        if (!isNaN(h)) {
            r = String('0' + h).substr(String(h).length - 1) + ':' + String('0' + m).substr(String(m).length - 1);
        }

        $this.val(r);
    });
});

