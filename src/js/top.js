/*top.js*/

page.top = (function () {
  return {
    execute: function () {

      common.util.renderDate($('.js-toYear'), 'year');

      /*
      var list = $('.profile_list').innerHTML;
      console.log(list);

      json.entity.forEach(function (ele, index) {
        for (var key in ele) {
          console.log(key);
        }
      });
      */

      var $navLi = $('nav li');
      var $navList = $('nav a');
      var navIds = [];
      var id;
      var idTops = [];
      /*
      Array.prototype.forEach.call($navList, function (data) {
        id = data.dataset.navId;
        idTops.push($('#' + id).offsetTop);
      });
      */

      //console.log(idTops);
      
      var $article = $('article');
      var offsetTopFunk;

      $article.addEventListener('scroll', function () {
        Array.prototype.forEach.call($navLi, function (li) {
          li.classList.remove('current');
        });
        if (offsetTopFunk) {
          clearTimeout(offsetTopFunk);
        } else {
          offsetTopFunk = setTimeout(function () {
            //timer = true;
            Array.prototype.forEach.call($navList, function (data) {
              id = data.dataset.navId;
              idTops.push({top: $('#' + id).clientHeight, liClass: data.parentNode.classList});
            });
          }, 10);
        }
        console.log(idTops);
        //console.log(articleTop);
        //0~1344
        console.log(this.scrollTop);
        if (this.scrollTop < 337) {
          $navLi[0].classList.add('current');
        } else if (338 < this.scrollTop && this.scrollTop < 673) {
          $navLi[1].classList.add('current');
        } else if (674 < this.scrollTop && this.scrollTop < 1009) {
          $navLi[2].classList.add('current');
        } else if (1010 < this.scrollTop && this.scrollTop < 1344) {
          $navLi[3].classList.add('current');
        } else if (this.scrollTop === 1344) {
          $navLi[4].classList.add('current');
        }
      });
    }
  };
})();

//common.imageGalleryFade.start(".st-slide-gallery", true);

