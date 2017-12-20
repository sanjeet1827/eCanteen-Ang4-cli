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
import { httpHelper } from '../../Helpers/httpHelper';
import { SignIn, SignUp } from '../../Models/AppModels';
let SignupSinginComponent = class SignupSinginComponent {
    constructor(_siteService, _vendorService, _httpHelper) {
        this._siteService = _siteService;
        this._vendorService = _vendorService;
        this._httpHelper = _httpHelper;
        this.showLoginView = true;
        this.vModel = new SignUp();
        this.vLoginModel = new SignIn();
    }
    activeLoginView(active) {
        return this.vModel.showLoginView = active;
    }
    signIn(vendorLoginForm, signIn) {
        if (!vendorLoginForm) {
            this._vendorService.loginVendor(signIn.email, signIn.password).subscribe((authenticatedVendor) => {
                if (authenticatedVendor) {
                    //$rootScope.vendorUId = authenticatedVendor.id;
                    //$rootScope.vendorName = authenticatedVendor.name;
                    //$document[0].body.className = '';
                    this._httpHelper.redirectTo("/orderStatus", { vendorId: authenticatedVendor.id });
                }
                else {
                    this.vLoginModel.authenticated = false;
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
    }
    signUp(siteFormInvalid, vModel) {
        if (!siteFormInvalid) {
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
            if (!siteFormInvalid) {
                this._vendorService.registerVendor(vModel).subscribe((registeredVendor) => {
                    if (registeredVendor !== undefined) {
                        this.vModel.alreadyRegistered = false;
                        this.vModel.registerationPosted = true;
                    }
                    else {
                        this.vModel.alreadyRegistered = true;
                    }
                });
            }
        }
    }
    ngOnInit() {
        this._siteService.getSites()
            .subscribe(sites => this.sites = sites, error => this.errorMessage = error);
    }
};
SignupSinginComponent = __decorate([
    Component({
        templateUrl: 'signupSignin.tpl.html'
    }),
    __metadata("design:paramtypes", [Object, Object, httpHelper])
], SignupSinginComponent);
export { SignupSinginComponent };
//# sourceMappingURL=signupSignin.component.js.map