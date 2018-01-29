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
var SignupSinginComponent = (function () {
    function SignupSinginComponent(_siteService, _vendorService, _httpHelper) {
        this._siteService = _siteService;
        this._vendorService = _vendorService;
        this._httpHelper = _httpHelper;
        this.showLoginView = true;
        this.vModel = new AppModels_1.SignUp();
        this.vLoginModel = new AppModels_1.SignIn();
    }
    SignupSinginComponent.prototype.activeLoginView = function (active) {
        return this.vModel.showLoginView = active;
    };
    SignupSinginComponent.prototype.signIn = function (vendorLoginForm, signIn) {
        var _this = this;
        if (!vendorLoginForm) {
            this._vendorService.loginVendor(signIn.email, signIn.password).subscribe(function (authenticatedVendor) {
                if (authenticatedVendor) {
                    //$rootScope.vendorUId = authenticatedVendor.id;
                    //$rootScope.vendorName = authenticatedVendor.name;
                    //$document[0].body.className = '';
                    _this._httpHelper.redirectTo("/orderStatus", { vendorId: authenticatedVendor.id });
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
            /*
            let remoteData: IVendor;

            remoteData.id = vModel.id;
            remoteData.name = vModel.name;
            remoteData.email = vModel.email;
            remoteData.contact = vModel.contact;
            remoteData.password = vModel.password;
            remoteData.shopNo = vModel.shopNo;
            remoteData.siteId = vModel.siteId;
            remoteData.logo = vModel.logo;
            */
            var vModel = new AppModels_1.Vendor();
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
        //this.vModel.selectedSite = this.sites.filter((site) => { return site.name === "Ansal Tower" })[0].id.toString();
    };
    return SignupSinginComponent;
}());
SignupSinginComponent = __decorate([
    core_1.Component({
        templateUrl: 'SignupSinginComponent.html'
    }),
    __metadata("design:paramtypes", [site_service_1.SiteService,
        vendor_service_1.VendorService, httpHelper_1.httpHelper])
], SignupSinginComponent);
exports.SignupSinginComponent = SignupSinginComponent;
//# sourceMappingURL=signupSignin.component.js.map