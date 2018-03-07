"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var forms_1 = require("@angular/forms");
var platform_browser_1 = require("@angular/platform-browser");
var of_1 = require("rxjs/observable/of");
var textboxgeneral_component_1 = require("../../directives/textboxgeneral.component");
var button_component_1 = require("../../directives/button.component");
var signupSignin_component_1 = require("./signupSignin.component");
var Signin_component_1 = require("./Signin.component");
var site_service_1 = require("../../datacontext/site.service");
var vendor_service_1 = require("../../datacontext/vendor.service");
var httpHelper_1 = require("../../Helpers/httpHelper");
var AppModels_1 = require("../../Models/AppModels");
var FakeSiteService_1 = require("../../Testing/FakeSiteService");
var comp;
var fixture;
var de;
describe('SignupSinginComponent tests', function () {
    var el;
    var fakeHttpHelper = {};
    var testVendor = new AppModels_1.Vendor();
    testVendor.Id = "1";
    testVendor.name = "Sanjeet";
    testVendor.email = "kavsan1827@gmail.com";
    testVendor.contact = "9899138026";
    testVendor.password = "1234";
    testVendor.shopNo = "12-3";
    testVendor.active = true;
    testVendor.logo = "";
    testVendor.siteId = "";
    var loginVendorSpy;
    var redirectToSpy;
    var registerVendorSpy;
    var vendorService;
    beforeEach(function () {
        vendorService = jasmine.createSpyObj('VendorService', ['loginVendor', 'registerVendor']);
        var HttpHelper = jasmine.createSpyObj('httpHelper', ['redirectTo']);
        redirectToSpy = HttpHelper.redirectTo.and.returnValue(of_1.of(true));
        testing_1.TestBed.configureTestingModule({
            imports: [forms_1.FormsModule, platform_browser_1.BrowserModule],
            declarations: [signupSignin_component_1.SignupSinginComponent, Signin_component_1.SinginComponent, textboxgeneral_component_1.TextboxGeneralComponent, button_component_1.ButtonComponent],
            providers: [
                { provide: site_service_1.SiteService, useClass: FakeSiteService_1.FakeSiteService },
                { provide: vendor_service_1.VendorService, useValue: vendorService },
                { provide: httpHelper_1.httpHelper, use: fakeHttpHelper, useValue: HttpHelper }
            ]
        });
        fixture = testing_1.TestBed.createComponent(signupSignin_component_1.SignupSinginComponent);
        var siteService = fixture.debugElement.injector.get(site_service_1.SiteService);
        comp = fixture.componentInstance;
    });
    it('head element should be defined', function () {
        comp.activeLoginView(false);
        fixture.detectChanges();
        de = fixture.debugElement.nativeElement;
        //de = fixture.debugElement.query(By.css('animate-if vendor-gate'));
        //el = de.nativeElement;
        expect(de).toBeDefined(true);
    });
    it('test signIn function with two spy for loginVendor and redirectTo', function (done) {
        loginVendorSpy = vendorService.loginVendor.and.returnValue(of_1.of(testVendor));
        comp.vLoginModel = new AppModels_1.SignIn();
        comp.vLoginModel.email = "kavsan1827@gmail.com";
        comp.vLoginModel.password = "1234";
        comp.signIn(true);
        done();
        expect(loginVendorSpy.calls.any()).toBe(true, 'loginVendor called');
        expect(redirectToSpy.calls.any()).toBe(true, 'redirectTo called');
        /*
         loginVendorSpy.calls.mostRecent().returnValue.then(() => {
             fixture.detectChanges(); // update view with quote
             //expect(el.textContent).toBe(testQuote);
             done();
         });
         */
    });
    it('test signIn function with two spy for loginVendor and redirectTo when login failed', function (done) {
        loginVendorSpy = vendorService.loginVendor.and.returnValue(of_1.of(undefined));
        comp.vLoginModel = new AppModels_1.SignIn();
        comp.vLoginModel.email = "kavsan1827@gmail.com";
        comp.vLoginModel.password = "1234";
        comp.signIn(true);
        done();
        expect(loginVendorSpy.calls.any()).toBe(true, 'loginVendor called');
        expect(comp.vLoginModel.authenticated).toBe(false);
    });
    it('test signUp function with spy for registerVendor', function (done) {
        registerVendorSpy = vendorService.registerVendor.and.returnValue(of_1.of(true));
        comp.vModel = new AppModels_1.SignUp();
        comp.vModel.name = "Sanjeet";
        comp.vModel.email = "kavsan1827@gmail.com";
        comp.vModel.password = "1234";
        comp.vModel.logo = "";
        comp.vModel.shopNo = "123";
        comp.vModel.selectedSite = "";
        comp.vModel.contactNo = "9899138026";
        comp.signUp(true);
        done();
        expect(registerVendorSpy.calls.any()).toBe(true, 'registerVendor called');
        expect(comp.vModel.alreadyRegistered).toBe(false);
        expect(comp.vModel.registerationPosted).toBe(true);
    });
    it('test signUp function with spy for registerVendor and already registered', function (done) {
        registerVendorSpy = vendorService.registerVendor.and.returnValue(of_1.of(false));
        comp.vModel = new AppModels_1.SignUp();
        comp.vModel.name = "Sanjeet";
        comp.vModel.email = "kavsan1827@gmail.com";
        comp.vModel.password = "1234";
        comp.vModel.logo = "";
        comp.vModel.shopNo = "123";
        comp.vModel.selectedSite = "";
        comp.vModel.contactNo = "9899138026";
        comp.signUp(true);
        done();
        expect(registerVendorSpy.calls.any()).toBe(true, 'registerVendor called');
        expect(comp.vModel.alreadyRegistered).toBe(true);
    });
    it('vModel should be defined', function () {
        expect(comp.vModel).toBeDefined(true);
    });
    it('vLoginModel should be defined', function () {
        expect(comp.vLoginModel).toBeDefined(true);
    });
    it('vLoginModel.authenticated should be defined and true', function () {
        expect(comp.vLoginModel.authenticated).toBeDefined(true);
        expect(comp.vLoginModel.authenticated).toBe(true);
    });
    it('showLoginView property should be false when passed false in method onActivatingLoginView', function () {
        comp.onActivatingLoginView(false);
        expect(comp.vModel.showLoginView).toBe(false);
    });
    it('showLoginView property should be true when passed true in method onActivatingLoginView', function () {
        comp.onActivatingLoginView(true);
        expect(comp.vModel.showLoginView).toBe(true);
    });
    it('showLoginView property should be false when passed false in method activeLoginView', function () {
        comp.activeLoginView(false);
        expect(comp.vModel.showLoginView).toBe(false);
    });
    it('showLoginView property should be true when passed true in method activeLoginView', function () {
        comp.activeLoginView(true);
        expect(comp.vModel.showLoginView).toBe(true);
    });
});
//# sourceMappingURL=signupSignin.component.spec.js.map