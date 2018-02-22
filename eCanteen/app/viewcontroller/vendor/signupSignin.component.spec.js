"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var http_1 = require("@angular/common/http");
var platform_browser_2 = require("@angular/platform-browser");
var textboxgeneral_component_1 = require("../../directives/textboxgeneral.component");
var button_component_1 = require("../../directives/button.component");
var signupSignin_component_1 = require("./signupSignin.component");
var Signin_component_1 = require("./Signin.component");
var site_service_1 = require("../../datacontext/site.service");
var vendor_service_1 = require("../../datacontext/vendor.service");
var httpHelper_1 = require("../../Helpers/httpHelper");
describe('SignupSinginComponent (template)', function () {
    var comp;
    var fixture;
    var de;
    var el;
    var spy;
    var testSites;
    var testLoginVendor;
    var fakeHttpHelper = {};
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [forms_1.FormsModule, platform_browser_2.BrowserModule, http_1.HttpClientModule, router_1.RouterModule],
            declarations: [signupSignin_component_1.SignupSinginComponent, Signin_component_1.SinginComponent, textboxgeneral_component_1.TextboxGeneralComponent, button_component_1.ButtonComponent],
            providers: [
                { provide: site_service_1.SiteService, use: site_service_1.SiteService },
                { provide: vendor_service_1.VendorService, use: vendor_service_1.VendorService },
                { provide: vendor_service_1.VendorService, use: vendor_service_1.VendorService },
                { provide: httpHelper_1.httpHelper, use: fakeHttpHelper },
                router_1.Router
            ]
        });
        fixture = testing_1.TestBed.createComponent(signupSignin_component_1.SignupSinginComponent);
        comp = fixture.componentInstance; // BannerComponent test instance
        //spy = spyOn(SiteService, 'getSites')
        //    .and.returnValue(Promise.resolve(testSites));
        //spy = spyOn(VendorService, 'loginVendor')
        //    .and.returnValue(Promise.resolve(testLoginVendor));
        // query for the title <h1> by CSS element selector
        de = fixture.debugElement.query(platform_browser_1.By.css('animate-if vendor-gate'));
        el = de.nativeElement;
    });
    it('head element should be defined', function () {
        fixture.detectChanges();
        expect(el).toBeDefined(true);
    });
});
//# sourceMappingURL=signupSignin.component.spec.js.map