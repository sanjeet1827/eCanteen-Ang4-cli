define(['app/app', 'app/common/shellCtrl', 'app/datacontext/sitedatacontext', 'app/datacontext/signupSignindatacontext'], function (app, shell) {

    // the Content Controller
    // is added into the 'app' module
    // lazily, and only once

    app_cached_providers
      .$controllerProvider
      .register('signupSigninCtrl', function ($rootScope, $scope, $document, sitedatacontext, signupSignindatacontext, $state,$http) {
          $scope.message = "    ";

          $rootScope.popUpNotification = false;

          $document[0].body.className = 'vendor-gate-body';

          $scope.vModel = {};
          $scope.vModel.selectedSite = null;
          $scope.vModel.sites = [];

          $scope.vModel.name = null;
          $scope.vModel.contactNo = null;
          $scope.vModel.email = null;
          $scope.vModel.shopNo = null;
          $scope.vModel.password = null;
          $scope.vModel.logo = null;

          $scope.vModel.registerationPosted = false;
          $scope.vModel.alreadyRegistered = false;

          $scope.vLoginModel = {};
          $scope.vLoginModel.email = null;
          $scope.vLoginModel.password = null;
          $scope.vLoginModel.autheticated = true;

          $scope.vModel.showLoginView = true;

          //$http({
          //    method: 'GET',
          //    url: '/api/site'
          //}).then(function successCallback(response) {
          //    var test = response.headers('Egh-Error');
          //}, function errorCallback(response) {
          //    var test = response.headers('Egh-Error');
          //});

          $scope.activeLoginView = function (active) {
              $scope.vModel.showLoginView = active;
          }

          $scope.loadSites = function () {
              //sitedatacontext.deleteTest({
              //    Ids: ['1', '2']
              //}).then(function (data) {
              //    var test = 1;
              //})

             

              sitedatacontext.getSites().then(function (data) {
                  var test = data.headers('Egh-Error');
                  //var plainData = data.plain();
                  //$scope.vModel.selectedSite = plainData[0].Id;
                  //$scope.vModel.sites = plainData;
              }).catch(function (error) {
                  var test = error.headers('Egh-Error');
              })
              ;
          }

          $scope.loadSites();

          $scope.signUp = function (siteFormInvalid, vModel) {

              if (!siteFormInvalid) {
                  var remoteData = {};
                  remoteData.Id = vModel.Id;
                  remoteData.Name = vModel.name;
                  remoteData.Email = vModel.email;

                  remoteData.Contact = vModel.contactNo;
                  remoteData.Password = vModel.password;
                  remoteData.ShopNo = vModel.shopNo;
                  remoteData.SiteId = vModel.selectedSite;
                  remoteData.logo = vModel.logo;

                  signupSignindatacontext.registerVendor(remoteData).then(function (response) {
                      var alreadyRegistered = null;

                      if (response === undefined)
                      {
                          alreadyRegistered = true;
                      }
                      

                      if (!alreadyRegistered) {
                          $scope.vModel = {};
                          $scope.vModel.alreadyRegistered = false;
                          $scope.vModel.registerationPosted = true;
                      }
                      else {
                          $scope.vModel.alreadyRegistered = true;
                      }
                  });
              }
          }

          $scope.signIn = function (vendorLoginForm, vLoginModel) {

              if (!vendorLoginForm) {
                  signupSignindatacontext.loginVendor(vLoginModel.email, vLoginModel.password).then(function (data) {
                      if (data !== undefined && data !== null) {
                          $rootScope.vendorUId = data.Id;
                          $rootScope.vendorName = data.Name;
                          $document[0].body.className = '';
                          
                          $state.go("shell.orderStatus");
                      }
                      else {
                          $scope.vLoginModel.autheticated = false;
                      }
                  });
              }
          }
      });
});