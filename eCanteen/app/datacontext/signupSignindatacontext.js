define(['app/app', 'app/common/services/remoteResource'], function (app, remoteResource) {

    app_cached_providers
      .$factoryProvider
      .factory('signupSignindatacontext', function (remoteResource) {

          return {
              loginVendor: function (email, password) {
                  var autheticated = remoteResource.RestResource.one("Vendor").get({
                      email: email,
                      password: password
                  });
                  return autheticated;
              },
             

              registerVendor: function (data) {
                  var result = remoteResource.RestResource.all("Vendor").post(JSON.stringify(data));
                  return result;
              }
          }

      });
});