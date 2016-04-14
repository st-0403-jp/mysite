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

      var navList = $('nav a');
      var navIds = [];
      var id;
      Array.prototype.forEach.call(navList, function (data) {
        id = data.dataset.navId;
        console.log($('#' + id).scrollTop);
      });
      
      var $article = $('article');
      $article.addEventListener('scroll', function () {
        console.log(this.scrollTop);
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
