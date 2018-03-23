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
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { SiteService } from '../../datacontext/site.service';
import { VendorService } from '../../datacontext/vendor.service';
import { httpHelper } from '../../Helpers/httpHelper';
import { Vendor } from '../../Models/AppModels';
var ReactiveSignupSigninComponent = (function () {
    function ReactiveSignupSigninComponent(_siteService, _vendorService, _httpHelper, fb) {
        this._siteService = _siteService;
        this._vendorService = _vendorService;
        this._httpHelper = _httpHelper;
        this.fb = fb;
        //this.createForm();
    }
    ReactiveSignupSigninComponent.prototype.createForm = function () {
        //this.signUpForm = this.fb.group({
        //    //site: this.fb.array([]),
        //    selectedSite: '',
        //    name: '',
        //    contactNo: '',
        //    email: '',
        //    shopNo: '',
        //    password: '',
        //});
        this.signUpForm = new FormGroup({
            selectedSite: new FormControl(),
            name: new FormControl("", [Validators.required]),
            contactNo: new FormControl("", [Validators.required]),
            email: new FormControl("", [Validators.required]),
            shopNo: new FormControl("", [Validators.required]),
            password: new FormControl("", [Validators.required]),
        });
    };
    ReactiveSignupSigninComponent.prototype.activeLoginView = function (active) {
        //return this.vModel.showLoginView = active;
        return false;
    };
    ReactiveSignupSigninComponent.prototype.signUp = function (isValid) {
        if (isValid) {
            var formModel = this.signUpForm.value;
            var vModel = new Vendor();
            vModel.name = formModel.name;
            vModel.active = true;
            vModel.email = formModel.email;
            //vModel.logo = this.vModel.logo;
            vModel.password = formModel.password;
            vModel.shopNo = formModel.shopNo;
            vModel.siteId = formModel.selectedSite;
            vModel.contact = formModel.contactNo;
            this._vendorService.registerVendor(vModel).subscribe(function (registeredVendor) {
                if (registeredVendor !== undefined && registeredVendor) {
                    console.log("registration successful");
                }
            });
        }
    };
    ReactiveSignupSigninComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.createForm();
        this._siteService.getSites()
            .subscribe(function (sites) {
            _this.sites = sites;
            var selectedSite = sites.filter(function (st) {
                return st.Name === "Ansal Tower";
            })[0].Id.toString();
            _this.signUpForm.setValue({ selectedSite: selectedSite, name: "", contactNo: "", email: "", shopNo: "", password: "" });
        }, function (error) { return _this.errorMessage = error; });
    };
    Object.defineProperty(ReactiveSignupSigninComponent.prototype, "name", {
        get: function () { return this.signUpForm.get('name'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ReactiveSignupSigninComponent.prototype, "contactNo", {
        get: function () { return this.signUpForm.get('contactNo'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ReactiveSignupSigninComponent.prototype, "email", {
        get: function () { return this.signUpForm.get('email'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ReactiveSignupSigninComponent.prototype, "shopNo", {
        get: function () { return this.signUpForm.get('shopNo'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ReactiveSignupSigninComponent.prototype, "password", {
        get: function () { return this.signUpForm.get('password'); },
        enumerable: true,
        configurable: true
    });
    return ReactiveSignupSigninComponent;
}());
ReactiveSignupSigninComponent = __decorate([
    Component({
        templateUrl: 'ReactiveSignupSignin.component.html'
    }),
    __metadata("design:paramtypes", [SiteService,
        VendorService, httpHelper, FormBuilder])
], ReactiveSignupSigninComponent);
export { ReactiveSignupSigninComponent };
//# sourceMappingURL=ReactiveSignupSignin.component.js.map