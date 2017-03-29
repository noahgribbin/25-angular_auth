'use strict';

require('./_navbar.scss');

module.exports = {
  template: require('./navbar.html'),
  conroller: ['$log', '$location', '$rootScope', 'authService', NavbarConroller],
  conrollerAs: 'navbarCtrl'
};

function NavbarConroller($log, $location, $rootScope, authService) {
  $log.debug('NavbarConroller');

  this.checkPath = function() {
    let path = $location.path();
    if (path === '/join') {
      this.hideButtons = true;
    }

    if (path !== '/join') {
      this.hideButtons = false;
      authService.getToken()
      .catch( () => {
        $location.url('/join#login');
      });
    }
  };

  this.checkPath();

  $rootScope.$on('locationChangeSuccess', () => {
    this.checkPath();
  });

  this.logout =  function() {
    $log.debug('navbarCtrl.logout');
    this.hideButtons = true;
    authService.logout()
    .then( () => {
      $location.url('/');
    });
  };
}
