define(['app/app', 'app/common/services/remoteResource'], function (app, remoteResource) {

    app_cached_providers
      .$factoryProvider
      .factory('customerSingupdatacontext', function (remoteResource) {

          return {
              loginCustomer: function (email, password) {
                  var autheticated = remoteResource.RestResource.one("Customer").get({
                      email: email,
                      password: password
                  });
                  return autheticated;
              },
              registerCustomer: function (data) {
                  var result = remoteResource.RestResource.all("Customer").post(JSON.stringify(data));
                  return result;
              },
              confirmRegistration: function (Id) {
                  var result = remoteResource.RestResource.one("Customer").get({ customerId: Id });
                  return result;
              },
              getCustomer: function (Id) {
                  var result = remoteResource.RestResource.one("Customer").get({ customerId: Id, customerDetail: true });
                  return result;
              }
          }

      });
});