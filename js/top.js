/*top.js*/

page.top = (function () {
  return {
    execute: function () {

      common.util.renderDate($('.js-toYear'), 'year');

      var json = {
        entity: [
          {
            name: '田中暁'
          },
          {
            age: '29'
          },
          {
            sex: '男'
          },
          {
            skill: 'html'
          },
          {
            like: '車'
          }
        ]
      };

      var list = $('.profile_list').innerHTML;
      console.log(list);

      json.entity.forEach(function (ele, index) {
        for (var key in ele) {
          console.log(key);
        }
      });
    }
  };
})();

//common.imageGalleryFade.start(".st-slide-gallery", true);
