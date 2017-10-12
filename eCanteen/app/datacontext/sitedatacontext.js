define(['app/app', 'app/common/services/remoteResource'], function (app, remoteResource) {

    app_cached_providers
      .$factoryProvider
      .factory('sitedatacontext', function (remoteResource) {

          return {
              getSites: function (vendorId, menuType) {
                  var sites = remoteResource.RestResource.all("Site").getList();
                  return sites;
              },

              saveSites: function (data) {
                  var result = remoteResource.RestResource.all("Site").post(JSON.stringify(data));
                  return result;
              },

              deleteTest: function (data) {
                  var result = remoteResource.RestResource.all("Site").customOperation("remove", "Site", null, { "Content-Type": "application/json;charset=utf-8" }, { Ids: ['1', '2'] });
                  //var result = remoteResource.RestResource.all("Site").remove(data);
                  return result;
              }
          }

      });
});