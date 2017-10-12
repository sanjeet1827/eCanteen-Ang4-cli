define(['app/app', 'app/common/shellCtrl', , 'app/datacontext/customerSingupdatacontext'], function (app, shell) {

    // the Content Controller
    // is added into the 'app' module
    // lazily, and only once

    app_cached_providers
      .$controllerProvider
      .register('confirmRegistrationCtrl', function ($rootScope, $scope, $stateParams, customerSingupdatacontext) {
          $scope.message = "confirmRegistrationCtrl";
          $rootScope.displayVendorSlider = false;
          $rootScope.displayAdminMenu = false;
          $rootScope.isCustomerRegistraionConfirmed = true;
          $scope.vModel = {};

          if ($stateParams.Id !== undefined) {

              customerSingupdatacontext.confirmRegistration($stateParams.Id).then(function (data) {
                  $scope.vModel.accountActivationMessage = "Your account has been activated now, enjoy ordering using eCanteen";
              });
          }
      });
});