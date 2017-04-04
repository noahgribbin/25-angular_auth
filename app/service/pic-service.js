'use strict';

module.exports = ['$q', '$log', '$http', 'Upload', 'authService', picSercive];

function picSercive($q, $log, $http, Upload, authService) {
  $log.debug('picSercive');

  let service = {};

  service.uploadGalleryPic = function(galleryData, picData) {
    $log.debug('service.uploadGalleryPic');
    // log galleryData
    // console.log('galleryData');
    // mongo object?

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/gallery/${galleryData._id}/pic`;
      let headers = {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      };
      return Upload.upload({
        url,
        headers,
        method: 'POST',
        data: {
          name: picData.name,
          desc: picData.desc,
          file: picData.file
        }
      });
    })
    .then( res => {
      $log.log('pic uploaded');
      // let pic = res.data
      // galleryData.pics.unshift(pic);
      galleryData.pics.unshift(res.data);
      console.log(res.data);
      console.log(galleryData);
      console.log(picData);
      return res.data;
      // return pic
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.deletePic = function(galleryData, picData) {
    $log.debug('service.deltePic');
    console.log(galleryData);
    console.log(picData);
    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/gallery/${galleryData._id}/pic/${picData._id}`;
      let config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      return $http.delete(url, config);
    })
    .then( res => {
      for (let i=0; i < galleryData.pics.length; i++) {
        let current = galleryData.pics[i];
        if (current._id === picData._id) {
          galleryData.pics.splice(i, 1);
          break;
        }
      }
      return res.data;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  return service;
}
