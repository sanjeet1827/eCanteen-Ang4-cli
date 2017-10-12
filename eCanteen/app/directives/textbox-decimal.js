function TextboxDecimal() {

    this.restrict = "EA",
    this.scope = {
        ngValue: "=",
        placeholder: "@",
        maximumLenght: "@",
        ngId: "@",
        ngName: "@",
        fieldRequired: '@',
        keyup: '&'
    },
    this.templateUrl = "app/directives/textbox-decimal.html";
    this.link = function (scope, element, attrs, ngModel) {
       
    }

}