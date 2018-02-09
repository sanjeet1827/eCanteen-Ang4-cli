import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { SiteService } from '../../datacontext/site.service';
import { VendorService } from '../../datacontext/vendor.service';
import { httpHelper } from '../../Helpers/httpHelper';

import { ISite } from '../../Types/ISite';
import { ISiteService } from '../../Types/ISiteService';
import { IVendorService } from '../../Types/IVendorService';
import { IVendor } from '../../Types/IVendor';

import { SignIn, Vendor } from '../../Models/AppModels';

@Component({
    selector:'signIn',
    templateUrl: 'SinginComponent.html'
})
export class SinginComponent implements OnInit {

    //vModel: SignUp;
    vLoginModel: SignIn;
    showLoginView: boolean = true;
    errorMessage: any;
    @Output() onActivatingLoginView = new EventEmitter<boolean>();

    constructor(private _siteService: SiteService,
        private _vendorService: VendorService, private _httpHelper: httpHelper) {
        //this.vModel = new SignUp();
        this.vLoginModel = new SignIn();
        this.vLoginModel.authenticated = true;
    }

    activeLoginView(active: boolean): void {
        this.onActivatingLoginView.emit(active);
    }

    signIn(isVendorLoginFormValid: boolean): void {
        if (isVendorLoginFormValid) {
            let vModel: IVendor = new Vendor();
            vModel.email = this.vLoginModel.email;
            vModel.password = this.vLoginModel.password;

            this._vendorService.loginVendor(vModel).subscribe(
                (authenticatedVendor: IVendor) => {
                    if (authenticatedVendor) {
                        this._httpHelper.redirectTo("/orderStatus", { vendorId: authenticatedVendor.Id });
                    }
                    else {
                        this.vLoginModel.authenticated = false;
                    }
                }
            )
        }
    }

    ngOnInit(): void {
    }
}