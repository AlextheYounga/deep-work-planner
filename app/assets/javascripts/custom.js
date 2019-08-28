var current_time = moment().format('h:mm a');
var am_pm = moment().format('a');

$(document).ready(function () {
    //Time Block Mechanics
    
    $('#time-block .time-last-init').attr("placeholder", "XX:XX " + am_pm + "");

    var time_block = '<div class="border-blue-400 border-l-2 my-12" id="time-block">' +
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
        time_block_last = $('#time-column .time-block-last').val();
        $('#time-column').append(time_block);
        if (time_block_last != '') {
            $('#time-block #time-start').last().val('' + time_block_last + '');
        } else {
            $('#time-block #time-start').last().attr("placeholder", "XX:XX " + am_pm + "");
        }
        $('#time-column #time-last').removeClass('time-block-last');
        $('#time-column #time-last').last().addClass('time-block-last');
    });

    //Math functions for time and automatically inserting colon
    $('#time-start , #time-last').keydown(function (e) {
        if (e.ctrlKey || e.metaKey) {
            return true;
        }

        if (e.which >= 37 && e.which <= 40) {
            return true;
        }

        if (e.which !== 8 && e.which !== 0 && e.key.match(/[^:0-9]/)) {
            return false;
        }
    }).keyup(function (e) {
        var $this = $(this);

        if (e.ctrlKey || e.metaKey || e.which === 8 || e.which === 0 || (e.which >= 37 && e.which <= 40)) {
            return true;
        }

        var ss = parseInt(this.selectionStart);

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
            ss++;
        } else if (val.length >= 3 && val.length < 5) {
            r = String('0' + h).substr(String(h).length - 1) + ':' + m;
            ss++;
        } else if (val.length === 5) {
            r = String('0' + h).substr(String(h).length - 1) + ':' + String('0' + m).substr(String(m).length - 1);
        }

        if (r && r !== $this.val()) {
            $this.val(r);
            this.selectionStart = this.selectionEnd = ss;
        }
    }).blur(function (e) {
        var $this = $(this);

        var val = $this.val();
        var t = val.replace(/[^0-9]/g, '');
        var h = Math.max(0, Math.min(23, parseInt(t.substr(0, 2))));
        var m = Math.max(0, Math.min(59, parseInt(t.substr(2)))) || 0;
        var r = '';

        if (!isNaN(h)) {
            r = String('0' + h).substr(String(h).length - 1) + ':' + String('0' + m).substr(String(m).length - 1);
        }

        $this.val(r);
    });
    //End math functions
});

