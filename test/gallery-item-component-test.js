'use strict';

describe('Gallery Item Component', function() {
  beforeEach( () => {
    angular.mock.module('cfgram');
    angular.mock.inject(($rootScope, $componentController, $httpBackend, authService) => {
      this.$rootScope = $rootScope;
      this.$componentController = $componentController;
      this.$httpBackend = $httpBackend;
      this.authService = authService;
    });
  });

  describe('galleryItemCtrl.deleteDone', () => {
    it('should call deleteDone', () => {
      let mockBindings = {
        gallery: {
          _id: 'testid',
          name: 'test name',
          desc: 'test description',
          pics: []
        },
        deleteDone: function(data) {
          expect(data.galleryData._id).toEqual('testid');
        }
      };

      let galleryItemCtrl = this.$componentController('galleryItem', null, mockBindings);
      galleryItemCtrl.deleteDone({ galleryData: galleryItemCtrl.gallery });

      this.$rootScope.$apply();
    });
  });
});
