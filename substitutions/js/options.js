function save_options(e) {
  e.preventDefault;
  var blacklist = $("#website-blacklist").val().replace(/\s+/g, " ").split(",");
  var replacements = [];
  var value = function(e) {
    return e.val();
  }
  var rep_inputs = $("#replacements").filter(":input").map(value);
  console.log($("body").filter("#website-blacklist"));
  $("#save").removeClass("btn-warning").addClass("btn-success").children("i").removeClass("fa-save").addClass("fa-check");
  $("#save span").text("Saved");
}
// // Restores select box and checkbox state using the preferences
// // stored in chrome.storage.
// function restore_options() {
//   // Use default value color = 'red' and likesColor = true.
//   chrome.storage.sync.get({
//     favoriteColor: 'red',
//     likesColor: true
//   }, function(items) {
//     document.getElementById('color').value = items.favoriteColor;
//     document.getElementById('like').checked = items.likesColor;
//   });
// }
// document.addEventListener('DOMContentLoaded', restore_options);
// document.getElementById('save').addEventListener('click',
//   save_options);

var addbutt = (function(e) {
  var next = 1;
  return function(e) {
    e.preventDefault();
    var addto = "#field" + next;
    var addBtn = '<span class="input-group-btn"> <button id="remove' + next + '" class="btn btn-danger remove-me" type="button"><i class="fa fa-remove"></i></button> </span>'
    next = next + 1;
    var newIn = '<div id="field' + next + '" class="row">' + '<div class="col-xs-6 ginp"> <input autocomplete="off" placeholder="original" id="origin' + next + '" name="origin' + next + '" type="text" class="input form-control">' + '</div><div class="col-xs-6 ginp"><div class="input-group">' + '<input autocomplete="off" placeholder="substitution" id="replace' + next + '" name="replace' + next + '" type="text" class="input form-control"> </div>'
    $(addto).before(newIn);
    $(("#replace" + next)).after($(".add-rep").replaceWith(addBtn));
    $(".add-more").on('click', addbutt);
    $('.remove-me').on('click', function(e) {
      e.preventDefault();
      var fieldNum = this.id.substring(6);
      var fieldID = "#field" + fieldNum;
      $(fieldID).remove();
    });
  }
})();
$(document).ready(function() {
  $(".add-more").on('click', addbutt);

  $("#save").on('click', save_options);

  $("#blacklist").keypress(function(e) {
    if (e.which == 13) {
      e.preventDefault();
      save_options(e);
    }
  })

  $("#options").change(function(e){
    $("#save").removeClass("btn-success").addClass("btn-warning").children("i").removeClass("fa-check").addClass("fa-save");
    $("#save span").text("Save");
  })

  $("#replacements").keypress(function(e) {
    if (e.which == 13) {
      e.preventDefault();
      addbutt(e);
      $(this).find('input')[0].focus();
    }
  })
});