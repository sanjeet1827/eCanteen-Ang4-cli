define(['app/app', 'app/common/shellCtrl', 'app/datacontext/foodItemdatacontext'], function (app, shell) {

    // the Content Controller
    // is added into the 'app' module
    // lazily, and only once

    app_cached_providers
      .$controllerProvider
      .register('customerMenuCtrl', function ($rootScope, $scope, foodItemdatacontext) {
          $scope.message = "customerMenuCtrl";

          $scope.vModel = {};
          $scope.vModel.menuItems = null;
          $scope.vModel.menuType = null;
          $scope.vModel.menuType = 1;

          $scope.loadMenuItems = function (vendorId, menuType) {
              foodItemdatacontext.getMenuFoodItems(vendorId, menuType).then(function (data) {
                  $scope.vModel.menuItems = data.plain();

              });
          }

          $scope.addFoodItemtoOrder = function (vendorId, itemid, itemName, itemPrice, addItem) {
              $rootScope.$broadcast("addOrderItem", vendorId, itemid, itemName, itemPrice, addItem);
          };

          $scope.loadMenuItems($rootScope.vendorId, $scope.vModel.menuType)

          $scope.$on("loadMenuItems", function (data, vendorId, menuType) {
              $scope.loadMenuItems(vendorId, menuType)
          });

      });
});