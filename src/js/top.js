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
              $('.profile_box').innerHTML = res;
              $('.profile_box').style.opacity = 1.0;
            }, 1500);
            break;
          };
      };

      var httpRequest = function (type, pass, content) {
        xhr.open(type, pass, false);
        xhr.setRequestHeader('Content-Type' , content);
        xhr.send();
        xhr.abort();
      };

      //switch-nextクリック
      $('body').addEventListener('click', function (e) {
        if (e.path[0].classList.value.indexOf('switch-next') === -1 && e.path[0].classList.value.indexOf('switch-prev') === -1) {
          return false;
        }
        //必要DOM
        var currentTarget = e.path[0];
        var currentParent = e.path[1];
        var leftArrow = currentParent.firstElementChild;
        var rightArrow = currentParent.lastElementChild;

        var pageCircleClass = [];
        if (!(currentTarget.classList.value.indexOf('switch-next') === -1)) {
          Array.prototype.forEach.call(currentParent.children, function (i, index, is) {
            if (!(index === 0 || index === is.length - 1)) {
              if (!(i.classList.value.indexOf('point') === -1 || index === is.length - 2)) {
                i.classList.remove('point');
                i.classList.remove('fa-circle');
                i.classList.add('fa-circle-o');
                i.nextElementSibling.classList.remove('fa-circle-o');
                i.nextElementSibling.classList.add('fa-circle');
              }
              pageCircleClass.push(i.classList);
            }
          });

          httpRequest('GET', '../tmp/profile/history.html', 'text/html');
        }

        if (!(currentTarget.classList.value.indexOf('switch-prev') === -1)) {
          Array.prototype.forEach.call(currentParent.children, function (i, index, is) {
            if (!(index === 0 || index === is.length - 1)) {
              if (!(i.classList.value.indexOf('point') === -1 || index === 1)) {
                i.classList.remove('point');
                i.classList.remove('fa-circle');
                i.classList.add('fa-circle-o');
                i.previousElementSibling.classList.remove('fa-circle-o');
                i.previousElementSibling.classList.add('fa-circle');
              }
              pageCircleClass.push(i.classList);
            }
          });

          httpRequest('GET', '../tmp/profile/elements.html', 'text/html');
        }

        setTimeout(function () {
          pageCircleClass.forEach(function (iClass, index, iClasses) {
            if (iClass.value.indexOf('fa-circle-o') === -1) {
              iClass.add('point');
              if (index === 0) {
                leftArrow.style.opacity = '0';
              } else {
                leftArrow.style.opacity = '1.0';
              }
              if (index === iClasses.length - 1) {
                rightArrow.style.opacity = '0';
              } else {
                rightArrow.style.opacity = '1.0';
              }
            }
          });
        }, 100);

        $('.profile_box').style.opacity = 0;

      });
    }
  };
})();
