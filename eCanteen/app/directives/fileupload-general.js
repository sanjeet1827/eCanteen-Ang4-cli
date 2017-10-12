function FileuploadGeneral($parse) {

    this.restrict = "A",

    this.link = function (scope, element, attrs) {
        var model = $parse(attrs.fileuploadGeneral);
        var modelSetter = model.assign;

        element.bind('change', function () {
            scope.$apply(function () {
                //modelSetter(scope, element[0].files[0]);
                var file = element[0].files[0];
                var reader = new FileReader();

                reader.onloadend = function () {
                    var data = reader.result;
                    modelSetter(scope, data);
                }

                if (file) {
                    reader.readAsDataURL(file);
                } else {
                  
                }
            });
        });
    }
}