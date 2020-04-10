import $ from "jquery";
import { render } from "./../../common/js/common";
import "./message.scss";
import Icon from '../../imgs/icon.jpg'

$(function () {
  $(".message").text("message name");
  $(".message").css({ color: "red" });
  render();



  // 将图像添加到我们现有的 div。
  var myIcon = new Image();
  myIcon.src = Icon;

  $(".message").append(myIcon);


});
console.log("xxx");
