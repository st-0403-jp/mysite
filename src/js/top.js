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
        if (this.scrollTop < 269) {
          //profile
          $navLi[0].classList.add('current');
        } else if (270 < this.scrollTop && this.scrollTop < 539) {
          //blog
          $navLi[1].classList.add('current');
        } else if (540 < this.scrollTop && this.scrollTop < 809) {
          //output
          $navLi[2].classList.add('current');
        } else if (810 < this.scrollTop && this.scrollTop < 1079) {
          //package
          $navLi[3].classList.add('current');
        } else if (1080 < this.scrollTop && this.scrollTop <= 1344) {
          //contact
          $navLi[4].classList.add('current');
        }
      });
      var $skillLi = $('#skill li');
      Array.prototype.forEach.call($skillLi, function (li) {
        var circleWidth = li.dataset.circle;
        li.setAttribute('data-content', '');
      });
    }
  };
})();

//common.imageGalleryFade.start(".st-slide-gallery", true);

