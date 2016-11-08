/*top.js*/

page.top = (function () {
  return {
    execute: function () {

      common.util.renderDate($('.js-toYear'), 'year');

      var $navLi = $('nav li'), $article = $('article'), $profile = $('#profile'), $skill = $('#skill'), $output = $('#output'), $contact = $('#contact');
      var startOffset = {
        profile: $profile.getBoundingClientRect().top,
        skill: $skill.getBoundingClientRect().top,
        output: $output.getBoundingClientRect().top,
        contact: $contact.getBoundingClientRect().top
      };
      $article.addEventListener('scroll', function () {
        Array.prototype.forEach.call($navLi, function (li) {
          li.classList.remove('current');
        });
        if (this.scrollTop < startOffset.profile) {
          // profile
          $navLi[0].classList.add('current');
        } else if (startOffset.profile < this.scrollTop && this.scrollTop < startOffset.skill) {
          // skill
          $navLi[1].classList.add('current');
        } else if (startOffset.skill < this.scrollTop && this.scrollTop < startOffset.output) {
          // output
          $navLi[2].classList.add('current');
        } else if (startOffset.output < this.scrollTop && this.scrollTop < startOffset.contact) {
          // contact
          $navLi[3].classList.add('current');
        }
      });
      /*
      var $skillLi = $('#skill li');
      Array.prototype.forEach.call($skillLi, function (li) {
        var circleWidth = li.dataset.circle;
        li.setAttribute('data-content', '');
      });
      */

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

      var switchProfile = function () {
        if (!arguments) { return; }
        var flg = arguments[arguments.length -1];
        Array.prototype.forEach.call(arguments, function (elName, index, argArr) {
          if (index === argArr.length - 1) { 
            return;
          }
          $(elName).classList.add('none');
          if (flg[index]) {
            $(elName).classList.remove('none');
          }
        });
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

          //httpRequest('GET', '/api/mysite/profile/history.html', 'text/html');
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

          //httpRequest('GET', '/api/mysite/profile/elements.html', 'text/html');
        }

        setTimeout(function () {
          var flgArr = [];
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
              flgArr.push(true);
            } else {
              flgArr.push(false);
            }
          });
          switchProfile('.profile_elements', '.profile_history', flgArr);
        }, 100);

      });
    }
  };
})();
