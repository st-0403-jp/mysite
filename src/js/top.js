/*top.js*/

page.top = (function () {
  return {
    execute: function () {

      var ageCal = function () {
        var dateObj = new Date();
        var nowYear = dateObj.getFullYear();
        var nowMonth = dateObj.getMonth() + 1;
        var age = nowYear - 1986;
        if (nowMonth < 4) {
          age = age - 1;
        }
        return age;
      };
      $('#age').innerHTML = ageCal();

      var $navLi = $('nav li'), $contentsWrap = $('#contents-wrap'), $profile = $('#profile'), $skill = $('#skill'), $output = $('#output'), $contact = $('#contact');
      var contentsWrapTop = $contentsWrap.getBoundingClientRect().top;
      var startOffset = {
        profile: $profile.getBoundingClientRect().top,
        skill: $skill.getBoundingClientRect().top,
        output: $output.getBoundingClientRect().top,
        contact: $contact.getBoundingClientRect().top
      };
      var contentsWrapScrollTop;
      $contentsWrap.addEventListener('scroll', function () {
        Array.prototype.forEach.call($navLi, function (li) {
          li.classList.remove('current');
        });
        contentsWrapScrollTop = this.scrollTop - contentsWrapTop;
        if (contentsWrapScrollTop < startOffset.profile) {
          // profile
          $navLi[0].classList.add('current');
        } else if (startOffset.profile < contentsWrapScrollTop && contentsWrapScrollTop < startOffset.skill) {
          // skill
          $navLi[1].classList.add('current');
        } else if (startOffset.skill < contentsWrapScrollTop && contentsWrapScrollTop < startOffset.output) {
          // output
          $navLi[2].classList.add('current');
        } else if (startOffset.output < contentsWrapScrollTop && contentsWrapScrollTop < startOffset.contact) {
          // contact
          $navLi[3].classList.add('current');
        }
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

      // switch-nextクリック
      $('body').addEventListener('click', function (e) {
        if (e.target.className.indexOf('switch-next') !== -1 || e.target.className.indexOf('switch-prev') !== -1) {
          //必要DOM
          var currentTarget = e.target;
          var currentParent = e.target.parentNode;
          var leftArrow = currentParent.firstElementChild;
          var rightArrow = currentParent.lastElementChild;

          var circles = [];
          if (!(currentTarget.className.indexOf('switch-next') === -1)) {
            Array.prototype.forEach.call(currentParent.children, function (i, index, is) {
              if (!(index === 0 || index === is.length - 1)) {
                if (!(i.className.indexOf('point') === -1 || index === is.length - 2)) {
                  i.classList.remove('point');
                  i.classList.remove('fa-circle');
                  i.classList.add('fa-circle-o');
                  i.nextElementSibling.classList.remove('fa-circle-o');
                  i.nextElementSibling.classList.add('fa-circle');
                }
                circles.push(i);
              }
            });
          }

          if (!(currentTarget.className.indexOf('switch-prev') === -1)) {
            Array.prototype.forEach.call(currentParent.children, function (i, index, is) {
              if (!(index === 0 || index === is.length - 1)) {
                if (!(i.className.indexOf('point') === -1 || index === 1)) {
                  i.classList.remove('point');
                  i.classList.remove('fa-circle');
                  i.classList.add('fa-circle-o');
                  i.previousElementSibling.classList.remove('fa-circle-o');
                  i.previousElementSibling.classList.add('fa-circle');
                }
                circles.push(i);
              }
            });
          }

          setTimeout(function () {
            var flgArr = [];
            circles.forEach(function (circle, index, circles) {
              if (circle.className.indexOf('fa-circle-o') === -1) {
                circle.classList.add('point');
                if (index === 0) {
                  leftArrow.style.opacity = '0';
                } else {
                  leftArrow.style.opacity = '1.0';
                }
                if (index === circles.length - 1) {
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
        }
      });
      
      // タブ切り替え
      var tabChangeMap = {
        "tab-01": '.profile_elements',
        "tab-02": '.profile_history' 
      };
      Array.prototype.forEach.call($('.tab-change-list li'), function (li, index, lis) {
        li.addEventListener('click', function (e) {
          for(var key in tabChangeMap) {
            $(tabChangeMap[key]).classList.add('none');
          }
          Array.prototype.forEach.call(lis, function (tab) {
            tab.classList.remove('selected');
          });
          var liDataValue = e.target.dataset.tabId;
          $(tabChangeMap[liDataValue]).classList.remove('none');
          e.target.classList.add('selected');
        });
      });

      // サイト仕様モーダル
      var $siteDes = $('#site-description');
      $siteDes.addEventListener('click', function (e) {
        console.log(e.target);
      });
    }
  };
})();
