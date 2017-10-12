function TestGeneral() {

    this.restrict = "EA",
    this.scope = {
        ngType: "@",
        ngValue: "=",
        placeholder: "@",
        maximumLenght: "@",
        minimumLenght: "@",
        ngId: "@",
        ngName: "@",
        fieldRequired:"&"
    },
    this.templateUrl = "app/directives/testGeneral.html",
    this.controller = function () {
        console.log("controller invoked");
        this.data = "okay";
        this.invokefieldRequired = function (func) {
            //func({ data: 123 });
            this.fieldRequired({ data: 123 });
        }
        this.invokefieldRequired(null);
    },
    this.controllerAs = "vmTest",
    this.bindToController= true,

    this.link = function (scope, element, attrs,controller) {
        console.log("link invoked");
        console.log("controller.data " + controller.data)

        //scope.callinvokefieldRequired = function () {
        //    controller.invokefieldRequired(scope.fieldRequired);
        //}

        //scope.callinvokefieldRequired();

        //scope.fieldRequired({ data: 123 });
    }
}