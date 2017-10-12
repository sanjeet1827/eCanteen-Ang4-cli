define(['app/app', 'app/common/shellCtrl', 'app/datacontext/orderCheckoutdatacontext'], function (app, shell) {

    // the Content Controller
    // is added into the 'app' module
    // lazily, and only once

    app_cached_providers
      .$controllerProvider
      .register('customerOrderHistoryCtrl', function ($rootScope, $scope, $stateParams, orderCheckoutdatacontext) {
          $scope.message = "customerOrderHistoryCtrl";
          $rootScope.displayVendorSlider = false;
          $scope.vModel = {};
          $rootScope.customerLatestOrderId = null;

          orderCheckoutdatacontext.getCustomerOrderHistory($rootScope.customerId).then(function (data) {
              $scope.vModel.orderHistory = data.plain();
          })
      });
});