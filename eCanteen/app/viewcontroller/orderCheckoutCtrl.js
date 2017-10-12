define(['app/app', 'app/common/shellCtrl', 'app/viewcontroller/modals/modalCustomerSingupCtrl', 'app/viewcontroller/orderDetailCtrl',
    'app/datacontext/orderCheckoutdatacontext', 'app/viewcontroller/modals/modalBusinessErrorCtrl'], function (app) {

    app_cached_providers
      .$controllerProvider
      .register('orderCheckoutCtrl', function ($rootScope, $scope, $modal, $cacheFactory, orderCheckoutdatacontext, $sce) {
          $rootScope.displayVendorSlider = false;
          $scope.message = "orderCheckoutCtrl";
          $scope.vModel = {};
          $scope.vModel.menuFor = 1;

          $scope.vModel.hash = null;
          $scope.vModel.txnid = null;
          $scope.vModel.key = null;
          $scope.finalOrder = null;

          $scope.pModel = {};
          $scope.pModel.lastname = '';

          $scope.pModel.address2 = ''
          $scope.pModel.udf5 = ''
          $scope.pModel.service_provider = ''
          //$scope.pModel.service_provider = 'payu_paisa'
          $scope.pModel.curl = ''
          $scope.pModel.udf4 = ''
          $scope.pModel.txnid = ''
          $scope.pModel.furl = ''
          $scope.pModel.state = ''
          $scope.pModel.udf2 = ''
          $scope.pModel.udf1 = ''
          $scope.pModel.zipcode = ''
          $scope.pModel.amount = ''
          $scope.pModel.email = 'test'
          $scope.pModel.city = ''
          $scope.pModel.country = ''
          $scope.pModel.udf3 = ''
          $scope.pModel.address1 = ''
          $scope.pModel.hash = ''

          $scope.pModel.key = ''
          $scope.pModel.pg = ''
          $scope.pModel.surl = 'http://localhost:2434/PaymentResponse.aspx';
          $scope.pModel.firstname = 'test'
          $scope.pModel.productinfo = 'test'
          $scope.pModel.phone = 'test'

          //$rootScope.$broadcast("setOrderDetail", $stateParams.orderData);
          $scope.submitPayForm = function () {

              var remoteData = {};
              remoteData.OrderItem = [];
              remoteData.CustomerId = $rootScope.customerId;
              remoteData.VenderId = $rootScope.vendorId;
              remoteData.SubTotal = $rootScope.finalOrder.orderSubTotal;
              remoteData.ServiceTax = $rootScope.finalOrder.servicetax;
              remoteData.Vat = $rootScope.finalOrder.vat;
              remoteData.Discount = $rootScope.finalOrder.discount;
              remoteData.Total = $rootScope.finalOrder.orderTotalAmount;
              remoteData.TimeSlot = 1;

              for (var a = 0; a < $rootScope.finalOrder.orderItems.length; a++) {
                  remoteData.OrderItem[a] = { Price: $rootScope.finalOrder.orderItems[a].ItemPrice, Quantity: $rootScope.finalOrder.orderItems[a].ItemQty, FoodItemId: $rootScope.finalOrder.orderItems[a].ItemId }
              }

              orderCheckoutdatacontext.placeOrder(remoteData).then(function (response) {
                  $scope.pModel.surl = $scope.pModel.surl + '?customerId=' + $rootScope.customerId + '&orderId=' + response.Id;
                  orderCheckoutdatacontext.payOrder($scope.pModel, response.Id).then(function (response) {

                      $scope.pModel.form = $sce.trustAsHtml(response);
                      setTimeout(function () {
                          var PostForm = document.getElementById('PostForm');
                          PostForm.submit();

                      }, 500)
                  });
              }, function (error) {
                  if(error.data.ExceptionMessage ==="Item not available in menu")
                  {
                      $scope.errorMessage = "Any of item in order has just finished, you may place your order again with some other items!";
                      $modal.open({

                          templateUrl: 'app/viewcontroller/modals/modalBusinessError.html',
                          controller: 'modalBusinessErrorCtrl',
                          backdrop: 'static',
                          windowClass: 'signup-dialog',
                          scope: $scope,

                      });
                  }
              });
          }

          $scope.openCustomerSignUpModal = function () {
              if ($rootScope.customerId === null || $rootScope.customerId === undefined) {
                  event.preventDefault();
                  $scope.signUpmodal = false;
                  $rootScope.customerNotLoggedInToPlaceOrder = true;
                  $modal.open({

                      templateUrl: 'app/viewcontroller/modals/modalCustomerSingup.html',
                      controller: 'modalCustomerSingupCtrl',
                      backdrop: 'static',
                      windowClass: 'signup-dialog',
                      scope: $scope,

                  });
              }
              else {

                  //orderCheckoutdatacontext.placeOrder().then(function (response) {

                  $scope.pModel.amount = $rootScope.orderTotalAmount;

                  $scope.submitPayForm();
                  //});

              }

          };

          $scope.$on("placeOrder", function (data) {

              orderCheckoutdatacontext.placeOrder().then(function (response) {
                  var res = response;
              });

          });


      });
});