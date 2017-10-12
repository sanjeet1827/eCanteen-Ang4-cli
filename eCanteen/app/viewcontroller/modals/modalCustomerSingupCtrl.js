define(['app/app', 'app/common/shellCtrl', 'app/datacontext/customerSingupdatacontext'], function (app) {

    app_cached_providers
      .$controllerProvider
      .register('modalCustomerSingupCtrl', function ($scope, $rootScope, $modalInstance, customerSingupdatacontext) {
          $rootScope.customerId = null;
          $rootScope.customerName = null;

          $scope.currentModal = $modalInstance

          $scope.close = function () {
              $rootScope.customerNotLoggedInToPlaceOrder = false;
              $scope.currentModal.dismiss();
          }

          $scope.vModel = {};
          $scope.vModel.name = null;
          $scope.vModel.email = null;
          $scope.vModel.mobile = null;
          $scope.vModel.password = null;
          $scope.vModel.repeatPassword = null;
          $scope.vModel.alreadyRegistered = null;
          $scope.vModel.registerationPosted = null;

          $scope.vLoginModel = {};
          $scope.vLoginModel.email = null;
          $scope.vLoginModel.password = null;
          $scope.vLoginModel.autheticated = true;

          $scope.vModel.showLoginView = true;

          $scope.activeLoginView = function (active) {
              $scope.vModel.showLoginView = active;
          }

          $scope.signUp = function (registerFormInvalid, vModel) {

              if (!registerFormInvalid) {
                  var remoteData = {};
                  remoteData.Name = vModel.name;
                  remoteData.Email = vModel.email;
                  remoteData.Contact = vModel.mobile;
                  remoteData.Password = vModel.password;

                  customerSingupdatacontext.registerCustomer(remoteData).then(function (response) {
                      var alreadyRegistered = null;
                      if (response.data === undefined) {
                          alreadyRegistered = response;
                      }
                      else {
                          if (response.data === undefined)
                              alreadyRegistered = response.data;
                      }
                      if (alreadyRegistered) {
                          $scope.vModel = {};
                          $scope.vModel.alreadyRegistered = false;
                          $scope.vModel.registerationPosted = true;
                      }
                      else {
                          $scope.vModel.alreadyRegistered = true;
                      }
                  });
              }
          }

          $scope.signIn = function (customerloginForm, vLoginModel) {

              if (!customerloginForm) {
                  customerSingupdatacontext.loginCustomer(vLoginModel.email, vLoginModel.password).then(function (data) {
                      if (data !== undefined && data !== null) {
                          $rootScope.customerId = data.Id;
                          $rootScope.customerName = data.Name;
                          $scope.currentModal.dismiss();
                          if ($rootScope.customerNotLoggedInToPlaceOrder !== undefined && $rootScope.customerNotLoggedInToPlaceOrder) {
                              $rootScope.customerNotLoggedInToPlaceOrder = false;
                              $rootScope.$broadcast("addOrderItem", vendorId, itemid, itemName, itemPrice, addItem);
                          }
                      }
                      else {
                          $scope.vLoginModel.autheticated = false;
                      }
                  });
              }
          }

      });
});