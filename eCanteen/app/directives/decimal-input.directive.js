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
var DecimalInputDirective = (function () {
    function DecimalInputDirective(el) {
        this.el = el;
    }
    DecimalInputDirective.prototype.onInput = function () {
        this.transformToDecimal(this.el.nativeElement.target.value);
    };
    DecimalInputDirective.prototype.transformToDecimal = function (value) {
        var rawValue = value !== undefined && value !== null && value !== '' ? value : '';
        if (/[^0-9.]/g.test(rawValue)) {
            this.el.nativeElement;
            if (this.el.nativeElement.target.getAttribute('oldValue') !== undefined &&
                this.el.nativeElement.target.getAttribute('oldValue') !== null) {
                var oldValue = this.el.nativeElement.target.getAttribute('oldValue');
                this.el.nativeElement.target.value = oldValue;
            }
            else {
                this.el.nativeElement.target.value = rawValue.replace(rawValue, "");
            }
        }
        else {
            this.el.nativeElement.target.setAttribute('oldValue', rawValue);
        }
    };
    return DecimalInputDirective;
}());
__decorate([
    core_1.HostListener('input'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DecimalInputDirective.prototype, "onInput", null);
DecimalInputDirective = __decorate([
    core_1.Directive({
        selector: '[decimal-input]'
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], DecimalInputDirective);
exports.DecimalInputDirective = DecimalInputDirective;
//# sourceMappingURL=decimal-input.directive.js.map