var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Output, EventEmitter } from '@angular/core';
import { SiteService } from '../../datacontext/site.service';
import { VendorService } from '../../datacontext/vendor.service';
import { httpHelper } from '../../Helpers/httpHelper';
import { SignIn, Vendor } from '../../Models/AppModels';
var SinginComponent = (function () {
    function SinginComponent(_siteService, _vendorService, _httpHelper) {
        this._siteService = _siteService;
        this._vendorService = _vendorService;
        this._httpHelper = _httpHelper;
        this.showLoginView = true;
        this.onActivatingLoginView = new EventEmitter();
        //this.vModel = new SignUp();
        this.vLoginModel = new SignIn();
        this.vLoginModel.authenticated = true;
    }
    SinginComponent.prototype.activeLoginView = function (active) {
        this.onActivatingLoginView.emit(active);
    };
    SinginComponent.prototype.signIn = function (isVendorLoginFormValid) {
        var _this = this;
        if (isVendorLoginFormValid) {
            var vModel = new Vendor();
            vModel.email = this.vLoginModel.email;
            vModel.password = this.vLoginModel.password;
            this._vendorService.loginVendor(vModel).subscribe(function (authenticatedVendor) {
                if (authenticatedVendor) {
                    _this._httpHelper.redirectTo("/orderStatus", { vendorId: authenticatedVendor.Id });
                }
                else {
                    _this.vLoginModel.authenticated = false;
                }
            });
        }
    };
    SinginComponent.prototype.ngOnInit = function () {
    };
    return SinginComponent;
}());
__decorate([
    Output(),
    __metadata("design:type", Object)
], SinginComponent.prototype, "onActivatingLoginView", void 0);
SinginComponent = __decorate([
    Component({
        selector: 'signIn',
        templateUrl: 'SinginComponent.html'
    }),
    __metadata("design:paramtypes", [SiteService,
        VendorService, httpHelper])
], SinginComponent);
export { SinginComponent };
//# sourceMappingURL=Signin.component.js.map