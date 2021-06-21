"use strict"
var textarea = $("#text");
var button_group1 = $("#text_edit_enable_button, #text_copy_button");
var button_group2 = $("#text_edit_disable_button, #text_update_button");

function textEditEnable() {
  textarea.removeAttr("readonly");
  button_group1.addClass("d-none");
  button_group2.removeClass('d-none');
}

function textEditDisable() {
  button_group1.removeClass('d-none');
  button_group2.addClass('d-none');
}

var clipboard = new ClipboardJS('#text_copy_button');
clipboard.on('success', function (e) {
  cocoMessage.success(1000, "复制成功")
})
clipboard.on('error', function (e) {
  cocoMessage.error(1000, "复制失败")
})

function fileSelected(e) {
  var file = e.files[0];
  if (file) {
    var fileSize = 0;
    if (file.size > 1024 * 1024)
      fileSize = (Math.round(file.size * 100 / (1024 * 1024)) / 100).toString() + 'MB';
    else
      fileSize = (Math.round(file.size * 100 / 1024) / 100).toString() + 'KB';
    var fileNameElement = e.parentElement.parentElement.nextElementSibling;
    var fileSizeElement = fileNameElement.nextElementSibling;
    var fileTypeElement = fileSizeElement.nextElementSibling;
    fileNameElement.textContent = 'Name: ' + file.name;
    fileSizeElement.textContent = 'Size: ' + fileSize;
    fileTypeElement.textContent = 'Type: ' + file.type;
  }
}

function uploadFile(e) {
  var form = e.parentElement;
  var fd = new FormData(form);
  var xhr = new XMLHttpRequest();
  xhr.upload.addEventListener("progress", uploadProgress, false);
  xhr.addEventListener("load", uploadComplete, false);
  xhr.addEventListener("error", uploadFailed, false);
  xhr.addEventListener("abort", uploadCanceled, false);
  xhr.open("POST", form.action);
  e.previousElementSibling.className = "prog";
  xhr.send(fd);
}

function uploadProgress(evt) {
  if (evt.lengthComputable) {
    var percentComplete = String(Math.round(evt.loaded * 100 / evt.total));
    $('.prog').text('正在上传：' + percentComplete + '%');
  } else {
    $('.prog').html('unable to compute');
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

document.addEventListener('paste', function (event) {
  var items = event.clipboardData && event.clipboardData.items;
  var file = null;
  if (items && items.length) {
    // 检索剪切板items
    for (var i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        file = items[i].getAsFile();
        // 此时file就是剪切板中的图片文件
        var form = $("#img")[0];
        var fd = new FormData(form);
        fd.append('img', file);
        var xhr = new XMLHttpRequest();
        xhr.open("POST", '/');
        xhr.send(fd);
        location.reload();
      }
    }
  }
});