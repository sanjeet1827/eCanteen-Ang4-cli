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
var TextboxGeneralComponent = (function () {
    function TextboxGeneralComponent() {
        this.ngValueChange = new core_1.EventEmitter();
        this.ngType = "text";
    }
    TextboxGeneralComponent.prototype.change = function (newValue) {
        this.ngValue = newValue;
        this.ngValueChange.emit(newValue);
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
], TextboxGeneralComponent.prototype, "ngValue", void 0);
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
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], TextboxGeneralComponent.prototype, "ngValueChange", void 0);
TextboxGeneralComponent = __decorate([
    core_1.Component({
        selector: "textbox-general",
        templateUrl: "textbox-general.html",
    }),
    __metadata("design:paramtypes", [])
], TextboxGeneralComponent);
exports.TextboxGeneralComponent = TextboxGeneralComponent;
//# sourceMappingURL=textboxgeneral.component.js.map