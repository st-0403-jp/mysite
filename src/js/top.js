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
      Array.prototype.forEach.call(navList, function (e) {
        console.log(e.dataset);
      });
    }
  };
})();

//common.imageGalleryFade.start(".st-slide-gallery", true);
