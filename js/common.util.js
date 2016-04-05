/*common.util.js*/

common.util = (function () {
  var method = {};

  method.renderDate = function (ele, ymd) {
    if (typeof ymd === 'string') {
      console.log(typeof ymd);
    }
    if (ymd === 'year') {
      return (ele.length === 1) ? ele.innerHTML = new Date().getFullYear() : Array.prototype.forEach.call(ele, function (e) { e.innerHTML = new Date().getFullYear(); });
    } else if (ymd === 'date') {
      return ele.innerHTML = new Date().getDate();
    } else if (ymd === 'month') {
      return ele.innerHTML = new Date().getMonth() + 1;
    }
  };

  return method;
})();
