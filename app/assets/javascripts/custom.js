var current_time = moment().format('h:mm a');
var am_pm = moment().format('a');

//Autosaving Functions
var timeoutId;
$('#timesheet input, #timesheet textarea').on('input propertychange change', function () {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(function () {
        // Runs 1 second (1000 ms) after the last change    
        saveToDB();
    }, 1000);
});

function saveToDB() {
    console.log('Saving to the db');
    form = $('#timesheet');
        
    $.ajax({
        async: false,
        type: "POST",
        dataType: 'html',
        data: form.html(),
        url: "/timesheet-auto-save",
        beforeSend: function (xhr) {
            // Let them know we are saving
            $('.form-status').html('Saving...');
        },
        success: function (data) {
            var form_data = jQuery(data); // You can get data returned from your ajax call here. ex. jqObj.find('.returned-data').html()
            // Now show them we saved and when we did
            console.log(form_data);
            var d = new Date();
            $('.form-status').html('Saved! Last: ' + d.toLocaleTimeString());
        }
    });
}

// This is just so we don't go anywhere  
// and still save if you submit the form
$('.contact-form').submit(function (e) {
    saveToDB();
    e.preventDefault();
});
//End Autosaving Functions

$(document).ready(function () {
    //Variables
    var time_column = '<div class="w-1/5 current-column" id="time-column"></div>';
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


    //Time Block Init
    $('#time-block .time-init').val('' + current_time + '');
    $('#time-block .time-last-init').attr("placeholder", "XX:XX " + am_pm + "");

    //Time Block Mechanics    
    $("#add-block-button").on("click", function () {
        add_block_button = $('#add-block-button').detach();
        time_block_last = $('#time-column .time-block-last').val();

        $('.current-column').append(time_block);
        $('.current-column').append(add_block_button);

        //Start next time block with last time from previous block
        if (time_block_last != '') {
            $('#time-block #time-start').last().val('' + time_block_last + '');
        } else {
            $('#time-block #time-start').last().attr("placeholder", "XX:XX " + am_pm + "");
        }

        $('#time-column #time-last').removeClass('time-block-last');
        $('#time-column #time-last').last().addClass('time-block-last');
    });
    //end Time Block Mechanics


    //Time Column Mechanics
    $("#toolbar #schedule-change").on("click", function () {
        add_block_button = $('#add-block-button').detach();
        time_block_last = $('#time-column .time-block-last').val();

        $('#timesheet #time-column').removeClass('current-column');
        $('#timesheet').append(time_column);
        $('.current-column').append(time_block);
        $('.current-column').append(add_block_button);

        $('#time-block #time-start').last().val('' + current_time + '');
        $('#time-block #time-last').last().attr("placeholder", "XX:XX " + am_pm + "");;

        $('#time-column #time-last').removeClass('time-block-last');
        $('#time-column #time-last').last().addClass('time-block-last');

    });
    //end Time Column Mechanics

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

