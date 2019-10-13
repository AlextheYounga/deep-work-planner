var current_time = moment().format("h:mm");
var am_pm = moment().format("a");

 //Autosaving Functions
 function autosave() {
  var timeoutId;
  $("input, textarea").on("input propertychange change", function () {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(function () {
      // Runs 1 second (1000 ms) after the last change
      saveToDB();
    }, 1000);
  });
}

function saveToDB() {
  console.log("Saving to the db");

  console.log($('#timesheet').serialize());

  $.ajax({
    async: false,
    type: "POST",
    data: $('#timesheet').serialize(),
    url: "/timesheets",
    beforeSend: function (xhr) {
      // Let them know we are saving
      $(".form-status").html("Saving...");
    },
    success: function (data) {
      var d = new Date();
      $(".form-status").html("");
      $(".form-status").html("Saved! Last: " + d.toLocaleTimeString());
    }
  });
}
// This is just so we don't go anywhere
// and still save if you submit the form
$(".save").submit(function (e) {
  saveToDB();
  e.preventDefault();
});
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
  var time_block = '<div class="time-block border-blue-400 border-l-2">' +
    '<div class="pl-2">' +
    '<input type="text" name="time-start" id="time-start" placeholder="" class="time-start font-thin"></input>' +
    "</div>" + '<div class="pl-4 py-4">' +
    '<textarea name="task-body" id="task-body" placeholder="Task at hand" rows="3" class="task-body helvetica italic p-2 tracking-wide font-light text-gray-900"></textarea>' +
    "</div>" + '<div class="pl-2">' +
    '<input type="text" name="time-last" id="time-last" placeholder="XX:XX" class="time-last font-thin"></input>' +
    "</div>" +
    "</div>";

  //Time Block Init
  $(".time-block .time-init").val("" + current_time + "");
  $(".time-block .time-last-init").attr("placeholder", "XX:XX");

  //Time Block Mechanics
  $("#add-block-button").on("click", function () {
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
    $(".time-column .time-block").last().addClass("my-12");
    timeFormatLoop();
    autosave();
  });
  //end Time Block Mechanics

  //Time Column Mechanics
  var i = 1;
  $("#toolbar #schedule-change").on("click", function () {
    i++;
    var time_column = '<div class="time-column w-1/5 current-column" id="timecolumn-' + i + '"></div>';
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
});
