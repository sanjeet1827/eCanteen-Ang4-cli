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
var forms_1 = require("@angular/forms");
var site_service_1 = require("../../datacontext/site.service");
var vendor_service_1 = require("../../datacontext/vendor.service");
var httpHelper_1 = require("../../Helpers/httpHelper");
var AppModels_1 = require("../../Models/AppModels");
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
        this.signUpForm = new forms_1.FormGroup({
            selectedSite: new forms_1.FormControl(),
            name: new forms_1.FormControl("", [forms_1.Validators.required]),
            contactNo: new forms_1.FormControl("", [forms_1.Validators.required]),
            email: new forms_1.FormControl("", [forms_1.Validators.required]),
            shopNo: new forms_1.FormControl("", [forms_1.Validators.required]),
            password: new forms_1.FormControl("", [forms_1.Validators.required]),
        });
    };
    ReactiveSignupSigninComponent.prototype.activeLoginView = function (active) {
        //return this.vModel.showLoginView = active;
        return false;
    };
    ReactiveSignupSigninComponent.prototype.signUp = function (isValid) {
        if (isValid) {
            var formModel = this.signUpForm.value;
            var vModel = new AppModels_1.Vendor();
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
    core_1.Component({
        templateUrl: 'ReactiveSignupSignin.component.html'
    }),
    __metadata("design:paramtypes", [site_service_1.SiteService,
        vendor_service_1.VendorService, httpHelper_1.httpHelper, forms_1.FormBuilder])
], ReactiveSignupSigninComponent);
exports.ReactiveSignupSigninComponent = ReactiveSignupSigninComponent;
//# sourceMappingURL=ReactiveSignupSignin.component.js.map