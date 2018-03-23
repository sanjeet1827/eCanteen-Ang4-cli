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
import { SiteService } from '../../datacontext/site.service';
import { VendorService } from '../../datacontext/vendor.service';
import { httpHelper } from '../../Helpers/httpHelper';
import { SignIn, SignUp, Vendor } from '../../Models/AppModels';
var SignupSinginComponent = (function () {
    function SignupSinginComponent(_siteService, _vendorService, _httpHelper) {
        this._siteService = _siteService;
        this._vendorService = _vendorService;
        this._httpHelper = _httpHelper;
        this.showLoginView = true;
        this.vModel = new SignUp();
        this.vLoginModel = new SignIn();
        this.vLoginModel.authenticated = true;
    }
    SignupSinginComponent.prototype.onActivatingLoginView = function (active) {
        return this.vModel.showLoginView = active;
    };
    SignupSinginComponent.prototype.activeLoginView = function (active) {
        return this.vModel.showLoginView = active;
    };
    SignupSinginComponent.prototype.signIn = function (isVendorLoginFormValid) {
        var _this = this;
        if (isVendorLoginFormValid) {
            var vModel = new Vendor();
            vModel.email = this.vLoginModel.email;
            vModel.password = this.vLoginModel.password;
            this._vendorService.loginVendor(vModel).subscribe(function (authenticatedVendor) {
                if (authenticatedVendor) {
                    //$rootScope.vendorUId = authenticatedVendor.id;
                    //$rootScope.vendorName = authenticatedVendor.name;
                    //$document[0].body.className = '';
                    _this._httpHelper.redirectTo("/orderStatus", { vendorId: authenticatedVendor.Id });
                }
                else {
                    _this.vLoginModel.authenticated = false;
                }
            });
            //    .then(function (data) {
            //    if (data !== undefined && data !== null) {
            //        $rootScope.vendorUId = data.Id;
            //        $rootScope.vendorName = data.Name;
            //        $document[0].body.className = '';
            //        $state.go("shell.orderStatus");
            //    }
            //    else {
            //        $scope.vLoginModel.autheticated = false;
            //    }
            //});
        }
    };
    SignupSinginComponent.prototype.signUp = function (IsSiteFormVvalid) {
        var _this = this;
        console.log("signUp ethod invoked");
        if (IsSiteFormVvalid) {
            var vModel = new Vendor();
            vModel.name = this.vModel.name;
            vModel.active = true;
            vModel.email = this.vModel.email;
            vModel.logo = this.vModel.logo;
            vModel.password = this.vModel.password;
            vModel.shopNo = this.vModel.shopNo;
            vModel.siteId = this.vModel.selectedSite;
            vModel.contact = this.vModel.contactNo;
            this._vendorService.registerVendor(vModel).subscribe(function (registeredVendor) {
                if (registeredVendor !== undefined && registeredVendor) {
                    _this.vModel.alreadyRegistered = false;
                    _this.vModel.registerationPosted = true;
                }
                else {
                    _this.vModel.alreadyRegistered = true;
                }
            });
        }
    };
    SignupSinginComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._siteService.getSites()
            .subscribe(function (sites) {
            _this.sites = sites;
            _this.vModel.selectedSite = sites.filter(function (st) {
                return st.Name === "Ansal Tower";
            })[0].Id.toString();
        }, function (error) { return _this.errorMessage = error; });
    };
    return SignupSinginComponent;
}());
SignupSinginComponent = __decorate([
    Component({
        templateUrl: 'SignupSinginComponent.html'
    }),
    __metadata("design:paramtypes", [SiteService,
        VendorService, httpHelper])
], SignupSinginComponent);
export { SignupSinginComponent };
//# sourceMappingURL=signupSignin.component.js.map