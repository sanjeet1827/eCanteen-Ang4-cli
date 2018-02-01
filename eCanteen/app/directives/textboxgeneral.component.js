"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var TextboxGeneralComponent = TextboxGeneralComponent_1 = (function () {
    function TextboxGeneralComponent() {
        this.IsRequiredFieldEmpty = true;
        //@Output() ngValueChange = new EventEmitter();
        //change(newValue) {
        //    this.ngValue = newValue;
        //    this.ngValueChange.emit(newValue);
        //}
        // the method set in registerOnChange to emit changes back to the form
        this.propagateChange = function (_) { };
        this.ngType = "text";
    }
    // this is the initial value set to the component
    TextboxGeneralComponent.prototype.writeValue = function (obj) {
        if (obj) {
            this.data = obj;
            // this will format it with 4 character spacing
            this.ngValue = obj;
        }
    };
    // registers 'fn' that will be fired wheb changes are made
    // this is how we emit the changes back to the form
    TextboxGeneralComponent.prototype.registerOnChange = function (fn) {
        this.propagateChange = fn;
    };
    // validates the form, returns null when valid else the validation object
    // in this case we're checking if the json parsing has passed or failed from the onChange method
    TextboxGeneralComponent.prototype.validate = function (c) {
        return (!this.IsRequiredFieldEmpty) ? null : {
            jsonParseError: {
                valid: false,
            },
        };
    };
    // not used, used for touch input
    TextboxGeneralComponent.prototype.registerOnTouched = function () { };
    // change events from the textarea
    TextboxGeneralComponent.prototype.onChange = function (event) {
        // get value from text area
        var newValue = event.target.value;
        try {
            // parse it to json
            //this.data = JSON.parse(newValue);
            this.ngValue = newValue;
            var checkValue = this.ngValue.toString().trim();
            this.IsRequiredFieldEmpty = checkValue === undefined || checkValue === null || checkValue === "" ? true : false;
        }
        catch (ex) {
            // set parse error if it fails
            this.IsRequiredFieldEmpty = true;
        }
        // update the form
        this.propagateChange(this.ngValue);
    };
    return TextboxGeneralComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], TextboxGeneralComponent.prototype, "ngType", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], TextboxGeneralComponent.prototype, "placeholder", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], TextboxGeneralComponent.prototype, "maximumLenght", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], TextboxGeneralComponent.prototype, "minimumLenght", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], TextboxGeneralComponent.prototype, "ngId", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], TextboxGeneralComponent.prototype, "ngName", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], TextboxGeneralComponent.prototype, "fieldRequired", void 0);
TextboxGeneralComponent = TextboxGeneralComponent_1 = __decorate([
    core_1.Component({
        selector: "textbox-general",
        templateUrl: "textbox-general.html",
        providers: [
            {
                provide: forms_1.NG_VALUE_ACCESSOR,
                useExisting: core_1.forwardRef(function () { return TextboxGeneralComponent_1; }),
                multi: true,
            },
            {
                provide: forms_1.NG_VALIDATORS,
                useExisting: core_1.forwardRef(function () { return TextboxGeneralComponent_1; }),
                multi: true,
            }
        ]
    }),
    __metadata("design:paramtypes", [])
], TextboxGeneralComponent);
exports.TextboxGeneralComponent = TextboxGeneralComponent;
var TextboxGeneralComponent_1;
//# sourceMappingURL=textboxgeneral.component.js.map