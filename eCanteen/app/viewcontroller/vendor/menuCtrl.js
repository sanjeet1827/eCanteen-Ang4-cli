define(['app/app', 'app/common/shellCtrl', 'app/datacontext/foodItemdatacontext'], function (app, shell) {

    // the Content Controller
    // is added into the 'app' module
    // lazily, and only once

    app_cached_providers
      .$controllerProvider
      .register('menuCtrl', function ($rootScope, $scope, foodItemdatacontext, utility) {
          $scope.message = "menuCtrl";

          $rootScope.displayVendorSlider = false;
          $rootScope.popUpNotification = false;

          $scope.foodItems = [];

          $scope.vModel = {};
          $scope.vModel.Name = null;
          $scope.vModel.Price = null;
          $scope.vModel.Description = null;

          $scope.vModel.gridPriceError = false;
          $scope.vModel.PriceError = false;
          $scope.vModel.isPriceChanged = false;
          $scope.vModel.activeClassMenu = true;

          $scope.vModel.menuForList = [
              { value: 1, text: 'Breakfast' },
              { value: 2, text: 'Lunch' },
              { value: 3, text: 'Snacks' },
              { value: 4, text: 'Dinner' }
          ]

          $scope.vModel.menuFor = 1;

          //grid configuration
          //$scope.gridOptions = {};

          $scope.gridOptions = {
              enablePaginationControls: false,
              enableSorting: true,
              useExternalSorting: false,
              useExternalFiltering: false,
              enableHorizontalScrollbar: 0,
              enableVerticalScrollbar: 2,
              enableFiltering: false,
              //enablePinning: false,
              //showColumnMenu: false,
              //showFilter: false,
              //showGroupPanel: false,
              //enableHighlighting: false,
              enableColumnMenus: false,
              onRegisterApi: function (gridApi) {
                  $scope.gridApi = gridApi;

                  //declare the events
                  $scope.gridApi.core.on.sortChanged($scope, function (grid, sortColumns) {
                      $scope.sort = [];
                      angular.forEach(sortColumns, function (sortColumn) {
                          $scope.sort.push({
                              fieldName: sortColumn.name,
                              order: sortColumn.sort.direction
                          });
                      });
                      $scope.load();
                  });

                  $scope.gridApi.core.on.filterChanged($scope, function () {
                      $scope.filter = [];

                      var grid = this.grid;
                      angular.forEach(grid.columns, function (column) {
                          var fieldName = column.field;
                          var value = column.filters[0].term;
                          var operator = "contains";
                          if (value) {
                              if (fieldName == "id") operator = "equals";
                              else if (fieldName == "price") operator = "greaterThanOrEqualsTo";
                              $scope.filter.push({
                                  fieldName: fieldName,
                                  operator: operator,
                                  value: value
                              });
                          }
                      });

                      $scope.load();
                  });

                  $scope.gridApi.edit.on.afterCellEdit($scope, function (rowEntity, colDef, newValue, oldValue) {
                      $scope.saveRow(rowEntity, newValue,oldValue);
                      
                  });
                  $scope.gridApi.edit.on.beginCellEdit($scope, function (rowEntity, colDef, newValue, oldValue) {
                      $scope.vModel.isPriceChanged = false;
                  });
                 
              }
          };

          $scope.gridOptions.columnDefs = [
                 {
                     name: 'Name', enableCellEdit: true
                 },
                 {
                     name: 'Price', enableCellEdit: true
                 },
                 {
                     name: 'Description', enableCellEdit: true
                 }

          ];

          $scope.$watch('vModel.Name', function () {

              $scope.vModel.isPriceChanged = false;
          })
          $scope.$watch('vModel.Price', function () {

              $scope.vModel.isPriceChanged = false;
          })
          $scope.$watch('vModel.Description', function () {

              $scope.vModel.isPriceChanged = false;
          })

          // save row data
          $scope.saveRow = function (rowEntity,newValue,oldValue) {


              rowData = {};
              rowData.Id = rowEntity.Id;
              rowData.Name = rowEntity.Name;
              rowData.Description = rowEntity.Description;
              if (utility.isNumber(rowEntity.Price)) {
                  rowData.Price = rowEntity.Price;
                  $scope.vModel.gridPriceError = false;
                  $scope.save(null, null, null, rowData, newValue,oldValue);
              }
              else {
                  $scope.vModel.gridPriceError = true;
              }
          };


          $scope.loadFoodItems = function (vendorId, menuType) {
              foodItemdatacontext.getFoodItems(vendorId, menuType).then(function (data) {
                  $scope.gridOptions.data = data.plain();

              });
          }

          $scope.save = function (formMenuInvalid, formMenuError, formMenu, vModel,newValue,oldValue) {

              var form = $scope.vModel.itemName
              var remoteData = {};
              remoteData.Id = vModel.Id;
              remoteData.Name = vModel.Name;
              remoteData.Price = vModel.Price;
              remoteData.Description = vModel.Description;
              remoteData.Type = $scope.vModel.menuFor;
              if (!utility.isNumber(vModel.Price)) {
                  $scope.vModel.PriceError = true;
                  return;
              }
              $scope.vModel.PriceError = false;
              remoteData.Availability = true;
              remoteData.VendorId = $rootScope.vendorUId;

              foodItemdatacontext.saveFoodItems(remoteData, $scope.vModel.menuFor, $rootScope.vendorUId).then(function (data) {

                  if (remoteData.Id === null || remoteData.Id === undefined) {
                      $scope.loadFoodItems($rootScope.vendorUId, $scope.vModel.menuFor);
                  }

                  vModel.Name = null;
                  vModel.Price = null;
                  vModel.Description = null;
                  $scope.vModel.isPriceChanged = true;
                  if (newValue!==undefined && oldValue !==undefined && newValue === oldValue) {
                      $scope.vModel.isPriceChanged = false;
                  }
              });
          }

          $scope.selectedRow = 0;  // initialize our variable to null
          $scope.setClickedRow = function (index) {  //function that sets the value of selectedRow to current index
              $scope.selectedRow = index;
          }

          $scope.validatePriceOnKeyPress = function (event) {
              if (!utility.isNumber(event.target.value)) {
                  $scope.vModel.PriceError = true;
                  return;
              }
              $scope.vModel.PriceError = false;
          }

          $scope.loadFoodItems($rootScope.vendorUId, $scope.vModel.menuFor);
      });
});