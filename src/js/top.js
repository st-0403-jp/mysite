/*top.js*/

page.top = (function () {
  return {
    execute: function () {

      common.util.renderDate($('.js-toYear'), 'year');

      var $navLi = $('nav li');
      
      var $article = $('article');

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
              //$('.profile_elements').innerHTML = res;
            }, 2000);
            break;
          };
      };

      $('.switch-next').addEventListener('click', function () {
        console.log(1);
      });
      xhr.open('GET', '../tmp/profile/history.html', false);
      xhr.setRequestHeader("Content-Type" , "text/html");
      xhr.send();
      xhr.abort();
    }
  };
})();
