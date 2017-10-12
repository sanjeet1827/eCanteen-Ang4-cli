function routeResolver() {

    var basePath = "app/viewcontroller/";
    var controllerSuffix = "Ctrl";
    var templateSuffix = ".html"

    routeResolver.prototype.resolve = function (dependencies) {

        var roteDef =
        {
            templateUrl: basePath + dependencies+ templateSuffix,
            controller: dependencies.substring(dependencies.lastIndexOf("/") + 1) + controllerSuffix,
            resolve: {
                load: ["$q", "$rootScope", function ($q, $rootScope) {
                    var defer = $q.defer();
                    var dep = [dependencies.substring(dependencies.lastIndexOf("/") + 1) + controllerSuffix]
                    require(dep, function (d) {
                        defer.resolve();
                        $rootScope.$apply();
                    })
                    return defer.promise;
                }]
            }
        };

        return roteDef;

    };
}