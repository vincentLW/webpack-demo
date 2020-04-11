import $ from "jquery";
import { render } from "./../../common/js/common";
import i18nInit from '../../i18n/index';
import "./message.scss";

$(function () {
  render();
  i18nInit();
  console.log('i18n',i18n('homeRumor'));
});
