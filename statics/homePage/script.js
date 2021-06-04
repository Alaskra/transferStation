"use strict"
var textarea = $("#text");
var button_group1 = $("#text_edit_enable_button, #text_copy_button");
var button_group2 = $("#text_edit_disable_button, #text_update_button");

$(document).ready(function () {
  button_group2.hide();
})
function textEditEnable() {
  textarea.removeAttr("readonly");
  button_group1.hide();
  button_group2.show();
}

function textEditDisable() {
  button_group1.show();
  button_group2.hide();
}

var clipboard = new ClipboardJS('#text_copy_button');
clipboard.on('success', function (e) {
  cocoMessage.success(1000, "复制成功")
})
clipboard.on('error', function (e) {
  cocoMessage.error(1000, "复制失败")
})

function fileSelected() {
  var file = $("#fileToUpload")[0].files[0];
  if (file) {
    var fileSize = 0;
    if (file.size > 1024 * 1024)
      fileSize = (Math.round(file.size * 100 / (1024 * 1024)) / 100).toString() + 'MB';
    else
      fileSize = (Math.round(file.size * 100 / 1024) / 100).toString() + 'KB';
    $("#fileName").html('Name: ' + file.name);
    $("#fileSize").html('Size: ' + fileSize);
    $("#fileType").html('Type: ' + file.type);
  }
}

function uploadFile() {
  var fd = new FormData();
  var form = $("#formUploadFile")[0];
  fd.append("file", $('#fileToUpload')[0].files[0]);
  fd.append("csrfmiddlewaretoken", $("#formUploadFile input")[0].value)
  var xhr = new XMLHttpRequest();
  xhr.upload.addEventListener("progress", uploadProgress, false);
  xhr.addEventListener("load", uploadComplete, false);
  xhr.addEventListener("error", uploadFailed, false);
  xhr.addEventListener("abort", uploadCanceled, false);
  xhr.open("POST", form.action);
  $("#progressNumber").removeClass(hide);
  xhr.send(fd);
}

function uploadProgress(evt) {
  if (evt.lengthComputable) {
    var percentComplete = Math.round(evt.loaded * 100 / evt.total);
    $('#progressNumber').val(percentComplete);
  } else {
    $('#progressNumber').html('unable to compute');
  }
}

function uploadComplete(evt) {
  /* This event is raised when the server send back a response */
  // alert(evt.target.responseText);
  location.href = evt.target.responseURL;
}

function uploadFailed(evt) {
  alert("There was an error attempting to upload the file.");
}

function uploadCanceled(evt) {
  alert("The upload has been canceled by the user or the browser dropped the connection.");
}