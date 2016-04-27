/*common.util.js*/

common.util = (function () {
  var method = {};

  method.renderDate = function (ele, ymd) {
    var dateObj = new Date();
    if (typeof ymd === 'string') {
      //console.log(typeof ymd);
    }
    if (ymd === 'year') {
      return (Array.isArray(ele)) ? Array.prototype.forEach.call(ele, function (e) { e.innerHTML = dateObj.getFullYear(); }) : ele.innerHTML = dateObj.getFullYear();
    } else if (ymd === 'date') {
      return ele.innerHTML = new Date().getDate();
    } else if (ymd === 'month') {
      return ele.innerHTML = new Date().getMonth() + 1;
    }
  };

  return method;
})();
