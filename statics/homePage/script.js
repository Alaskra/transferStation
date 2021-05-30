"use strict"
var textarea = $("#text");

function textEditEnable() {
  textarea.removeAttr("readonly");
  $("#text_edit_enable_button").addClass("hide");
  $("#text_copy_button").addClass("hide");
  $("#text_edit_disable_button").removeClass("hide");
  $("#text_update_button").removeClass("hide");
}

function textEditDisable() {
  textarea.attr("readonly", "");
  $("#text_edit_enable_button").removeClass("hide");
  $("#text_copy_button").removeClass("hide");
  $("#text_edit_disable_button").addClass("hide");
  $("#text_update_button").addClass("hide");
}

var clipboard = new ClipboardJS('#text_copy_button');
clipboard.on('success', function (e) {
  cocoMessage.success(1000, "复制成功")
})
clipboard.on('error', function (e) {
  cocoMessage.error(1000, "复制失败")
})
// $(document).ready(function () {
//   $("#file-input").fileinput({
//     showPreview: false,
//   });
// });
function fileSelected() {
  var file = document.getElementById('fileToUpload').files[0];
  if (file) {
    var fileSize = 0;
    if (file.size > 1024 * 1024)
      fileSize = (Math.round(file.size * 100 / (1024 * 1024)) / 100).toString() + 'MB';
    else
      fileSize = (Math.round(file.size * 100 / 1024) / 100).toString() + 'KB';

    document.getElementById('fileName').innerHTML = 'Name: ' + file.name;
    document.getElementById('fileSize').innerHTML = 'Size: ' + fileSize;
    document.getElementById('fileType').innerHTML = 'Type: ' + file.type;
  }
}

function uploadFile() {
  var fd = new FormData();
  var form = $("#formUploadFile")[0];
  fd.append("file", document.getElementById('fileToUpload').files[0]);
  fd.append("csrfmiddlewaretoken",$("#formUploadFile input")[0].value)
  var xhr = new XMLHttpRequest();
  xhr.upload.addEventListener("progress", uploadProgress, false);
  xhr.addEventListener("load", uploadComplete, false);
  xhr.addEventListener("error", uploadFailed, false);
  xhr.addEventListener("abort", uploadCanceled, false);
  xhr.open("POST", form.action);
  xhr.send(fd);
}

function uploadProgress(evt) {
  if (evt.lengthComputable) {
    var percentComplete = Math.round(evt.loaded * 100 / evt.total);
    document.getElementById('progressNumber').innerHTML = percentComplete.toString() + '%';
  } else {
    document.getElementById('progressNumber').innerHTML = 'unable to compute';
  }
}

function uploadComplete(evt) {
  /* This event is raised when the server send back a response */
  // alert(evt.target.responseText);
  location.href=evt.target.responseURL;
}

function uploadFailed(evt) {
  alert("There was an error attempting to upload the file.");
}

function uploadCanceled(evt) {
  alert("The upload has been canceled by the user or the browser dropped the connection.");
}