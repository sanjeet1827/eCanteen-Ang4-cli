define(['app/app', 'app/common/shellCtrl', 'app/datacontext/foodItemdatacontext'], function (app, shell) {

    app_cached_providers
      .$controllerProvider
      .register('currentMenuCtrl', function ($rootScope, $scope, $q, $interval, foodItemdatacontext) {
          $scope.message = "currentMenuCtrl";

          $rootScope.displayVendorSlider = false;
          $scope.showSuccessMessage = false;

          $rootScope.popUpNotification = false;

          $scope.currentBreakfastMenuItem = {};
          $scope.currentLunchMenuItem = {};
          $scope.currentSnacksMenuItem = {};
          $scope.currentDinnerMenuItem = {};

          $scope.loadFoodItems = function (vendorId) {
              foodItemdatacontext.getAllFoodItem(vendorId).then(function (data) {

                  var foodData = data.plain();
                  var selectedBreakfastItem, selectedLunchItem, selectedSnacksItem, selectedDinnerItem;

                  foodItemdatacontext.getMenuFoodItems(vendorId, 1).then(function (res) {
                      selectedBreakfastItem = res.plain();
                      $scope.currentBreakfastMenuItem = getCurrentMenuFoodItemArray(selectedBreakfastItem, foodData, 1);
                  });


                  foodItemdatacontext.getMenuFoodItems(vendorId, 2).then(function (res) {
                      selectedLunchItem = res.plain();
                      $scope.currentLunchMenuItem = getCurrentMenuFoodItemArray(selectedLunchItem, foodData, 2);
                  });

                  foodItemdatacontext.getMenuFoodItems(vendorId, 3).then(function (data) {
                      selectedSnacksItem = data.plain();
                      $scope.currentSnacksMenuItem = getCurrentMenuFoodItemArray(selectedSnacksItem, foodData, 3);
                  });

                  foodItemdatacontext.getMenuFoodItems(vendorId, 4).then(function (data) {
                      selectedDinnerItem = data.plain();
                      $scope.currentDinnerMenuItem = getCurrentMenuFoodItemArray(selectedDinnerItem, foodData, 4);
                  });


              });
          }

          $scope.loadFoodItems($rootScope.vendorUId);

          $scope.selectedBreakfastMenuItem = { FoodItemId: null, MenuId: null, menyType: null };
          $scope.selectedLunchMenuItem = { FoodItemId: null, MenuId: null, menyType: null };
          $scope.selectedSnacksMenuItem = { FoodItemId: null, MenuId: null, menyType: null };
          $scope.selectedDinnerMenuItem = { FoodItemId: null, MenuId: null, menyType: null };

          $scope.selectedMenuItems = [];

          $scope.setBreakfastMenuItems = function (foodItemId, menuType) {

              $scope.showSuccessMessage = false;

              if (!($scope.currentBreakfastMenuItem.filter(function (obj) {
                  return obj.Id === foodItemId;
              })[0].br.selected)) {
                  $scope.selectedMenuItems.push(
                            { FoodItemId: foodItemId, menuType: menuType }
                      );

                  $scope.currentBreakfastMenuItem.filter(function (obj) {
                      return obj.Id === foodItemId;
                  })[0].br.selected = true;
              }
              else {

                  $scope.selectedMenuItems = $scope.selectedMenuItems.filter(function (obj) {
                      return obj.FoodItemId !== foodItemId;
                  });

                  $scope.currentBreakfastMenuItem.filter(function (obj) {
                      return obj.Id === foodItemId;
                  })[0].br.selected = false;
              }
          }

          $scope.setLunchMenuItems = function (foodItemId, menuType) {

              $scope.showSuccessMessage = false;

              if (!($scope.currentLunchMenuItem.filter(function (obj) {
                  return obj.Id === foodItemId;
              })[0].lu.selected)) {
                  $scope.selectedMenuItems.push(
                            { FoodItemId: foodItemId, menuType: menuType }
                      );

                  $scope.currentLunchMenuItem.filter(function (obj) {
                      return obj.Id === foodItemId;
                  })[0].lu.selected = true;
              }
              else {

                  $scope.selectedMenuItems = $scope.selectedMenuItems.filter(function (obj) {
                      return obj.FoodItemId !== foodItemId;
                  });

                  $scope.currentLunchMenuItem.filter(function (obj) {
                      return obj.Id === foodItemId;
                  })[0].lu.selected = false;
              }
          }

          $scope.setSnacksMenuItems = function (foodItemId, menuType) {

              $scope.showSuccessMessage = false;

              if (!($scope.currentLunchMenuItem.filter(function (obj) {
                  return obj.Id === foodItemId;
              })[0].sn.selected)) {
                  $scope.selectedMenuItems.push(
                            { FoodItemId: foodItemId, menuType: menuType }
                      );

                  $scope.currentLunchMenuItem.filter(function (obj) {
                      return obj.Id === foodItemId;
                  })[0].sn.selected = true;
              }
              else {

                  $scope.selectedMenuItems = $scope.selectedMenuItems.filter(function (obj) {
                      return obj.FoodItemId !== foodItemId;
                  });

                  $scope.currentLunchMenuItem.filter(function (obj) {
                      return obj.Id === foodItemId;
                  })[0].sn.selected = false;
              }
          }

          $scope.setDinnerMenuItems = function (foodItemId, menuType) {

              $scope.showSuccessMessage = false;

              if (!($scope.currentLunchMenuItem.filter(function (obj) {
                  return obj.Id === foodItemId;
              })[0].di.selected)) {
                  $scope.selectedMenuItems.push(
                            { FoodItemId: foodItemId, menuType: menuType }
                      );

                  $scope.currentLunchMenuItem.filter(function (obj) {
                      return obj.Id === foodItemId;
                  })[0].di.selected = true;
              }
              else {

                  $scope.selectedMenuItems = $scope.selectedMenuItems.filter(function (obj) {
                      return obj.FoodItemId !== foodItemId;
                  });

                  $scope.currentLunchMenuItem.filter(function (obj) {
                      return obj.Id === foodItemId;
                  })[0].di.selected = false;
              }

              var test = $scope.selectedMenuItems;
          }

          $scope.saveVendorCurrentMenu = function () {

              foodItemdatacontext.saveVendorCurrentMenu($scope.selectedMenuItems, $rootScope.vendorUId).then(function (data) {
                  var test = data;
                  $scope.showSuccessMessage = true;
              });

          }

          function getCurrentMenuFoodItemArray(selectedItem, allItem, menuType) {
              var foodItems = allItem;

              var tempMenuItem = [];

              for (var a = 0; a < foodItems.length; a++) {

                  var item = selectedItem.filter(function (obj) {
                      return obj.Id === foodItems[a].Id;
                  });

                  if (item.length > 0) {
                      if (menuType === 1) {
                          if (foodItems[a].br === undefined)
                              foodItems[a].br = {};

                          foodItems[a].br.selected = true;
                      }
                      else if (menuType === 2) {
                          if (foodItems[a].lu === undefined)
                              foodItems[a].lu = {};

                          foodItems[a].lu.selected = true;
                      }
                      else if (menuType === 3) {
                          if (foodItems[a].sn === undefined)
                              foodItems[a].sn = {};

                          foodItems[a].sn.selected = true;
                      }
                      else if (menuType === 4) {
                          if (foodItems[a].di === undefined)
                              foodItems[a].di = {};

                          foodItems[a].di.selected = true;
                      }

                      $scope.selectedMenuItems.push(
                           { FoodItemId: foodItems[a].Id, menuType: menuType }
                     );
                  }
                  else {
                      if (menuType === 1) {
                          if (foodItems[a].br === undefined)
                              foodItems[a].br = {};

                          foodItems[a].br.selected = false;
                      }
                      else if (menuType === 2) {
                          if (foodItems[a].lu === undefined)
                              foodItems[a].lu = {};

                          foodItems[a].lu.selected = false;
                      }
                      else if (menuType === 3) {
                          if (foodItems[a].sn === undefined)
                              foodItems[a].sn = {};

                          foodItems[a].sn.selected = false;
                      }
                      else if (menuType === 4) {
                          if (foodItems[a].di === undefined)
                              foodItems[a].di = {};

                          foodItems[a].di.selected = false;
                      }
                  }

                  foodItems[a].menyType = menuType;
                  tempMenuItem.push(foodItems[a]);


              }
              return tempMenuItem;
          }

      });

});