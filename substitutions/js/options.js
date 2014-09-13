function save_options(e) {
    e.preventDefault;
    var blacklist = $("#website-blacklist").val().replace(/\s+/g, " ").split(",");
    var replacements = [];
    var value = function(e){
      return e.val();
    }
    var rep_inputs = $("#replacements").filter(":input").map(value);
    console.log($("body").filter("#website-blacklist"));

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
        var addRemove = "#replace" + next;
        var newIn = '<div id="field' + next + '" class="row">' + '<div class="col-xs-6 ginp"> <input autocomplete="off" placeholder="original" id="origin' + next + '" name="origin' + next + '" type="text" class="input form-control">' + '</div><div class="col-xs-6 ginp"><div class="input-group">' + '<input autocomplete="off" placeholder="substitution" id="replace' + next + '" name="replace' + next + '" type="text" class="input form-control"> </div>'
        // var newInput = $(newIn);
        // var removeBtn = '<span class="input-group-btn"> <button id="remove' + (next) + '" class="btn btn-danger remove-me" type="button"><i class="fa fa-remove"></i></button></span>'
        // var removeBtn = '<span class="input-group-btn add-rep"> <button class="btn btn-info add-more" type="button"><i class="fa fa-plus"></i></button></span>'
        // var removeButton = $(removeBtn);
        // $(".add-more").re attr("class", "btn btn-danger remove-me").attr("id", "remove" + (next-1));
        // $(".add-more-icon").attr("class", "fa fa-remove");
        $(addto).before(newIn);
        $(addRemove).after($(".add-rep").replaceWith(addBtn));
        $(".add-more").on('click', addbutt);
        // $("#field" + next).attr('data-source',$(addto).attr('data-source'));
        // $("#count").val(next);  
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
    $("body").keypress(function(e){
      if (e.which == 13){
        e.preventDefault();
        save_options(e);
      }
    })
});