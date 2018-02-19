"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var platform_browser_2 = require("@angular/platform-browser");
var textboxgeneral_component_1 = require("../../directives/textboxgeneral.component");
var button_component_1 = require("../../directives/button.component");
var signupSignin_component_1 = require("./signupSignin.component");
var Signin_component_1 = require("./Signin.component");
describe('SignupSinginComponent (template)', function () {
    var comp;
    var fixture;
    var de;
    var el;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [forms_1.FormsModule, platform_browser_2.BrowserModule],
            declarations: [signupSignin_component_1.SignupSinginComponent, Signin_component_1.SinginComponent, textboxgeneral_component_1.TextboxGeneralComponent, button_component_1.ButtonComponent],
        });
        fixture = testing_1.TestBed.createComponent(signupSignin_component_1.SignupSinginComponent);
        comp = fixture.componentInstance; // BannerComponent test instance
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