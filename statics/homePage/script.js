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
$(document).ready(function () {
  $("#file-input").fileinput({
    showPreview: false,
  });
});