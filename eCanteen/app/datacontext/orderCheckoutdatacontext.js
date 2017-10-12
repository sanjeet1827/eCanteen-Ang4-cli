define(['app/app', 'app/common/services/remoteResource'], function (app, remoteResource) {

    app_cached_providers
      .$factoryProvider
      .factory('orderCheckoutdatacontext', function (remoteResource) {

          return {
              placeOrder: function (data) {
                  var result = remoteResource.RestResource.all("Order").post(data);
                  return result;
              },

              payOrder: function (payOrder, orderId) {
                  var result = remoteResource.RestResource.all("Pay").post(JSON.stringify(payOrder), { orderId: orderId });
                  return result;
              },
              updateOrder: function (orderId, txnId, transStatus) {
                  var result = remoteResource.RestResource.all("Pay").post(JSON.stringify({ Id: null, OrderId: orderId, PaymentStatus: transStatus, TransactionId: txnId }));
                  return result;
              },
              getConfirmedOrderDetail: function (orderId) {
                  var order = remoteResource.RestResource.one("Order").get({ orderId: orderId });
                  return order;
              },
              getVendorOrders: function (vendorId, menuType) {
                  var orders = remoteResource.RestResource.all("Order").getList({
                      vendorId: vendorId,
                      menuType: menuType
                  });
                  return orders;
              },
              getMenuWiseStatusCount: function (vendorId, menuType) {
                  var ordersCount = remoteResource.RestResource.one("Order").get({
                      vendorId: vendorId,
                      menuType: menuType,
                      tp: true
                  });
                  return ordersCount;
              },
              updateOrderStatus: function (orderId, vendorId, menuType) {
                  var ordersCount = remoteResource.RestResource.one("Order").get({
                      orderId: orderId,
                      vendorId: vendorId,
                      menuType: menuType
                  });
                  return ordersCount;
              },
              acceptOrder: function (orderId, vendorId) {
                  var isAccepted = remoteResource.RestResource.one("Order").get({
                      orderId: orderId,
                      vendorId: vendorId
                  });
                  return isAccepted;
              },
              getCustomerOrderHistory: function (customerId) {
                  var customerOrderHistory = remoteResource.RestResource.all("Order").getList({
                      customerId: customerId,
                      customerDetail: true
                  });
                  return customerOrderHistory;
              }
          }
      });
});