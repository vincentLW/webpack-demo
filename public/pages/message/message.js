import $ from 'jquery';
import { render } from './../../common/js/common';

$(function () {
  $('.message').text('message name');
  $('.message').css({ color: 'red' });
  render();
});
console.log('xxx');
