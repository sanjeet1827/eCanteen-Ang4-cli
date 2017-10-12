angular.module('app', ['ngNewRouter'])
    .config(['$componentLoaderProvider', function ($componentLoaderProvider) {
        $componentLoaderProvider.setTemplateMapping(function (name) {
            return 'app/components/' + name + '/' + name + '.html';
        });
        $componentLoaderProvider.setCtrlNameMapping(function (name) {
            return 'app/components/' + name + '/' + name + 'Controller.js';
        });
    }])
  .controller('AppController', ['$router', function ($router) {
      $router.config([
    { path: '/', redirectTo: 'index' },
    //{ path: '/index', components: 'shell' },
    {
        path: '/index',
        components: {
            shellView: 'shell',
            mainView: 'main'
        },

    }
      ]);

  }])
    .controller('shellController', function () {
        console.log('shellController loaded');
        this.message = 'This message is from the first controller! You are in the first component.';
    })
  .controller('masterController', function ($routeParams) {
      console.log('masterController loaded');
      this.message = 'Hey ' + $routeParams.name + ', this is the second component!';
  }).controller('mainController', function ($routeParams) {
      console.log('mainController loaded');
      this.message = 'Hey ' + $routeParams.name + ', this is the second component!';
  });