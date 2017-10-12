define(['app/app', 'app/common/services/remoteResource'], function (app, remoteResource) {

    app_cached_providers
      .$factoryProvider
      .factory('notificationdatacontext', function (remoteResource) {

          return {
              getNewOrders: function (vendorId) {
                  var notifications = remoteResource.RestResource.all("Notification").getList({
                      vendorId: vendorId
                  });
                  return notifications;
              },
              getCustomerLatestReadyOrder: function (orderId,customerId) {
                  var notifications = remoteResource.RestResource.one("Notification").get({
                      orderId: orderId,
                      customerId:customerId
                  });
                  return notifications;
              }
          }
      });
});