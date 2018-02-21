import { ComponentFixture, TestBed,ComponentFixtureAutoDetect } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';

import { TextboxGeneralComponent } from '../../directives/textboxgeneral.component';
import { ButtonComponent } from '../../directives/button.component';
import { SignupSinginComponent } from './signupSignin.component';
import { SinginComponent } from './Signin.component';

import { SiteService } from '../../datacontext/site.service';
import { VendorService } from '../../datacontext/vendor.service';
import { httpHelper } from '../../Helpers/httpHelper';

describe('SignupSinginComponent (template)', () => {

    let comp: SignupSinginComponent;
    let fixture: ComponentFixture<SignupSinginComponent>;
    let de: DebugElement;
    let el: HTMLElement;
    let spy: any;
    let testSites: any;
    let testLoginVendor: any;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, BrowserModule],
            declarations: [SignupSinginComponent, SinginComponent, TextboxGeneralComponent, ButtonComponent], // declare the test component
            providers: [
                SiteService,
                VendorService,
                httpHelper
            ]
        })

        fixture = TestBed.createComponent(SignupSinginComponent);

        comp = fixture.componentInstance; // BannerComponent test instance

        //spy = spyOn(SiteService, 'getSites')
        //    .and.returnValue(Promise.resolve(testSites));

        //spy = spyOn(VendorService, 'loginVendor')
        //    .and.returnValue(Promise.resolve(testLoginVendor));

        // query for the title <h1> by CSS element selector
        de = fixture.debugElement.query(By.css('animate-if vendor-gate'));
        el = de.nativeElement;

    });


    it('head element should be defined', () => {
        fixture.detectChanges();
        expect(el).toBeDefined(true);
    });

});