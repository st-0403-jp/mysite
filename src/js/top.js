/*top.js*/

page.top = (function () {
  return {
    execute: function () {

      common.util.renderDate($('.js-toYear'), 'year');

      var $navLi = $('nav li');
      var $article = $('article');
      /*
      $('body').addEventListener('click', function (e) {
        console.log(e.path[0].classList);
        console.log(e.path[1].classList);
        if (e.path[0] === )
      });
      */
      /*
      var delegateFunk = function (e) {
        if (e.path[0].classList.value)
      }
      */

      $article.addEventListener('scroll', function () {
        Array.prototype.forEach.call($navLi, function (li) {
          li.classList.remove('current');
        });
        //0~1344
        //console.log(this.scrollTop);
        if (this.scrollTop < 270) {
          //profile
          $navLi[0].classList.add('current');
        } else if (270 < this.scrollTop && this.scrollTop < 540) {
          //blog
          $navLi[1].classList.add('current');
        } else if (540 < this.scrollTop && this.scrollTop < 810) {
          //output
          $navLi[2].classList.add('current');
        } else if (810 < this.scrollTop && this.scrollTop < 1080) {
          //package
          $navLi[3].classList.add('current');
        } else if (1080 < this.scrollTop && this.scrollTop <= 1348) {
          //contact
          $navLi[4].classList.add('current');
        }
      });
      var $skillLi = $('#skill li');
      Array.prototype.forEach.call($skillLi, function (li) {
        var circleWidth = li.dataset.circle;
        li.setAttribute('data-content', '');
      });

      xhr.onreadystatechange = function () {

        switch(xhr.readyState) {
          case 1:
            console.log("open() メソッドの呼び出しが完了した");
            break;

          case 2:
            console.log("レスポンスヘッダの受信が完了した");
            break;

          case 3:
            console.log("レスポンスボディを受信中（繰り返し実行される）");
            break;

          case 4:
            //console.log(xhr.getAllResponseHeaders());
            console.log(xhr.responseText);
            var res = xhr.responseText;
            console.log("XHR 通信が完了した（成功失敗に関わらず）");
            setTimeout(function () {
              $('.profile_elements').innerHTML = res;
            }, 200);
            break;
          };
      };

      var httpRequest = function () {
        xhr.open('GET', '../tmp/profile/history.html', false);
        xhr.setRequestHeader("Content-Type" , "text/html");
        xhr.send();
        xhr.abort();
      };

      $('body').addEventListener('click', function (e) {
        var currentTarget = e.path[0];
        if (!(currentTarget.classList.value.indexOf('switch-next') === -1)) {
          //必要DOM
          var currentParent = e.path[1];
          var leftArrow = currentParent.firstElementChild;
          var rightArrow = currentParent.lastElementChild;
          var pageCircleClass = [];
          Array.prototype.forEach.call(currentParent.children, function (i, index, is) {
            if (!(index === 0 || index === is.length - 1)) {
              if (i.classList.value.indexOf('fa-circle-o') === -1) {
                console.log(i);
                /*
                i.classList.remove('fa-circle');
                i.classList.add('fa-circle-o');
                i.nextElementSibling.classList.remove('fa-circle-o');
                i.nextElementSibling.classList.add('fa-circle');
                */
              }
              //pageCircleClass.push(i.classList);
            }
          });
          httpRequest();
        }
      });
    }
  };
})();
