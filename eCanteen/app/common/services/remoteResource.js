define(['app/app'], function (app) {
    app_cached_providers
      .$factoryProvider
      .factory('remoteResource', function (Restangular) {
          
          return {
              RestResource: Restangular
             };

      });
});