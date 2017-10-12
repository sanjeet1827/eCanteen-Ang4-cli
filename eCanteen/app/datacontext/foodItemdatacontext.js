define(['app/app', 'app/common/services/remoteResource'], function (app, remoteResource) {

    app_cached_providers
      .$factoryProvider
      .factory('foodItemdatacontext', function (remoteResource) {

          return {
              getFoodItems: function (vendorId, menuType) {
                  var foodItems = remoteResource.RestResource.all("FoodItem").getList({
                      vendorId: vendorId,
                      menuType: menuType
                  });
                  return foodItems;
              },

              getMenuFoodItems: function (vendorId, menuType) {
                  var foodItems = remoteResource.RestResource.all("FoodItem").getList({
                      vendorId: vendorId,
                      menuType: menuType,
                      customer: true
                  });
                  return foodItems;
              },

              saveFoodItems: function (data, menuType, vendorId) {
                  var result = remoteResource.RestResource.all("FoodItem").post(JSON.stringify(data), { menuType: menuType, vendorId: vendorId });
                  return result;
              },

              getCurrentFoodItem: function (vendorId, menuType) {
                  var foodItems = remoteResource.RestResource.all("FoodItem").getList({
                      vendorId: vendorId,
                      menuType: menuType
                  });
                  return foodItems;
              },

              getAllFoodItem: function (vendorId) {
                  var foodItems = remoteResource.RestResource.all("FoodItem").getList({
                      vendorId: vendorId
                  });
                  return foodItems;
              },

              saveVendorCurrentMenu: function (data,vendorId) {
                  var result = remoteResource.RestResource.all("FoodItem").post(JSON.stringify(data), { vendorId: vendorId });
                  return result;
              }
          }

      });
});