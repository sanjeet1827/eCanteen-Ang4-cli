define(['app/app', 'app/common/shellCtrl', 'app/datacontext/orderCheckoutdatacontext'], function (app, shell) {

    app_cached_providers
      .$controllerProvider
      .register('orderStatusCtrl', function ($rootScope, $scope, $q, $interval, orderCheckoutdatacontext, $timeout) {
          $scope.message = "orderStatusCtrl";

          $rootScope.displayVendorSlider = false;
          $rootScope.popUpNotification = false;

          $scope.menuFor = 1;
          $scope.vModel = {};
          $scope.vModel.orderData = [];

          $scope.vModel.acceptedOrder = null;
          $scope.vModel.orderAccepetd = false;

          $scope.loadOrders = function (vendorId, menuType) {
              $scope.vModel.orderData = [];
              orderCheckoutdatacontext.getVendorOrders(vendorId, menuType).then(function (data) {
                  $scope.vModel.orderData = data.plain();
                  $scope.vModel.loadOrderDetail($scope.vModel.orderData[0].Order.Id);
              });
          }

          $scope.getBreakfastOrderCount = function (vendorId, menuType) {
              orderCheckoutdatacontext.getMenuWiseStatusCount(vendorId, menuType).then(function (data) {
                  $scope.vModel.breakfastOrderCount = data;
              });
          }

          $scope.getLunchOrderCount = function (vendorId, menuType) {
              orderCheckoutdatacontext.getMenuWiseStatusCount(vendorId, menuType).then(function (data) {
                  $scope.vModel.lunchOrderCount = data;
              });
          }

          $scope.getSnacksOrderCount = function (vendorId, menuType) {
              orderCheckoutdatacontext.getMenuWiseStatusCount(vendorId, menuType).then(function (data) {
                  $scope.vModel.snacksOrderCount = data;
              });
          }

          $scope.getDinnerOrderCount = function (vendorId, menuType) {
              orderCheckoutdatacontext.getMenuWiseStatusCount(vendorId, menuType).then(function (data) {
                  $scope.vModel.dinnerOrderCount = data;
              });
          }

          $scope.vModel.loadOrderDetail = function (orderId) {
              var orderDetail = $scope.vModel.orderData.filter(function (data) {
                  return data.Order.Id === orderId;
              })

              $scope.vModel.orderDetail = orderDetail[0];
          }

          $scope.vModel.updateOrderStatus = function (orderId, vendorId, menuType) {
              orderCheckoutdatacontext.updateOrderStatus(orderId, vendorId, menuType).then(function (data) {
                  if (menuType === 1)
                      $scope.vModel.breakfastOrderCount = data;
                  else if (menuType === 2)
                      $scope.vModel.lunchOrderCount = data;
                  else if (menuType === 3)
                      $scope.vModel.snacksOrderCount = data;
                  else if (menuType === 4)
                      $scope.vModel.dinnerOrderCount = data;

                  var itemIndex = -1;

                  $scope.vModel.orderData.some(function (data, i) {
                      return data.Order.Id === orderId ? (itemIndex = i, true) : false;
                  });

                  $scope.vModel.orderData[itemIndex].ConfirmedReady = true;
              });

          }

          $scope.getBreakfastOrderCount($rootScope.vendorUId, 1);
          $scope.getLunchOrderCount($rootScope.vendorUId, 2);
          $scope.getSnacksOrderCount($rootScope.vendorUId, 3);
          $scope.getDinnerOrderCount($rootScope.vendorUId, 4);

          $scope.printOrder = function (orderId, vendorId) {
              orderCheckoutdatacontext.acceptOrder(orderId, vendorId).then(function (data) {

                  var acceptedOrder = $scope.vModel.orderData.filter(function (data) {
                      return data.Order.Id === orderId;
                  });

                  var itemIndex = -1;

                  $scope.vModel.orderData.some(function (data, i) {
                      return data.Order.Id === orderId ? (itemIndex = i, true) : false;
                  });

                  $scope.vModel.acceptedOrder = acceptedOrder[0];

                  if (data) {
                      $timeout(function () {
                          $scope.vModel.orderData[itemIndex].Order.Accepted = true;
                          window.print();
                      }, 1000);
                  }
              });
          }

          $scope.loadOrders($rootScope.vendorUId, 1);
      });

});