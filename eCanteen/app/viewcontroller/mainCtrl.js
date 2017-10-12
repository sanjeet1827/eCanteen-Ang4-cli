define(['app/app', 'app/common/shellCtrl', 'app/viewcontroller/customerMenuCtrl', 'app/viewcontroller/orderShortDetailCtrl'], function (app, shell) {

    // the Content Controller
    // is added into the 'app' module
    // lazily, and only once

    app_cached_providers
      .$controllerProvider
      .register('mainCtrl', function ($scope, $rootScope) {
          $scope.message = "mainCtrl";
          $rootScope.vendorUId = null;
          $scope.vMainModel = {};
          $scope.vMainModel.menuType = 1;
          $scope.vMainModel.menuTypeMobile = { value: 1, text: 'Breakfast' };


          $scope.vMainModel.menuForList = [
             { value: 1, text: 'Breakfast' },
             { value: 2, text: 'Lunch' },
             { value: 3, text: 'Snacks' },
             { value: 4, text: 'Dinner' }
          ]

          $scope.loadMenuItems = function (menuType) {
              $scope.$broadcast("loadMenuItems", $rootScope.vendorId, menuType);
          }

          $scope.selectedRow = 0;  // initialize our variable to null
          $scope.setClickedRow = function (index) {  //function that sets the value of selectedRow to current index
              $scope.selectedRow = index;
          }

          $scope.$on("setClickedRow", function (data, index) {
              $scope.vMainModel.menuType = 1;
              $scope.setClickedRow(index);
          });
      });
});