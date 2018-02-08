import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { SiteService } from '../../datacontext/site.service';
import { VendorService } from '../../datacontext/vendor.service';
import { httpHelper } from '../../Helpers/httpHelper';

import { ISite } from '../../Types/ISite';
import { ISiteService } from '../../Types/ISiteService';
import { IVendorService } from '../../Types/IVendorService';
import { IVendor } from '../../Types/IVendor';

import { SignIn, SignUp, Vendor } from '../../Models/AppModels';

@Component({
    templateUrl: 'ReactiveSignupSignin.component.html'
})
export class ReactiveSignupSigninComponent implements OnInit {

    signUpForm: FormGroup;
    selectedSite: string;

    sites: ISite[];
    errorMessage: any;

    constructor(private _siteService: SiteService,
        private _vendorService: VendorService, private _httpHelper: httpHelper, private fb: FormBuilder) {
        //this.createForm();
    }

    createForm(): void {
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
    }

    activeLoginView(active: boolean): boolean {
        //return this.vModel.showLoginView = active;
        return false;
    }

    signUp(isValid): void {
        if (isValid) {
            const formModel = this.signUpForm.value;

            let vModel: IVendor = new Vendor();
            vModel.name = formModel.name as string;
            vModel.active = true;
            vModel.email = formModel.email as string;
            //vModel.logo = this.vModel.logo;
            vModel.password = formModel.password as string;
            vModel.shopNo = formModel.shopNo as string;
            vModel.siteId = formModel.selectedSite as string;
            vModel.contact = formModel.contactNo as string;

            this._vendorService.registerVendor(vModel).subscribe((registeredVendor: boolean) => {
                if (registeredVendor !== undefined && registeredVendor) {
                    console.log("registration successful");
                }

            })
        }

    }

    ngOnInit(): void {
        this.createForm();
        this._siteService.getSites()
            .subscribe((sites) => {
                this.sites = sites;
               
                let selectedSite = sites.filter((st) => {
                    return st.Name === "Ansal Tower";
                })[0].Id.toString();
                this.signUpForm.setValue({ selectedSite: selectedSite, name: "", contactNo: "", email: "", shopNo: "", password:"" });
            },
            error => this.errorMessage = <any>error);
    }

    get name() { return this.signUpForm.get('name'); }
    get contactNo() { return this.signUpForm.get('contactNo'); }
    get email() { return this.signUpForm.get('email'); }
    get shopNo() { return this.signUpForm.get('shopNo'); }
    get password() { return this.signUpForm.get('password'); }
   

}