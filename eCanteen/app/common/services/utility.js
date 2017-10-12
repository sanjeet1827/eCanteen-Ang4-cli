define(['app/app'], function (app) {

    app_cached_providers
      .$factoryProvider
      .factory('utility', function () {

          return {
              isNumber: function (value) {
                  var isNum = false;
                  try {
                      isNum = !isNaN(value);
                      if(isNum)
                      {
                          if(value<=0)
                          {
                              isNum = false;
                          }
                      }
                  } catch (e) {

                  }
                  return isNum;
              }
          }

      });
});