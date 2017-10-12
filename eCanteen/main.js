var routeResolverService;
require.config({
    baseUrl: "",
    //urlArgs:"bust="+(new Date()).getTime(),
    // alias libraries paths
    paths: {

        "appBootstrap": "app/app-bootstrap",
        "routeResolver": "app/route-resolver",

        "mainCtrl": "app/viewcontroller/mainCtrl",
        "masterCtrl": "app/viewcontroller/masterCtrl",
        "footerCtrl": "app/viewcontroller/footerCtrl",
        "orderCheckoutCtrl": "app/viewcontroller/orderCheckoutCtrl",
        "vendorMainCtrl": "app/viewcontroller/vendor/vendorMainCtrl",
        "menuCtrl": "app/viewcontroller/vendor/menuCtrl",
        "currentMenuCtrl": "app/viewcontroller/vendor/currentMenuCtrl",
        "orderStatusCtrl": "app/viewcontroller/vendor/orderStatusCtrl",
        "signupSigninCtrl": "app/viewcontroller/vendor/signupSigninCtrl",
        "confirmOrderCtrl": "app/viewcontroller/confirmOrderCtrl",
        "confirmRegistrationCtrl": "app/viewcontroller/confirmRegistrationCtrl",
        "customerOrderHistoryCtrl": "app/viewcontroller/customerOrderHistoryCtrl",

        "angular": "Scripts/angular.min",
        "ngAnimate": "Scripts/angular-animate.min",
        "ngSanitize": "Scripts/angular-sanitize.min",
        "angularUIRouter": "Scripts/angular-ui-router.min",
        "angularUItpls": "Scripts/angular-ui/ui-bootstrap-tpls.min",
        "angularUIBootstrap": "Scripts/angular-ui/ui-bootstrap.min",
        "restAngular": "Scripts/restangular.min",
        "underscore": "Scripts/underscore.min",

        "jquery": "Scripts/jquery.min",
        "bootstrap": "Scripts/bootstrap.min",
        "metisMenu": "Scripts/metisMenu",
        "sbadmin2": "Scripts/sb-admin-2",
        "uigrid": "Scripts/ui-grid.min"

    },
    shim: {
        routeResolver: {
            exports: 'routeResolver'
        },
        "appBootstrap": ["routeResolver"],
        "angularUIRouter": ["angular"],
        "angularUIBootstrap": ["angular"],
        "angularUItpls": ["angular"],
        "restAngular": ["angular", "underscore"],

        "bootstrap": ["jquery"],
        "metisMenu": ["jquery"],
        "sbadmin2": ["jquery"],
        "uigrid": ["jquery", "angular"],
        "ngAnimate": ["angular"],
        "ngSanitize": ["angular"]
    },
    waitSeconds: 200
});


require(['routeResolver', 'angular', 'ngAnimate', 'ngSanitize', 'angularUIRouter', 'jquery', 'bootstrap', 'angularUItpls', 'underscore', 'restAngular', 'uigrid'], function (rr) {
    routeResolverService = new rr();
    require(['appBootstrap'], function () {
        console.log('app loaded');
    });

});


