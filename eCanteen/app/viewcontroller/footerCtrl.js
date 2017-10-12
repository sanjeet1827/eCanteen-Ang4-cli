define(['app/app'], function (app) {

    app_cached_providers
      .$controllerProvider
      .register('footerCtrl', function ($scope) {
          $scope.message = "footerCtrl";

          /*
          $scope.myInterval = 5000;
          $scope.noWrapSlides = false;
          var slides = $scope.slides = [];
          $scope.addSlide = function () {
              var newWidth = 600 + slides.length + 1;
              slides.push({
                  image: 'content/Images/img00.jpg',
                  text: 'img1'
              });

              slides.push({
                  image: 'content/Images/img01.jpg',
                  text: 'img2'
              });

              slides.push({
                  image: 'content/Images/img02.jpg',
                  text:'img3'
              });

              slides.push({
                  image: 'content/Images/img03.jpg',
                  text: 'img4'
              });
          };
          //$scope.addSlide();
          
          for (var i = 0; i < 4; i++) {
              $scope.addSlide();
          }
          */

      });
});