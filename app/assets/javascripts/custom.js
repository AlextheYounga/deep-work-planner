var current_time = moment().format("h:mm");
var am_pm = moment().format("a");

//Autosaving Functions
function autosave() {
  var timeoutId;
  $("#timesheet input, #timesheet textarea").on("input propertychange change", function () {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(function () {
      // Runs 1 second (1000 ms) after the last change
      saveToDB();
    }, 1000);
  });
}

function saveToDB() {
  console.log("Saving to the db");
  var uuid = $('.timesheet-uuid').attr('id');
  var date = $('#date').text();
  var timeblock = [];
  $(".time-block").each(function (index) {
    timeblock.push({
      time_start: $(this).find('.time-start').val(),
      task_body: $(this).find('.task-body').val(),
      time_last: $(this).find('.time-last').val(),
    });
  });
  console.log(timeblock);
  $.ajax({
    async: false,
    type: "POST",
    data: {
      date: date,
      uuid: uuid,
      timeblock: timeblock
    },
    url: "/timesheets/autosave",
    beforeSend: function (xhr) {
      // Let them know we are saving
      $(".form-status").html("Creating and Saving...");
    },
    fail: function () {
      $(".form-status").html("");
      $(".form-status").html("There was a problem saving...");
    },
    success: function () {
      var d = new Date();
      $(".form-status").html("");
      $(".form-status").html("Saved! Last: " + d.toLocaleTimeString());
    }
  });
}
//End Autosaving Functions

//function for time formatting on dynamically created elements using cleave.js
function timeFormatLoop() {
  document.querySelectorAll(".time-start , .time-last").forEach(function () {
    $(".time-start , .time-last").on("keydown", function (e) {
      if (e.ctrlKey || e.metaKey) {
        return true;
      }

      if (e.which >= 37 && e.which <= 40) {
        return true;
      }

      if (e.which !== 8 && e.which !== 0 && e.key.match(/[^:0-9]/)) {
        return false;
      }
    }).on("keyup", function (e) {
      var $this = $(this);

      if (e.ctrlKey || e.metaKey || e.which === 8 || e.which === 0 || (e.which >= 37 && e.which <= 40)) {
        return true;
      }

      var ss = parseInt(this.selectionStart);

      var val = $this.val();
      var t = val.replace(/[^0-9]/g, "");
      var h = Math.max(0, Math.min(23, parseInt(t.substr(0, 2))));
      var m = Math.max(0, Math.min(59, parseInt(t.substr(2))));

      if (t.length < 3) {
        m = "";
      }

      var r;

      if (val.length === 2) {
        r = String("0" + h).substr(String(h).length - 1) + ":";
        ss++;
      } else if (val.length >= 3 && val.length < 5) {
        r = String("0" + h).substr(String(h).length - 1) + ":" + m;
        ss++;
      } else if (val.length === 5) {
        r = String("0" + h).substr(String(h).length - 1) + ":" + String("0" + m).substr(String(m).length - 1);
      }

      if (r && r !== $this.val()) {
        $this.val(r);
        this.selectionStart = this.selectionEnd = ss;
      }
    }).blur(function (e) {
      var $this = $(this);

      var val = $this.val();
      var t = val.replace(/[^0-9]/g, "");
      var h = Math.max(0, Math.min(23, parseInt(t.substr(0, 2))));
      var m = Math.max(0, Math.min(59, parseInt(t.substr(2)))) || 0;
      var r = "";

      if (!isNaN(h)) {
        r = String("0" + h).substr(String(h).length - 1) + ":" + String("0" + m).substr(String(m).length - 1);
      }

      $this.val(r);
    });
  });
}
//

$(document).ready(function () {
  //Variables
  timeFormatLoop();
  autosave();

  var time_block = '<div class="time-block border-blue-400 border-l-2 my-12">' +
    '<div class="pl-2">' +
    '<input placeholder="" class="time-start gothic-neo font-light" type="text" name="timesheet[time_start]" id="timesheet_time_start">' +
    "</div>" + '<div class="pl-4 py-4">' +
    '<textarea placeholder="Task at hand" rows="3" cols="35" class="task-body gothic-neo p-2 tracking-wide text-gray-800" name="timesheet[task_body]" id="timesheet_task_body"></textarea>' +
    "</div>" + '<div class="pl-2">' +
    '<input placeholder="XX:XX" class="time-last gothic-neo font-light" type="text" name="timesheet[time_last]" id="timesheet_time_last">' +
    "</div>" +
    "</div>";


  //Time Block Mechanics
  $("#add-block-button").on("click", function (event) {
    event.preventDefault();
    add_block_button = $("#add-block-button").detach();
    time_block_last = $(".time-column .time-block-last").val();

    $(".current-column").append(time_block);
    $(".current-column").append(add_block_button);

    //Start next time block with last time from previous block
    if (time_block_last != "") {
      $(".time-block .time-start").last().val("" + time_block_last + "");
    } else {
      $(".time-block .time-start").last().attr("placeholder", "XX:XX");
    }

    $(".time-column .time-last").removeClass("time-block-last");
    $(".time-column .time-last").last().addClass("time-block-last");
    timeFormatLoop();
    autosave();
  });
  //end Time Block Mechanics

  //Time Column Mechanics
  var i = 1;
  $("#toolbar #schedule-change").on("click", function (event) {
    event.preventDefault();
    i++;
    var time_column = '<div class="time-column sm:w-1/3 current-column" id="timecolumn-' + i + '"></div>';
    add_block_button = $("#add-block-button").detach();
    time_block_last = $(".time-column .time-block-last").val();

    $("#timesheet .time-column").removeClass("current-column");
    $("#timesheet").append(time_column);
    $(".current-column").append(time_block);
    $(".current-column").append(add_block_button);

    $(".time-block .time-start").last().val("" + current_time + "");
    $(".time-block .time-last").last().attr("placeholder", "XX:XX");

    $(".time-column .time-last").removeClass("time-block-last");
    $(".time-column .time-last").last().addClass("time-block-last");
    timeFormatLoop();
    autosave();
  });
  //end Time Column Mechanics

   if($('.message-success').is(":visible")){
    $('.message-success').fadeIn('fast').delay(3500).fadeOut('slow');
    console.log("here");
   }
});
