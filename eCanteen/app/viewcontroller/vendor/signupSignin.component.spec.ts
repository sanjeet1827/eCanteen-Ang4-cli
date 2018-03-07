import { ComponentFixture, TestBed, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { TextboxGeneralComponent } from '../../directives/textboxgeneral.component';
import { ButtonComponent } from '../../directives/button.component';
import { SignupSinginComponent } from './signupSignin.component';
import { SinginComponent } from './Signin.component';

import { SiteService } from '../../datacontext/site.service';
import { VendorService } from '../../datacontext/vendor.service';
import { httpHelper } from '../../Helpers/httpHelper';

import { IVendor } from '../../Types/IVendor';
import { Vendor, SignIn, SignUp } from '../../Models/AppModels'

import { FakeSiteService } from '../../Testing/FakeSiteService';

let comp: SignupSinginComponent;
let fixture: ComponentFixture<SignupSinginComponent>;
let de: DebugElement;

describe('SignupSinginComponent tests', () => {


    let el: HTMLElement;
    let fakeHttpHelper: any = {}

    let testVendor: IVendor = new Vendor();
    testVendor.Id = "1";
    testVendor.name = "Sanjeet";
    testVendor.email = "kavsan1827@gmail.com";
    testVendor.contact = "9899138026";
    testVendor.password = "1234";
    testVendor.shopNo = "12-3";
    testVendor.active = true;
    testVendor.logo = "";
    testVendor.siteId = "";
    let loginVendorSpy: jasmine.Spy;
    let redirectToSpy: jasmine.Spy;
    let registerVendorSpy: jasmine.Spy;
    let vendorService: any ;


    beforeEach(() => {

        vendorService = jasmine.createSpyObj('VendorService', ['loginVendor','registerVendor']);

        const HttpHelper = jasmine.createSpyObj('httpHelper', ['redirectTo']);

        redirectToSpy = HttpHelper.redirectTo.and.returnValue(of(true));

        TestBed.configureTestingModule({
            imports: [FormsModule, BrowserModule],
            declarations: [SignupSinginComponent, SinginComponent, TextboxGeneralComponent, ButtonComponent], // declare the test component
            providers: [
                { provide: SiteService, useClass: FakeSiteService },
                { provide: VendorService, useValue: vendorService },
                { provide: httpHelper, use: fakeHttpHelper, useValue: HttpHelper }
            ]
        })

        fixture = TestBed.createComponent(SignupSinginComponent);
        let siteService = fixture.debugElement.injector.get(SiteService);

        comp = fixture.componentInstance;

    });


    it('head element should be defined', () => {

        comp.activeLoginView(false);
        fixture.detectChanges();
        de = fixture.debugElement.nativeElement;
        //de = fixture.debugElement.query(By.css('animate-if vendor-gate'));
        //el = de.nativeElement;

        expect(de).toBeDefined(true);
    });

    it('test signIn function with two spy for loginVendor and redirectTo', (done: DoneFn) => {
        loginVendorSpy = vendorService.loginVendor.and.returnValue(of(testVendor));
        comp.vLoginModel = new SignIn();
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


    it('test signIn function with two spy for loginVendor and redirectTo when login failed', (done: DoneFn) => {
        loginVendorSpy = vendorService.loginVendor.and.returnValue(of(undefined));
        comp.vLoginModel = new SignIn();
        comp.vLoginModel.email = "kavsan1827@gmail.com";
        comp.vLoginModel.password = "1234";
        comp.signIn(true);
        done();

        expect(loginVendorSpy.calls.any()).toBe(true, 'loginVendor called');
        expect(comp.vLoginModel.authenticated).toBe(false);

    });

    it('test signUp function with spy for registerVendor', (done: DoneFn) => {
        registerVendorSpy = vendorService.registerVendor.and.returnValue(of(true));
        comp.vModel = new SignUp();
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

    it('test signUp function with spy for registerVendor and already registered', (done: DoneFn) => {
        registerVendorSpy = vendorService.registerVendor.and.returnValue(of(false));
        comp.vModel = new SignUp();
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

    it('vModel should be defined', () => {

        expect(comp.vModel).toBeDefined(true);
    });
    it('vLoginModel should be defined', () => {

        expect(comp.vLoginModel).toBeDefined(true);
    });
    it('vLoginModel.authenticated should be defined and true', () => {

        expect(comp.vLoginModel.authenticated).toBeDefined(true);
        expect(comp.vLoginModel.authenticated).toBe(true);
    });
    it('showLoginView property should be false when passed false in method onActivatingLoginView', () => {

        comp.onActivatingLoginView(false);
        expect(comp.vModel.showLoginView).toBe(false);
    });
    it('showLoginView property should be true when passed true in method onActivatingLoginView', () => {

        comp.onActivatingLoginView(true);
        expect(comp.vModel.showLoginView).toBe(true);
    });
    it('showLoginView property should be false when passed false in method activeLoginView', () => {

        comp.activeLoginView(false);
        expect(comp.vModel.showLoginView).toBe(false);
    });
    it('showLoginView property should be true when passed true in method activeLoginView', () => {

        comp.activeLoginView(true);
        expect(comp.vModel.showLoginView).toBe(true);
    });

});