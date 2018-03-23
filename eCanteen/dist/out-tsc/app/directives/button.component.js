var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter } from '@angular/core';
var ButtonComponent = (function () {
    function ButtonComponent() {
        var _this = this;
        this.Submit = new EventEmitter();
        this.TriggerSubmit = function () {
            _this.Submit.emit();
        };
    }
    return ButtonComponent;
}());
__decorate([
    Input(),
    __metadata("design:type", String)
], ButtonComponent.prototype, "buttonType", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], ButtonComponent.prototype, "value", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], ButtonComponent.prototype, "Submit", void 0);
ButtonComponent = __decorate([
    Component({
        selector: "button-general",
        templateUrl: "button-general.html"
    })
], ButtonComponent);
export { ButtonComponent };
//# sourceMappingURL=button.component.js.map