function TextboxGeneral() {

    this.restrict = "EA",
    this.scope = {
        ngType: "@",
        ngValue: "=",
        placeholder: "@",
        maximumLenght: "@",
        minimumLenght: "@",
        ngId: "@",
        ngName: "@",
        fieldRequired: '@'
    },
    this.templateUrl = "app/directives/textbox-general.html";

    this.link = function (scope, element, attrs) {
        scope.ngType = 'text';
    }

}