import { ComponentFixture, TestBed, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';

import { TextboxGeneralComponent } from '../../directives/textboxgeneral.component';
import { ButtonComponent } from '../../directives/button.component';
import { SignupSinginComponent } from './signupSignin.component';
import { SinginComponent } from './Signin.component';

import { SiteService } from '../../datacontext/site.service';
import { VendorService } from '../../datacontext/vendor.service';
import { httpHelper } from '../../Helpers/httpHelper';

import { FakeSiteService } from '../../Testing/FakeSiteService';

let comp: SignupSinginComponent;
let fixture: ComponentFixture<SignupSinginComponent>;
let de: DebugElement;

describe('SignupSinginComponent tests', () => {


    let el: HTMLElement;
    let spy: any;
    let fakeHttpHelper: any = {}

    beforeEach(() => {
         
        TestBed.configureTestingModule({
            imports: [FormsModule, BrowserModule],
            declarations: [SignupSinginComponent, SinginComponent, TextboxGeneralComponent, ButtonComponent], // declare the test component
            providers: [
                { provide: SiteService, useClass: FakeSiteService },
                { provide: VendorService, use: VendorService },
                { provide: httpHelper, use: fakeHttpHelper }
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