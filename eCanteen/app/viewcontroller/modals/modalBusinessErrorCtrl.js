define(['app/app', 'app/common/shellCtrl', 'app/datacontext/customerSingupdatacontext'], function (app) {

    app_cached_providers
      .$controllerProvider
      .register('modalBusinessErrorCtrl', function ($scope, $rootScope, $modalInstance, $state) {

          $scope.currentModal = $modalInstance;

          $scope.close = function () {
              $scope.currentModal.dismiss();
              $state.go("shell.init");
          }

      });
});