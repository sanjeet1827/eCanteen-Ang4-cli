define(['app/app', 'app/common/shellCtrl'], function (app, shell) {

    // the Content Controller
    // is added into the 'app' module
    // lazily, and only once

    app_cached_providers
      .$controllerProvider
      .register('orderShortDetailCtrl', function ($rootScope, $scope) {
          $scope.message = "orderShortDetailCtrl";

          $scope.vModel = {};
          $scope.vModel.orderSubTotal = null;
          $scope.vModel.servicetax = null;
          $scope.vModel.vat = null;
          $scope.vModel.discount = null;
          $scope.vModel.timeSlot = null;
          $scope.vModel.orderTotalAmount = null;

          $scope.vModel.orderItems = [];
          $scope.vModel.showOrderItem = false;
          $rootScope.orderSubTotal = null;
          $rootScope.orderTotalAmount = null;

          $scope.$on("addOrderItem", function (data, vendorid, itemId, itemName, itemPrice, addItem) {
              $scope.addOrderItem(vendorid, itemId, itemName, itemPrice, addItem);

          });

          var deleteItemFromOrderArray = function (vendorid, itemId) {

              var removeIndex = $scope.vModel.orderItems.map(function (item) { return item.ItemId; })
                       .indexOf(itemId);

              $scope.vModel.orderItems.splice(removeIndex, 1);

              var sum = 0;
              $scope.vModel.orderItems.map(function (item) {
                  sum += item.ItemQtyPrice;
              });

              $scope.vModel.orderSubTotal = sum;
              $rootScope.orderSubTotal = $scope.vModel.orderSubTotal;
              $rootScope.orderTotalAmount = $scope.vModel.orderTotalAmount;
          };

          $scope.removeOrderItem = function (vendorid, itemId) {

              deleteItemFromOrderArray(vendorid, itemId);
          }

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
                              deleteItemFromOrderArray(vendorid, itemId);
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
              $rootScope.orderSubTotal = $scope.vModel.orderSubTotal;

              $rootScope.orderTotalAmount = $scope.vModel.orderTotalAmount;
          }

      });
});