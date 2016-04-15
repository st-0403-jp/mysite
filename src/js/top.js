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

      var $navList = $('nav a');
      var navIds = [];
      var id;
      var idTops = [];
      Array.prototype.forEach.call($navList, function (data) {
        id = data.dataset.navId;
        idTops.push($('#' + id).offsetTop);
      });

      console.log(idTops);
      
      var $article = $('article');
      $article.addEventListener('scroll', function () {
        Array.prototype.forEach.call($navList, function (data) {
          id = data.dataset.navId;
          //if (this.scroll) $('#' + id).offsetTop
        });
      });
      /*
      navIds.forEach(function (id) {
        console.log(id);
      });
      */
    }
  };
})();

//common.imageGalleryFade.start(".st-slide-gallery", true);

