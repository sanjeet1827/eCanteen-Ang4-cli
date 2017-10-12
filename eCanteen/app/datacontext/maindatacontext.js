define(['app/app', 'app/common/services/remoteResource'], function (app, remoteResource) {

    app_cached_providers
      .$factoryProvider
      .factory('maindatacontext', function (remoteResource) {

          return {
              getAllVendors: function () {
                  var vendors = remoteResource.RestResource.all("Vendor").getList();
                  return vendors;
              }
          }

      });
});