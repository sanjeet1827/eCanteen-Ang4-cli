define(['app/app', 'app/common/shellCtrl', 'app/datacontext/orderCheckoutdatacontext', 'app/datacontext/customerSingupdatacontext'], function (app, shell) {

    // the Content Controller
    // is added into the 'app' module
    // lazily, and only once

    app_cached_providers
      .$controllerProvider
      .register('confirmOrderCtrl', function ($rootScope, $scope, $stateParams, orderCheckoutdatacontext, customerSingupdatacontext) {
          $scope.message = "confirmOrderCtrl";
          $rootScope.displayVendorSlider = false;
          $scope.vModel = {};

          if ($stateParams.customerId !== undefined && $stateParams.orderId !== undefined && $stateParams.transId !== undefined && $stateParams.transStatus !== undefined) {
              
              var tarnsStatus = $stateParams.transStatus;
              tarnsStatus = "success";//TODO: temp code, has to be removed once online url is working
              orderCheckoutdatacontext.updateOrder($stateParams.orderId, $stateParams.transId, tarnsStatus).then(function (data) {
                  var res = data;

                  orderCheckoutdatacontext.getConfirmedOrderDetail($stateParams.orderId).then(function (data) {
                      $rootScope.customerId = $stateParams.customerId;

                      customerSingupdatacontext.getCustomer($rootScope.customerId).then(function (data) {
                          $rootScope.customerName = data.Name;
                      })

                      res = data.plain();
                      $scope.vModel = res;
                      $rootScope.customerLatestOrderId = $stateParams.orderId;

                      if ($scope.vModel.Vendor.Logo === undefined || $scope.vModel.Vendor.Logo === null) {
                          $scope.vModel.Vendor.Logo = '../../Content/Images/Not_available.png';
                      }
                  })
              });
          }

          $scope.printReciept = function () {
              window.print();
          }
      });
});