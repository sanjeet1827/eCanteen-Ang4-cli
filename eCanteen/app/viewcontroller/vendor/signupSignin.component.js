var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
let SignupSinginComponent = class SignupSinginComponent {
    constructor(_siteService, _vendorService) {
        this._siteService = _siteService;
        this._vendorService = _vendorService;
    }
    ngOnInit() {
        //this._productService.getProducts()
        //    .subscribe(products => this.products = products,
        //    error => this.errorMessage = <any>error);
    }
};
SignupSinginComponent = __decorate([
    Component({
        templateUrl: 'signupSignin.tpl.html'
    }),
    __metadata("design:paramtypes", [Object, Object])
], SignupSinginComponent);
export { SignupSinginComponent };
//# sourceMappingURL=signupSignin.component.js.map