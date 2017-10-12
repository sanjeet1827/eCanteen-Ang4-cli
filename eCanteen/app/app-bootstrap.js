//'use strict'

app = angular.module('app', ["ui.router", "ui.bootstrap", "restangular", "ui.grid", "ui.grid.edit", "ngAnimate", "ngSanitize"]);

var app_cached_providers = {};

app.factory("templateCacheInterceptor", ["$q", "$rootScope", "$templateCache", versionInterceptor]);

app.config(["$stateProvider", "$urlRouterProvider", "$locationProvider", "$controllerProvider", "$compileProvider", "$httpProvider", "$provide", "RestangularProvider",
function ($stateProvider, $urlRouterProvider, $locationProvider, $controllerProvider, $compileProvider, $httpProvider, $provide, RestangularProvider) {
    app_cached_providers.$controllerProvider = $controllerProvider;
    app_cached_providers.$compileProvider = $compileProvider;
    app_cached_providers.$factoryProvider = $provide;
    var rr = routeResolverService;

    // $locationProvider.html5Mode(true);

    $httpProvider.interceptors.push("templateCacheInterceptor");

    RestangularProvider.setBaseUrl("/api");
    //RestangularProvider.setFullResponse(true);
    RestangularProvider.setResponseExtractor(function (elem, operation,what,url,response,deffered) {

        if (operation === "remove") {
            return undefined;
        }
        return elem;
    });
    RestangularProvider.setErrorInterceptor(function (response, deffered,responseHandler) {

        var test = 123;
    });

    RestangularProvider.setResponseInterceptor(
        function (data, operation, what) {
            if (operation === "getList" || operation === "get" || operation === "post" || operation === "remove") {
                if (operation === "getList" && data === null) {
                    data = [];
                }
                return data;
            }
        });

    RestangularProvider.setResponseExtractor(function (data, operation, route, url, response, deferred) {
        if (operation === "getList" || operation === "get" || operation === "post") {
            if (operation === "getList" && response.data === null) {
                return [];
            }
            
            return response.data;

        } else {
            return response;
        }

    });

    RestangularProvider.setOnElemRestangularized(function (element, isCollection, what, Restangular) {
        //element.accountName = 'Changed';
        return element;
    });


    $stateProvider
        .state('shell', {
            abstract: true,
            templateUrl: 'app/common/shell.html'
        })
     .state('shell.init', {
         url: '/home',
         views: {
             'master': routeResolverService.resolve('master'),
             'content': routeResolverService.resolve('main'),
             'footer@shell.init': routeResolverService.resolve('footer')
         },
         params: { breadscrum: null, }
     })
        .state('shell.orderCheckout', {
            url: '/checkout',
            views: {
                'master': routeResolverService.resolve('master'),
                'content': routeResolverService.resolve('orderCheckout')
            },
            params: { orderData: null, }
        })
        .state('shell.confirmOrder', {
            url: '/confirmOrder?customerId&orderId&transId&transStatus',
            views: {
                'master': routeResolverService.resolve('master'),
                'content': routeResolverService.resolve('confirmOrder')
            }
        })
        .state('shell.confirmRegistration', {
            url: '/confirmRegistration?Id',
            views: {
                'master': routeResolverService.resolve('master'),
                'content': routeResolverService.resolve('confirmRegistration')
            }
        })
        .state('shell.vendor', {
            url: '/vendor',
            views: {
                'master': routeResolverService.resolve('master'),
                'content': routeResolverService.resolve('vendor/vendorMain'),
                'footer@shell.init': routeResolverService.resolve('footer')
            }
        })
    .state('shell.manageMenu', {
        url: '/menu',
        views: {
            'master': routeResolverService.resolve('master'),
            'content': routeResolverService.resolve('vendor/menu'),
            'footer@shell.init': routeResolverService.resolve('footer')
        }
    })
    .state('shell.orderStatus', {
        url: '/orderStatus',
        views: {
            'master': routeResolverService.resolve('master'),
            'content': routeResolverService.resolve('vendor/orderStatus'),
            'footer@shell.init': routeResolverService.resolve('footer')
        }
    })
    .state('shell.customerOrderHistory', {
        url: '/customerOrderHistory',
        views: {
            'master': routeResolverService.resolve('master'),
            'content': routeResolverService.resolve('customerOrderHistory'),
            'footer@shell.init': routeResolverService.resolve('footer')
        }
    })
    .state('shell.currentMenu', {
        url: '/currentMenu',
        views: {
            'master': routeResolverService.resolve('master'),
            'content': routeResolverService.resolve('vendor/currentMenu'),
            'footer@shell.init': routeResolverService.resolve('footer')
        }
    })
    .state('shell.vendorSignupSignin', {
        url: '/vendorgate',
        views: {

            'content': routeResolverService.resolve('vendor/signupSignin'),
            'footer@shell.init': routeResolverService.resolve('footer')
        }
    });

    $urlRouterProvider.otherwise('/vendorgate');
}



]);

app.run(["$state", "$location", function ($state, $location) {



}]);
angular.element(document).ready(function () {
    angular.bootstrap(document, ['app']);
});


function versionInterceptor($q, $rootScope, $templateCache) {

    return {

        'request': function (request) {
            var objVersion = "version";
            if (request.method === "GET" && request.url) {
                if (request.url.indexOf("app/") === 0) {
                    var index = request.url.indexOf("?version=");
                    if (index > -1) {
                        if ($templateCache.get(request.url) !== undefined) {
                            var tempStr = request.url.substring(0, index);
                            var newStr = tempStr + "?version=" + window[objVersion];
                            if (newStr !== request.url) {
                                $templateCache.remove(request.url);
                                request.url = newStr;
                            }
                        }
                    }
                    else {
                        if ($templateCache.get(request.url) !== undefined) {
                            $templateCache.remove(request.url);
                        }
                        request.url = request.url + "?version=" + window[objVersion];
                    }
                }
            }

            return request;
        }
    };
};