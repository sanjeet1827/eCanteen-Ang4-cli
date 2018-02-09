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
var site_service_1 = require("../../datacontext/site.service");
var vendor_service_1 = require("../../datacontext/vendor.service");
var httpHelper_1 = require("../../Helpers/httpHelper");
var AppModels_1 = require("../../Models/AppModels");
var SinginComponent = (function () {
    function SinginComponent(_siteService, _vendorService, _httpHelper) {
        this._siteService = _siteService;
        this._vendorService = _vendorService;
        this._httpHelper = _httpHelper;
        this.showLoginView = true;
        this.onActivatingLoginView = new core_1.EventEmitter();
        //this.vModel = new SignUp();
        this.vLoginModel = new AppModels_1.SignIn();
        this.vLoginModel.authenticated = true;
    }
    SinginComponent.prototype.activeLoginView = function (active) {
        this.onActivatingLoginView.emit(active);
    };
    SinginComponent.prototype.signIn = function (isVendorLoginFormValid) {
        var _this = this;
        if (isVendorLoginFormValid) {
            var vModel = new AppModels_1.Vendor();
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
    core_1.Output(),
    __metadata("design:type", Object)
], SinginComponent.prototype, "onActivatingLoginView", void 0);
SinginComponent = __decorate([
    core_1.Component({
        selector: 'signIn',
        templateUrl: 'SinginComponent.html'
    }),
    __metadata("design:paramtypes", [site_service_1.SiteService,
        vendor_service_1.VendorService, httpHelper_1.httpHelper])
], SinginComponent);
exports.SinginComponent = SinginComponent;
//# sourceMappingURL=Signin.component.js.map