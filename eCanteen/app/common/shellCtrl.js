define(['app/app', 'app/directives/decimal-input', 'app/directives/textbox-general', 'app/directives/textbox-decimal', 'app/directives/button-general',
    'app/common/services/utility', 'app/directives/fileupload-general', 'app/directives/test'],
    function (app, decimalInput, textboxgeneral, textboxdecimal, buttongeneral, test, utility) {

        app_cached_providers
          .$compileProvider
          .directive('decimalInput', function () {
              return new DecimalInput();
          });

        app_cached_providers
          .$compileProvider
          .directive('textboxGeneral', function () {
              return new TextboxGeneral();
          });

        app_cached_providers
          .$compileProvider
          .directive('textboxDecimal', function () {
              return new TextboxDecimal();
          });

        app_cached_providers
          .$compileProvider
          .directive('buttonGeneral', function () {
              return new ButtonGeneral();
          });

        app_cached_providers
          .$compileProvider
          .directive('fileuploadGeneral', function ($parse) {
              return new FileuploadGeneral($parse);
          });

        app_cached_providers
      .$compileProvider
      .directive('testDir', function () {
          return new Test();
      });

    });