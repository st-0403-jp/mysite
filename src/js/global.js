/*global.js*/

const model = {};
const common = {};
const page = {};

$ = function (eleName) {
  var ele = document.querySelectorAll(eleName);
  if (ele.length === 1) {
    ele = document.querySelector(eleName);
  }
  return ele;
};

var xhr = new XMLHttpRequest();
