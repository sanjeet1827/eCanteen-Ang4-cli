"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var http_1 = require("@angular/common/http");
var platform_browser_1 = require("@angular/platform-browser");
var textboxgeneral_component_1 = require("../../directives/textboxgeneral.component");
var button_component_1 = require("../../directives/button.component");
var signupSignin_component_1 = require("./signupSignin.component");
var Signin_component_1 = require("./Signin.component");
var site_service_1 = require("../../datacontext/site.service");
var vendor_service_1 = require("../../datacontext/vendor.service");
var httpHelper_1 = require("../../Helpers/httpHelper");
var FakeSiteService_1 = require("../../Testing/FakeSiteService");
var comp;
var fixture;
var de;
describe('SignupSinginComponent (template)', function () {
    var el;
    var spy;
    var fakeHttpHelper = {};
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [forms_1.FormsModule, platform_browser_1.BrowserModule, http_1.HttpClientModule, router_1.RouterModule],
            declarations: [signupSignin_component_1.SignupSinginComponent, Signin_component_1.SinginComponent, textboxgeneral_component_1.TextboxGeneralComponent, button_component_1.ButtonComponent],
            providers: [
                { provide: site_service_1.SiteService, useClass: FakeSiteService_1.FakeSiteService },
                { provide: vendor_service_1.VendorService, use: vendor_service_1.VendorService },
                { provide: httpHelper_1.httpHelper, use: fakeHttpHelper }
            ]
        });
        fixture = testing_1.TestBed.createComponent(signupSignin_component_1.SignupSinginComponent);
        var siteService = fixture.debugElement.injector.get(site_service_1.SiteService);
        comp = fixture.componentInstance;
    });
    it('head element should be defined', testing_1.fakeAsync(function () {
        testing_1.tick();
        comp.activeLoginView(false);
        fixture.detectChanges();
        de = fixture.debugElement.nativeElement;
        //de = fixture.debugElement.query(By.css('animate-if vendor-gate'));
        //el = de.nativeElement;
        expect(de).toBeDefined(true);
    }));
});
//# sourceMappingURL=signupSignin.component.spec.js.map