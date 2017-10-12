define(['app/app', 'app/common/shellCtrl'], function (app, shell) {

    // the Content Controller
    // is added into the 'app' module
    // lazily, and only once

    app_cached_providers
      .$controllerProvider
      .register('vendorMainCtrl', function ($rootScope,$scope) {
          $scope.message = "vendorMainCtrl";

          $rootScope.popUpNotification = false;
          $rootScope.displayVendorSlider = false;
      });
});