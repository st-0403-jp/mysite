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
        if (offsetTopFunk) {
          clearTimeout(offsetTopFunk);
        } else {
          offsetTopFunk = setTimeout(function () {
            //timer = true;
            Array.prototype.forEach.call($navList, function (data) {
              id = data.dataset.navId;
              idTops.push({top: $('#' + id).offsetTop, liClass: data.parentNode.classList});
            });
          }, 10);
        }
        var articleTop = this.scrollTop;
        //console.log(articleTop);
        idTops.forEach(function (tops) {
          console.log(articleTop);
          if (articleTop === tops.top) {
            console.log('top位置');
            tops.liClass.add('current');
          }
        });
      });
    }
  };
})();

//common.imageGalleryFade.start(".st-slide-gallery", true);

