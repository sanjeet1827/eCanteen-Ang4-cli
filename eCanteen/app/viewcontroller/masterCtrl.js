define(['app/app', 'app/viewcontroller/modals/modalCustomerSingupCtrl', 'app/datacontext/maindatacontext', 'app/datacontext/notificationdatacontext'], function () {

    // the Content Controller
    // is added into the 'app' module
    // lazily, and only once

    app_cached_providers
      .$controllerProvider
      .register('masterCtrl', function ($rootScope, $scope, $modal, maindatacontext, notificationdatacontext, $state, $interval, $timeout) {
          $rootScope.displayVendorSlider = true;
          $rootScope.displayAdminMenu = false;
          if ($rootScope.vendorUId !== undefined && $rootScope.vendorUId !== null) {
              $rootScope.displayAdminMenu = true;
          }

          $scope.message = "ContentCtrl";

          $scope.vModel = {};
          $scope.vModel.vendors = [];
          $scope.vModel.vendorName = null;
          $scope.vModel.vendorMenuDesc = null;
          $scope.vModel.popUpNotification = false;
          $scope.vModel.popUpNotificationForCustomer = false;
          //$rootScope.customerLatestOrderId = null;



          var vendors = null;

          $scope.setMenuItem = function (vendorId, menyType) {
              if ($state.current.name !== 'shell.orderCheckout') {
                  $rootScope.vendorId = vendorId;
                  $rootScope.$broadcast("setClickedRow", 0);
                  $scope.loadMenuItems(vendorId, menyType);
              }
          }

          $scope.loadMenuItems = function (vendorId, menyType) {

              $rootScope.vendorName = vendors.filter(function (vend) {
                  return vend.Id === vendorId
              })[0].Name;
              $rootScope.vendorLogo = vendors.filter(function (vend) {
                  return vend.Id === vendorId
              })[0].Logo;

              if ($rootScope.vendorLogo === undefined || $rootScope.vendorLogo === null) {
                  $rootScope.vendorLogo = '../../Content/Images/Not_available.png';
              }

              $rootScope.$broadcast("loadMenuItems", vendorId, 1);
          };


          maindatacontext.getAllVendors().then(function (data) {

              vendors = data.plain();
              angular.forEach(vendors, function (value, key) {

                  if ((key % 4) === 0) {
                      var arr = new Array();

                      for (var i = 0; i < 4; i++) {
                          if ((key + i) < vendors.length) {
                              arr.push(
                              {
                                  Id: vendors[key + i].Id, Name: vendors[key + i].Name
                              }

                      )
                          }
                      }

                      $scope.vModel.vendors.push(arr);
                  }
              });


              //$scope.loadMenuItems(vendors[0].Id, 1);
              $scope.setMenuItem(vendors[0].Id, 1);

          }, function (error) {

          });

          $scope.openCustomerSignUpModal = function () {
              // event.preventDefault();
              $scope.signUpmodal = true;
              $modal.open({

                  templateUrl: 'app/viewcontroller/modals/modalCustomerSingup.html',
                  controller: 'modalCustomerSingupCtrl',
                  backdrop: 'static',
                  windowClass: 'signup-dialog',
                  scope: $scope,

              });
          };


          $scope.getNewOrders = function () {
              if ($rootScope.vendorUId !== undefined && $rootScope.vendorUId !== null && ($rootScope.customerId === undefined || $rootScope.customerId === null))
                  if ($rootScope.newOrderToken !== undefined) {
                      notificationdatacontext.getNewOrders($rootScope.vendorUId).then(function (res) {

                          $scope.vModel.newOrder = res;

                          var latestOrderId = $rootScope.newOrderToken === null ? null : $rootScope.newOrderToken.toString();

                          if (latestOrderId !== res.toString() && res.length>0) {
                              $rootScope.newOrderToken = res;
                              if (res.length === 0) {
                                  $rootScope.popUpNotification = false;

                              }
                              $rootScope.popUpNotification = true;
                          }
                          else {
                              //$scope.vModel.popUpNotification = false;
                          }
                      });
                  }
          };

          $scope.getCustomerLatestReadyOrder = function () {
              if ($rootScope.customerId !== undefined && $rootScope.customerId !== null && $rootScope.customerLatestOrderId !== null && ($rootScope.vendorUId === undefined || $rootScope.vendorUId === null))
                  if ($rootScope.newCustomerOrderToken !== undefined) {
                      notificationdatacontext.getCustomerLatestReadyOrder($rootScope.customerLatestOrderId, $rootScope.customerId).then(function (res) {

                          if (res !== undefined) {

                              $scope.vModel.newCustomerOrder = res;

                              var latestOrderId = $rootScope.newCustomerOrderToken === null ? null : $rootScope.newCustomerOrderToken.toString();

                              if (latestOrderId !== res.toString()) {
                                  $rootScope.newCustomerOrderToken = res;

                                  if ($rootScope.newCustomerOrderToken === 0) {
                                      $rootScope.popUpNotificationForCustomer = false;
                                  }
                                  else {

                                  }

                                  $rootScope.popUpNotificationForCustomer = true;
                              }
                              else {
                                  //$scope.vModel.popUpNotificationForCustomer = false;
                              }
                          }

                      });
                  }
          };

          $interval($scope.getNewOrders, 5000);

          $interval($scope.getCustomerLatestReadyOrder, 5000);

          if ($rootScope.newOrderToken === undefined)
              $rootScope.newOrderToken = null;

          if ($rootScope.newCustomerOrderToken === undefined)
              $rootScope.newCustomerOrderToken = null;

          $scope.closeNotificationPopUp = function () {
              $rootScope.popUpNotification = false;
              $state.go("shell.orderStatus");
          }

          $scope.closeCustomerNotificationPopUp = function () {
              $rootScope.popUpNotificationForCustomer = false;
              $state.go("shell.customerOrderHistory");
          }

          $scope.signOut = function () {

              $rootScope.customerId = null;
              $rootScope.customerName = null;
          }

      });
});


