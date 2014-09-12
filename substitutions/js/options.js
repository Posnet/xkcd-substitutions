// function save_options() {
//   var color = document.getElementById('color').value;
//   var likesColor = document.getElementById('like').checked;
//   chrome.storage.sync.set({
//     favoriteColor: color,
//     likesColor: likesColor
//   }, function() {
//     // Update status to let user know options were saved.
//     var status = document.getElementById('status');
//     status.textContent = 'Options saved.';
//     setTimeout(function() {
//       status.textContent = '';
//     }, 750);
//   });
// }

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

$(document).ready(function(){
    var next = 1;
    $(".add-more").click(function(e){
        e.preventDefault();
        var addto = "#field" + next;
        var addRemove = "#replace" + next;
        next = next + 1;
        var newIn = '<div id="field' + next + '" class="row">' + '<div class="col-xs-6 ginp"> <input autocomplete="off" id="origin' + next + '" name="origin' + next + '" type="text" class="input form-control">' + '</div><div class="col-xs-6 ginp"><div class="input-group">' + '<input autocomplete="off" id="replace' + (next - 1) + '" name="replace' + next + '" type="text" class="input form-control"> </div>'
        var newInput = $(newIn);
        var removeBtn = '<span class="input-group-btn"> <button id="remove' + (next) + '" class="btn btn-danger remove-me" type="button"><i class="fa fa-remove"></i></button></span>'
        var removeButton = $(removeBtn);
        $(addto).after(newIn);
        $(addRemove).after(removeButton);
        // $("#field" + next).attr('data-source',$(addto).attr('data-source'));
        // $("#count").val(next);  
        
            $('.remove-me').click(function(e){
                e.preventDefault();
                var fieldNum = this.id.substring(6);
                var fieldID = "#field" + fieldNum;
                $(fieldID).remove();
            });
    }); 
});
