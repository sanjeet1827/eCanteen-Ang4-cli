define(['app/app', 'app/common/shellCtrl'], function (app) {

    app_cached_providers
      .$controllerProvider
      .register('orderDetailCtrl', function ($rootScope, $scope, $stateParams, $cacheFactory) {
          $rootScope.displayVendorSlider = false;
          $rootScope.orderSubTotal = null;
          $scope.message = "orderDetailCtrl";
          

          $scope.vModel = {};


          $scope.vModel = $stateParams.orderData;
          $scope.vModel.servicetax = 14;
          $scope.vModel.vat = 8;
          $scope.vModel.discount = 0;

          $scope.vModel.orderTotalAmount = $scope.vModel.servicetax + $scope.vModel.vat + $scope.vModel.discount + $scope.vModel.orderSubTotal;

          $rootScope.orderSubTotal = $scope.vModel.orderSubTotal;

          $rootScope.orderTotalAmount = $scope.vModel.orderTotalAmount;

          $rootScope.finalOrder = $scope.vModel;

          $scope.deleteItemFromOrderArray = function (vendorid, itemId) {

              var removeIndex = $scope.vModel.orderItems.map(function (item) { return item.ItemId; })
                       .indexOf(itemId);

              $scope.vModel.orderItems.splice(removeIndex, 1);

              var sum = 0;
              $scope.vModel.orderItems.map(function (item) {
                  sum += item.ItemQtyPrice;
              });

              $scope.vModel.orderSubTotal = sum;
              $scope.vModel.orderTotalAmount = $scope.vModel.servicetax + $scope.vModel.vat + $scope.vModel.discount + $scope.vModel.orderSubTotal;

              $rootScope.orderSubTotal = $scope.vModel.orderSubTotal;
              $rootScope.orderTotalAmount = $scope.vModel.orderTotalAmount;
              $rootScope.finalOrder = $scope.vModel;
          };

          $scope.addOrderItem = function (vendorid, itemId, itemName, itemPrice, addItem) {

              var existingItem = $scope.vModel.orderItems.filter(function (item) {
                  return item.ItemId === itemId;
              });

              if (existingItem.length > 0) {
                  if (addItem)
                      existingItem[0].ItemQty = existingItem[0].ItemQty + 1;
                  else {
                      var itemQty = existingItem[0].ItemQty - 1;
                      if (itemQty >= 0) {
                          existingItem[0].ItemQty = existingItem[0].ItemQty - 1;
                          if (itemQty === 0) {
                              $scope.deleteItemFromOrderArray(vendorid, itemId);
                          }

                      }
                  }

                  var itemQtyAmount = existingItem[0].ItemPrice * existingItem[0].ItemQty;

                  if (itemQtyAmount >= 0)
                      existingItem[0].ItemQtyPrice = existingItem[0].ItemPrice * existingItem[0].ItemQty
              }
              else {
                  $scope.vModel.orderItems.push({
                      ItemId: itemId,
                      ItemName: itemName,
                      ItemPrice: itemPrice,
                      ItemQty: 1,
                      ItemQtyPrice: itemPrice * 1
                  });

                  $scope.vModel.showOrderItem = true;
              }

              var sum = 0;
              $scope.vModel.orderItems.map(function (item) {
                  sum += item.ItemQtyPrice;
              });

              $scope.vModel.orderSubTotal = sum;
              $scope.vModel.orderTotalAmount = $scope.vModel.servicetax + $scope.vModel.vat + $scope.vModel.discount + $scope.vModel.orderSubTotal;
              $rootScope.orderSubTotal = $scope.vModel.orderSubTotal;
              $rootScope.orderTotalAmount = $scope.vModel.orderTotalAmount;
              $rootScope.finalOrder = $scope.vModel;
          }

      });
});