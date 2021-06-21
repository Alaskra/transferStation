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
  alert(evt.target.responseText);
}

function uploadFailed(evt) {
  alert("There was an error attempting to upload the file.");
}

function uploadCanceled(evt) {
  alert("The upload has been canceled by the user or the browser dropped the connection.");
}
