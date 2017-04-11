'use strict';

require('./_carousel.scss');

module.exports = {
  template: require('./carousel.html'),
  controller: ['$log', CarouselController],
  controllerAs: 'carouselCtrl'
};

function CarouselController($log) {
  $log.debug('CarouselController');

  var currIndex = 0;
  this.myInterval = 3000;
  this.noWrapSlides = false;
  this.active = 0;
  this.slides = [
    {
      image: 'http://lorempixel.com/400/200/food',
      id: currIndex++
    },
    {
      image: 'http://lorempixel.com/400/200/sports',
      id: currIndex++
    },
    {
      image: 'http://lorempixel.com/400/200/',
      id: currIndex++
    }
  ];
}
